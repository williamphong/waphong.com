# Plan 006: Bring the light theme to WCAG AA text contrast and lock it with a contrast test

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- app components lib/utils.ts package.json tests/contrast.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: M
- **Risk**: MED — this changes how the light theme looks; the owner should review screenshots before merging
- **Depends on**: plans/001-unblock-ci-format-gate.md; run AFTER plans 004, 005 and 007 if they are being executed (they touch some of the same files)
- **Category**: bug (accessibility)
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

The light theme (the default for anyone whose OS is in light mode) fails
WCAG 2.1 AA contrast (4.5:1 for text under 24 px / 18.66 px bold) on most of
its text. Ratios below are computed from the exact hex values in
`app/globals.css:28-42` against the page background `--color-rpd-base`
(#faf4ed, or `--color-rpd-surface` #fffaf3 where noted):

| Token as text | Hex | Ratio | Used for |
|---|---|---|---|
| `rpd-subtle` | #797593 | **4.02** | body copy in all three layouts, locations, blog links |
| `rpd-muted`  | #9893a5 | **2.73** | nav labels, blog dates |
| `rpd-gold`   | #ea9d34 | **2.05** | experience/education dates (12 px) |
| `rpd-love`   | #b4637a | **3.84** | `--link-color`, footer links, hover states |
| `rpd-rose`   | #d7827e | **2.60** | `--focus-color`, blog "Read more", global-error links |
| `rpd-foam`   | #56949f | **3.30** on surface / 3.14 on base | skill/tag pills, degree line |
| `rpd-iris`   | #907aa9 | **3.47** | education awards |
| `rpd-text`   | #575279 | 6.66 | headings — passes |
| `rpd-pine`   | #286983 | 5.59 (5.87 on surface) | unused for text today — passes |

The dark theme passes everywhere except `rp-muted` (#6e6a86 on #191724 =
3.42) for the nav labels and blog dates.

There is also a light-mode-only aggravator: the spotlight canvas paints a
white glow (`rgba(255,255,255,0.1)`) over the page wherever the cursor is,
which lifts the *text* more than the background and drops body copy to about
3.4:1 under the cursor.

This repo has fixed contrast by hand before (`GalleryCards.tsx:21-23`
documents a 2.96 → 5.12 fix), so this is an oversight, not a decision. The
fix stays inside the Rosé Pine Dawn palette: neutral text moves to `text`,
accents move to `pine`, and a test pins it so a future palette tweak cannot
regress silently.

## Current state

Files and the exact class/variable sites to change. Line numbers are as of
`38c20f5`; use `grep -n` to relocate if plans 004/005/007 moved them.

Global tokens — `app/globals.css:67-75`:

```css
.light {
  --link-color: var(--color-rpd-love);
  --focus-color: var(--color-rpd-rose);
}

.dark {
  --link-color: var(--color-rp-rose);
  --focus-color: var(--color-rp-love);
}
```

Body copy — `<body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle ...">` in
`app/(portfolio)/layout.tsx:70`, `app/(blog)/blog/layout.tsx:78`,
`app/(gallery)/gallery/layout.tsx:53`, `app/global-error.tsx:17`, and
`app/global-not-found.tsx` (if plan 005 ran).

Portfolio components:

- `app/(portfolio)/_components/ExperienceList.tsx:18` `dark:text-rp-gold text-rpd-gold` (date); `:23` `dark:text-rp-subtle text-rpd-subtle` (location); `:42` pill `dark:text-rp-foam text-rpd-foam`.
- `app/(portfolio)/_components/EducationList.tsx:11` `text-rpd-gold dark:text-rp-gold` (date); `:20` `text-rpd-foam dark:text-rp-foam` (degree); `:27` `text-rpd-iris dark:text-rp-iris` (awards).
- `app/(portfolio)/_components/ProjectList.tsx:27` link `dark:hover:text-rp-rose hover:text-rpd-love focus-visible:text-rpd-iris dark:focus-visible:text-rp-love`; `:54` pill `dark:text-rp-foam text-rpd-foam`.
- `app/(portfolio)/_components/NavigationWrapper.tsx:21` indicator bar (non-text; leave); `:22` `nav-text text-rpd-muted group-hover:text-rpd-love group-focus-visible:text-rpd-rose dark:text-rp-muted dark:group-hover:text-rp-rose dark:group-focus-visible:text-rp-love`.
- `app/(portfolio)/_components/LeftSide.tsx:14` `focus-visible:text-rpd-rose dark:focus-visible:text-rp-love`; `:36` `hover:text-rpd-rose dark:hover:text-rp-love`.
- `app/(portfolio)/_components/RightFooter.tsx:11, 20, 29, 38, 47` — five identical `text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love hover:underline-4 font-medium`.
- `app/(portfolio)/_components/Footers.tsx:61` `hover:text-rpd-gold dark:hover:text-rp-gold link--color transition-colors` (icon links; icons need 3:1 — gold is 2.05).
- `components/themeToggle/theme-toggle.tsx:39` `hover:text-rpd-love`.
- `components/spotlight/SpotlightCursor.tsx:26-31` — `color = '255, 255, 255'` default; `app/(portfolio)/layout.tsx:77` mounts it **outside** `ThemeProvider` with `config={{ radius: 300, brightness: 0.1 }}`.

Blog:

- `app/(blog)/blog/page.tsx:31` `group-hover:text-rpd-rose`; `:34` date `text-rpd-muted dark:text-rp-muted`; `:40` "Read more" `text-rpd-rose dark:text-rp-love`.
- `app/(blog)/blog/[id]/page.tsx:53` `text-rpd-subtle ... hover:text-rpd-text`; `:60` date `text-rpd-muted dark:text-rp-muted`; `:75` `text-rpd-rose dark:text-rp-love`.
- `app/(blog)/blog/_components/BlogSidebar.tsx:20` `focus-visible:text-rpd-rose`; `:44` `text-xs opacity-70` (opacity on text lowers its contrast); `:55` `text-rpd-subtle ... hover:text-rpd-text`.

Gallery: `app/(gallery)/gallery/layout.tsx:46` `text-rpd-love dark:text-rp-rose` on the socials `<ul>` and `:57` `hover:text-rpd-gold`; `app/(gallery)/gallery/layout.tsx:68` `focus-visible:text-rpd-rose`.

Tests: `tests/a11y.spec.ts` exists; there is no axe dependency
(`package.json` devDependencies contain no `@axe-core/*`).

Repo conventions: Rosé Pine tokens `rpd-*` (light) / `rp-*` (dark, via the
`dark:` variant); Prettier sorts classes; brief *why* comments at decision
sites; Playwright specs in `tests/` with a one-line failure-mode comment.
`pnpm-workspace.yaml` sets `minimumReleaseAge: 10080` (7 days) — a brand-new
package version will be refused at install; pick one at least 7 days old.

## Commands you will need

| Purpose        | Command                                            | Expected on success        |
|----------------|----------------------------------------------------|----------------------------|
| Install        | `pnpm install --frozen-lockfile`                   | exit 0                     |
| Add axe        | `pnpm add -D @axe-core/playwright`                 | exit 0, lockfile updated   |
| Typecheck      | `pnpm exec tsc --noEmit`                           | exit 0                     |
| Lint / format  | `pnpm lint` / `pnpm format`                        | exit 0                     |
| Contrast spec  | `pnpm test tests/contrast.spec.ts`                 | all pass (after Step 3)    |
| E2E            | `pnpm test`                                        | all pass                   |
| Screenshots    | `pnpm exec playwright screenshot --viewport-size=1280,900 --full-page --color-scheme=light http://localhost:3100/ before-light.png` (with `pnpm start --port 3100` running) | file written |

## Scope

**In scope** (the only files you should modify):
- `app/globals.css`
- `app/(portfolio)/layout.tsx`, `app/(blog)/blog/layout.tsx`, `app/(gallery)/gallery/layout.tsx`
- `app/global-error.tsx`, `app/global-not-found.tsx` (if present)
- `app/(portfolio)/_components/{ExperienceList,EducationList,ProjectList,NavigationWrapper,LeftSide,RightFooter,Footers}.tsx`
- `app/(blog)/blog/page.tsx`, `app/(blog)/blog/[id]/page.tsx`, `app/(blog)/blog/_components/BlogSidebar.tsx`
- `components/themeToggle/theme-toggle.tsx`
- `components/spotlight/SpotlightCursor.tsx`
- `package.json`, `pnpm-lock.yaml` (adding `@axe-core/playwright` only)
- `tests/contrast.spec.ts` (create)

**Out of scope** (do NOT touch, even though they look related):
- The `@theme` hex values in `app/globals.css:7-43` — do not invent or
  darken palette colours; remap roles only.
- Background utilities (`bg-rpd-surface`, `hover:bg-...`, the nav indicator
  bar `bg-rpd-muted`) — non-text.
- `components/pqoqubbw/icons.tsx`, `components/ui/button.tsx`.
- `app/(gallery)/gallery/_components/GalleryCards.tsx` — already fixed.
- Dark-theme tokens other than `rp-muted` → `rp-subtle`.

## Git workflow

- Branch: `advisor/006-light-theme-contrast` from the current HEAD.
- Commits: (1) add axe + the failing contrast spec, (2) token remap,
  (3) spotlight. Message style: short imperative sentence, e.g.
  `Meet AA contrast in the light theme`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Capture "before" screenshots for the reviewer

```sh
pnpm build && (pnpm start --port 3100 > /tmp/plan006-start.log 2>&1 &) ; sleep 4
mkdir -p /tmp/plan006
for s in light dark; do
  pnpm exec playwright screenshot --viewport-size=1280,900 --full-page --color-scheme=$s http://localhost:3100/ /tmp/plan006/before-$s.png
done
pkill -f "next start --port 3100" || true
```

**Verify**: two PNG files exist under `/tmp/plan006/`.

### Step 2: Add axe and write the contrast spec (it must FAIL now)

```sh
pnpm add -D @axe-core/playwright
```

If pnpm refuses the newest version because of `minimumReleaseAge`, run
`npm view @axe-core/playwright time --json`, pick the newest version
published ≥ 7 days ago, and `pnpm add -D @axe-core/playwright@<that version>`.

Create `tests/contrast.spec.ts`:

```ts
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// The light theme shipped body copy at 4.02:1 and dates at 2.05:1; nothing
// caught it because contrast was only ever checked by hand.
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
    test(`${route} meets AA colour contrast in ${colorScheme} mode`, async ({
      page,
    }) => {
      // next-themes follows prefers-color-scheme when no choice is stored.
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
    });
  }
}
```

Run `pnpm exec prettier --write tests/contrast.spec.ts`.

**Verify**: `pnpm exec tsc --noEmit` → exit 0.
**Verify**: `pnpm test tests/contrast.spec.ts` → the six **light** tests FAIL
listing `color-contrast` targets; the six **dark** tests fail on `/` and
`/blog` (nav labels / blog dates via `rp-muted`) — record the failing
targets in your report. If every test passes at this point, see STOP.

### Step 3: Remap the tokens

Apply every row. "light" edits change the un-prefixed class; "dark" edits
change the `dark:` class. Keep everything else on the line as is, then run
Prettier on each file.

| File:line | Replace | With |
|---|---|---|
| `app/globals.css:68` | `--link-color: var(--color-rpd-love);` | `--link-color: var(--color-rpd-pine);` |
| `app/globals.css:69` | `--focus-color: var(--color-rpd-rose);` | `--focus-color: var(--color-rpd-text);` |
| 3 layouts + `global-error.tsx` + `global-not-found.tsx` `<body>` | `text-rpd-subtle` | `text-rpd-text` |
| `ExperienceList.tsx:18`, `EducationList.tsx:11` | `text-rpd-gold` | `text-rpd-pine` |
| `ExperienceList.tsx:23` | `text-rpd-subtle` | `text-rpd-text` |
| `ExperienceList.tsx:42`, `ProjectList.tsx:54` | `text-rpd-foam` | `text-rpd-pine` |
| `EducationList.tsx:20` | `text-rpd-foam` | `text-rpd-pine` |
| `EducationList.tsx:27` | `text-rpd-iris` | `text-rpd-text` |
| `ProjectList.tsx:27` | `hover:text-rpd-love focus-visible:text-rpd-iris` | `hover:text-rpd-pine focus-visible:text-rpd-pine` |
| `NavigationWrapper.tsx:22` | `text-rpd-muted group-hover:text-rpd-love group-focus-visible:text-rpd-rose dark:text-rp-muted` | `text-rpd-text group-hover:text-rpd-pine group-focus-visible:text-rpd-pine dark:text-rp-subtle` |
| `LeftSide.tsx:14` | `focus-visible:text-rpd-rose` | `focus-visible:text-rpd-pine` |
| `LeftSide.tsx:36` | `hover:text-rpd-rose` | `hover:text-rpd-pine` |
| `RightFooter.tsx` ×5 | `text-rpd-love focus-visible:text-rpd-love dark:text-rp-rose dark:focus-visible:text-rp-love` | `link--color` |
| `Footers.tsx:61`, `gallery/layout.tsx:57` | `hover:text-rpd-gold` | `hover:text-rpd-pine` |
| `gallery/layout.tsx:46` | `text-rpd-love` | `text-rpd-pine` |
| `gallery/layout.tsx:68`, `BlogSidebar.tsx:20` | `focus-visible:text-rpd-rose` | `focus-visible:text-rpd-pine` |
| `theme-toggle.tsx:39` | `hover:text-rpd-love` | `hover:text-rpd-pine` |
| `blog/page.tsx:31` | `group-hover:text-rpd-rose` | `group-hover:text-rpd-pine` |
| `blog/page.tsx:34`, `blog/[id]/page.tsx:60` | `text-rpd-muted dark:text-rp-muted` | `text-rpd-text dark:text-rp-subtle` |
| `blog/page.tsx:40`, `blog/[id]/page.tsx:75` | `text-rpd-rose dark:text-rp-love` | `link--color` |
| `blog/[id]/page.tsx:53`, `BlogSidebar.tsx:55` | `text-rpd-subtle dark:text-rp-subtle hover:text-rpd-text dark:hover:text-rp-text` | `text-rpd-text dark:text-rp-subtle hover:text-rpd-pine dark:hover:text-rp-text` |
| `BlogSidebar.tsx:44` | `text-xs opacity-70` | `text-xs` |

If Prettier has re-sorted a class list so a multi-class "Replace" cell is no
longer contiguous, replace each class in the cell individually — the
intent is per-class, not per-string.

Add one comment in `app/globals.css` above `.light`:

```css
/* Dawn's love/rose/gold/foam/iris all sit below 4.5:1 on the base background.
   Light-mode text roles use `text` (6.66:1) and `pine` (5.59:1) instead;
   tests/contrast.spec.ts enforces this. */
```

**Verify**: `pnpm exec tsc --noEmit` and `pnpm lint` → exit 0.
**Verify**: `grep -rn "text-rpd-\(gold\|foam\|iris\|muted\|rose\|love\)" app components | grep -v "bg-\|GalleryCards"` → no output (every remaining light-mode use of those tokens as text is gone; `bg-` uses and the gallery card are allowed).
**Verify**: `pnpm test tests/contrast.spec.ts` → all 12 pass.

### Step 4: Make the spotlight glow theme-aware

In `app/(portfolio)/layout.tsx`, move the `<SpotlightCursor ... />` element
from before `<ThemeProvider>` to just inside it (first child of
`ThemeProvider`, before the `<div className="mx-auto ...">`).

In `components/spotlight/SpotlightCursor.tsx`:

1. Add `import { useTheme } from 'next-themes';` after the existing imports.
2. Inside the component, before the destructuring of `config`, add:

```tsx
  // A white glow over the light theme lifts the text more than the page and
  // pushes body copy below 4.5:1 wherever the cursor is. Glow in the text
  // colour instead, which only darkens the background slightly.
  const { resolvedTheme } = useTheme();
  const themeGlow = resolvedTheme === 'light' ? '87, 82, 121' : '255, 255, 255';
```

3. Change `color = '255, 255, 255',` in the destructuring to `color = themeGlow,`.

Run Prettier on both files.

**Verify**: `pnpm exec tsc --noEmit`, `pnpm lint` → exit 0.
**Verify**: `pnpm test tests/homepage.spec.ts` → all pass (the canvas still
mounts; nothing else in the layout moved).

### Step 5: "After" screenshots and full gate

Repeat Step 1 into `/tmp/plan006/after-light.png` and `after-dark.png`.

**Verify**: `pnpm format` → exit 0. `pnpm test` → all pass. List the four
screenshot paths in your report for the reviewer.

## Test plan

- New: `tests/contrast.spec.ts` — axe `color-contrast` on six routes × two
  colour schemes; fails before Step 3, passes after. Modelled on the route
  loop in `tests/metadata.spec.ts:15-34`.
- Existing: `tests/homepage.spec.ts` "theme toggle has a visible focus
  indicator" still passes (`--focus-color` still resolves).
- Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format` exit 0
- [ ] `pnpm test` exits 0; `tests/contrast.spec.ts` has 12 passing tests
- [ ] `grep -c '"@axe-core/playwright"' package.json` → 1 (devDependencies)
- [ ] The Step 3 grep for light-mode accent tokens used as text returns nothing
- [ ] `grep -n "resolvedTheme" components/spotlight/SpotlightCursor.tsx` → 1+ lines
- [ ] Four screenshots exist under `/tmp/plan006/` and are listed in the report
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The contrast spec passes on the light theme BEFORE Step 3 — either axe is
  not seeing the page (check `html` has class `light`) or the tokens already
  changed; report rather than proceeding.
- After Step 3 axe still reports `color-contrast` violations whose target is
  not in the table above. Report the selector and computed colours; do not
  add `disableRules` or per-element exclusions.
- `pnpm add -D @axe-core/playwright` fails twice (release-age or registry).
- A file in the table no longer contains the "Replace" string (drift from
  plans 004/005/007); reconcile against the live line and report what moved.

## Maintenance notes

- Design note for the owner: this keeps the Dawn palette but stops using
  love/rose/gold as *text* in light mode. If those accents are wanted back,
  the only AA-compliant option is adding darkened custom tokens (e.g. a
  `--color-rpd-love-deep` around #9c4d66 ≈ 5.2:1), which departs from the
  "follows Rosé Pine conventions" claim in `RightFooter.tsx`.
- Any new text colour must pass `pnpm test tests/contrast.spec.ts` in both
  schemes; that is now the gate, not the hand-computed ratios in comments.
- The spotlight is now inside `ThemeProvider`; if the provider is ever
  moved, keep the canvas inside it or `useTheme()` returns `undefined` and
  the glow falls back to white.
- Reviewer: compare the before/after screenshots side by side in both
  themes; check hover/focus states on the nav, project titles and footer.
