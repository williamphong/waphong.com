# Plan 008: Add an automated accessibility scan and an external-link integrity check to the Playwright suite

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- tests package.json pnpm-lock.yaml`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW for the tests; MED that the first full scan surfaces pre-existing violations that need a human decision (see STOP conditions)
- **Depends on**: plans/006-light-theme-contrast.md (installs `@axe-core/playwright` and fixes the contrast violations a full scan would otherwise report). Also best after plans 004 and 007.
- **Category**: tests
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

This repo has done unusually careful accessibility work by hand — the
comments record WCAG 2.2.2 reasoning (`ProjectVideo.tsx`), hand-computed
contrast ratios (`GalleryCards.tsx:21-23`), tab-order reasoning
(`ExperienceList.tsx:35-38`), focus-ring reasoning (`button.tsx:7-9`) and
heading-order fixes (`experience/page.tsx:23-24`). None of it is guarded by
a general scan: `tests/a11y.spec.ts` checks a skip link, heading order on
two routes and the video's reduced-motion behaviour, and that is all. A
palette or markup change can regress any of the rest silently.

Separately, the site carries about fifteen external links (socials, project
repos, inspiration credits) in `lib/data.ts`, `Footers.tsx`, `Socials.tsx`,
`RightFooter.tsx` and `AboutMe.tsx`, and nothing asserts they are
well-formed `https:` URLs with `rel="noopener"` on every `target="_blank"`.

After this plan: every route is scanned by axe-core for WCAG 2.0/2.1 A and
AA rules in both colour schemes on every CI run, and a malformed or
non-https external link fails the build.

## Current state

- `tests/a11y.spec.ts` — existing manual a11y checks (skip link at lines
  3-30, heading order 32-45, video 47-69, plus additions from plans 002/007).
- `tests/contrast.spec.ts` — created by plan 006; runs axe with only the
  `color-contrast` rule. Its structure (route × colour-scheme loop,
  `emulateMedia`, `AxeBuilder({ page }).withRules([...]).analyze()`) is the
  pattern for the new scan:

```ts
      await page.emulateMedia({ colorScheme });
      await page.goto(route);
      await expect(page.locator('html')).toHaveClass(new RegExp(colorScheme));

      const results = await new AxeBuilder({ page })
        .withRules(['color-contrast'])
        .analyze();

      expect(
        results.violations.map((v) => ({
          rule: v.id,
          targets: v.nodes.map((n) => n.target.join(' ')),
        }))
      ).toEqual([]);
```

- `package.json` devDependencies include `@axe-core/playwright` (added by
  plan 006). If it is absent, plan 006 has not run — see STOP conditions.
- External links today (all `https:`, all with `rel` containing `noopener`
  — verified 2026-09-07): `Footers.tsx:11-42` and `Socials.tsx:10-41` (five
  each, one `mailto:`), `RightFooter.tsx:12-49` (five), `AboutMe.tsx`
  (Spotify, Letterboxd), `lib/data.ts` `link` fields (eight, one empty
  string that renders as text, not a link).
- `playwright.config.ts` — single `chromium` project, `baseURL`
  `http://localhost:3100`, `retries: 2` in CI.

Conventions: Playwright specs in `tests/`, one-line comment per test naming
the failure mode; Prettier formatting.

## Commands you will need

| Purpose        | Command                                   | Expected on success        |
|----------------|-------------------------------------------|----------------------------|
| Install        | `pnpm install --frozen-lockfile`          | exit 0                     |
| Typecheck      | `pnpm exec tsc --noEmit`                  | exit 0                     |
| Lint / format  | `pnpm lint` / `pnpm format`               | exit 0                     |
| New specs      | `pnpm test tests/axe.spec.ts tests/links.spec.ts` | all pass          |
| E2E            | `pnpm test`                               | all pass                   |

## Scope

**In scope** (the only files you should modify):
- `tests/axe.spec.ts` (create)
- `tests/links.spec.ts` (create)

**Out of scope** (do NOT touch, even though they look related):
- Any file under `app/`, `components/`, `lib/` — if the scan finds a
  violation, that is a STOP, not a fix (the owner decides).
- `tests/contrast.spec.ts` — keep it as the focused contrast gate.
- `playwright.config.ts` — no new projects or retries changes.
- `package.json` — the dependency already exists after plan 006.

## Git workflow

- Branch: `advisor/008-axe-and-links` from the current HEAD.
- One commit per spec. Message style: short imperative sentence, e.g.
  `Scan every route with axe in both colour schemes`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm the dependency

`grep -c '"@axe-core/playwright"' package.json` → 1. If 0, STOP (plan 006
not applied).

### Step 2: Full axe scan

Create `tests/axe.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The hand-made accessibility fixes throughout the codebase (reduced motion,
// contrast, tab order, heading levels, dialog focus) had no general guard.
// This scans every route for WCAG 2.0/2.1 A and AA rules in both themes.
const routes = [
  '/',
  '/experience',
  '/projects',
  '/blog',
  '/blog/welcome-to-my-blog',
  '/gallery',
];

for (const colorScheme of ['light', 'dark'] as const) {
  for (const route of routes) {
    test(`${route} has no axe violations in ${colorScheme} mode`, async ({
      page,
    }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(route);
      await expect(page.locator('html')).toHaveClass(new RegExp(colorScheme));

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      expect(
        results.violations.map((v) => ({
          rule: v.id,
          impact: v.impact,
          targets: v.nodes.map((n) => n.target.join(' ')),
        }))
      ).toEqual([]);
    });
  }
}

test('the open gallery lightbox has no axe violations', async ({ page }) => {
  // The dialog is only in the accessibility tree while open.
  await page.goto('/gallery');
  await page.getByRole('button', { name: /Big Sur/ }).click();
  await expect(page.getByRole('dialog')).toBeVisible();

  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
```

Run `pnpm exec prettier --write tests/axe.spec.ts`.

**Verify**: `pnpm exec tsc --noEmit` → exit 0. `pnpm test tests/axe.spec.ts`
→ all 13 pass. If any fail, record the `rule`, `impact` and `targets` for
every violation and go to STOP conditions — do not add `disableRules` or
`exclude`.

### Step 3: External-link integrity

Create `tests/links.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

// Social, project and credit links are typed by hand in several files. A
// typo'd scheme or a missing rel=noopener on a new-tab link ships silently.
const routes = ['/', '/experience', '/projects', '/blog', '/gallery'];

test('every external link is https, well-formed, and safe in a new tab', async ({
  page,
}) => {
  const seen = new Set<string>();

  for (const route of routes) {
    await page.goto(route);
    const links = await page
      .locator('a[href^="http"]')
      .evaluateAll((nodes) =>
        nodes.map((n) => {
          const a = n as HTMLAnchorElement;
          return { href: a.href, target: a.target, rel: a.rel };
        })
      );

    for (const { href, target, rel } of links) {
      seen.add(href);
      const url = new URL(href);
      expect(url.protocol, `${route}: ${href}`).toBe('https:');
      if (target === '_blank') {
        expect(rel, `${route}: ${href} opens a new tab`).toMatch(/noopener/);
      }
    }
  }

  // Sanity: the site has well over ten distinct external links.
  expect(seen.size).toBeGreaterThan(10);
});

test('no link has an empty href', async ({ page }) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.locator('a[href=""]')).toHaveCount(0);
  }
});
```

Run `pnpm exec prettier --write tests/links.spec.ts`.

**Verify**: `pnpm test tests/links.spec.ts` → 2 pass.

### Step 4: Full gate

**Verify**: `pnpm lint`, `pnpm format` → exit 0. `pnpm test` → all pass.
Note the total run time in your report (the axe scan adds roughly 15 s).

## Test plan

- `tests/axe.spec.ts`: 12 route × scheme scans plus the open lightbox.
- `tests/links.spec.ts`: scheme/rel check and empty-href check across five
  routes. Modelled on `tests/homepage.spec.ts:52-58` (empty href) and the
  route loops in `tests/metadata.spec.ts`.
- Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format` exit 0
- [ ] `pnpm test` exits 0; `tests/axe.spec.ts` (13 tests) and `tests/links.spec.ts` (2 tests) exist and pass
- [ ] `grep -c "disableRules\|\.exclude(" tests/axe.spec.ts` → 0
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `@axe-core/playwright` is not in `package.json` (plan 006 has not run).
- The full scan reports any violation. Paste the rule ids, impacts and
  targets; the owner decides whether to fix the markup (a new plan) or
  document a waiver. Never silence a rule to make the suite green.
- The link test finds a non-https or `rel`-less new-tab link. Report the
  href; the content files are out of scope here.

## Maintenance notes

- New routes must be added to the `routes` arrays in `axe.spec.ts`,
  `links.spec.ts`, `contrast.spec.ts` and `metadata.spec.ts` — four places.
  Consolidating them into one shared `tests/routes.ts` is a reasonable
  follow-up once a fourth spec needs the list.
- axe-core updates (Renovate) can add rules and turn a green suite red; that
  is the point, but expect it in the `major` label PRs.
- Reviewer: run `pnpm test tests/axe.spec.ts` once locally and read the
  `incomplete` results (not asserted) for anything worth a manual look.
