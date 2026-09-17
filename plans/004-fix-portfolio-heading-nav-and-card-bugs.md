# Plan 004: Fix the site-title overflow, the dead jump links on sub-pages, and the never-firing card hover effect

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- 'app/(portfolio)/_components/LeftSide.tsx' 'app/(portfolio)/_components/NavigationWrapper.tsx' 'app/(portfolio)/_components/ExperienceList.tsx' 'app/(portfolio)/_components/ProjectList.tsx' 'app/(portfolio)/_components/EducationList.tsx' 'app/(portfolio)/page.tsx' tests/homepage.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-unblock-ci-format-gate.md (format gate). Independent of plan 002, but if both run, `tests/homepage.spec.ts` is appended by both — apply in order and re-read the file.
- **Category**: bug
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

Three visible defects on the portfolio pages, all HIGH confidence:

1. **Site title overlaps the content column at 1024 px.** `LeftSide.tsx` sets
   `whitespace-nowrap ... md:text-7xl` on "William Phong" inside a
   `lg:w-1/2` column. Measured on a production build at 1024×800: the text's
   right edge is at 547 px while `<main>` starts at 528 px — a 19 px overlap
   (11 px at 1040, 1 px at 1060, gone by 1080). The "g" of "Phong" sits on top
   of the first paragraph. 1024 CSS px is a common laptop-at-125%-zoom and
   iPad-landscape width. The ladder `text-4xl sm:text-3xl md:text-7xl` is
   also non-monotonic (36 → 30 → 72 px).
2. **Three of four jump links are dead on `/experience` and `/projects`.**
   `NavigationWrapper` renders `#about`, `#experience`, `#projects`,
   `#education` from the shared layout on every portfolio route, but
   `/experience` only has `id="experience"` and `/projects` only
   `id="projects"`. Clicking the others changes the URL hash and scrolls
   nowhere.
3. **The "dim the other cards" hover effect never fires.** All three list
   components put `lg:group-hover/list:opacity-50 lg:hover:!opacity-100` on
   each card, but no element anywhere carries the `group/list` class (grep
   confirmed; the compiled CSS rule
   `.lg\:group-hover\/list\:opacity-50:is(:where(.group\/list):hover *)` can
   never match). The effect this layout is modelled on is silently missing.

Also folded in (cosmetic, same files): two internal `<Link>`s in
`page.tsx` carry `rel="noreferrer noopener"`, which is meaningless for
same-origin navigation.

## Current state

- `app/(portfolio)/_components/LeftSide.tsx` — the sticky left column; h1 at
  lines 11-18.
- `app/(portfolio)/_components/NavigationWrapper.tsx` — client component;
  builds the jump links and runs the scroll-spy `IntersectionObserver`.
- `app/(portfolio)/_components/ExperienceList.tsx`, `ProjectList.tsx`,
  `EducationList.tsx` — each renders an `<ol>` of cards.
- `app/(portfolio)/page.tsx` — the home page; the two "Full employment
  history" / "More projects" links at lines 57-66 and 83-88.
- `app/(portfolio)/layout.tsx:84-92` — the two-column shell:
  `mx-auto min-h-screen max-w-7xl px-6 py-12 md:px-12 md:py-20 lg:px-16 lg:py-0`
  → `lg:flex lg:justify-between lg:gap-4` → `<LeftSide />` (`lg:w-1/2`) and
  `<main id="content" className="lg:w-1/2 lg:py-24">`. Read-only.
- `tests/homepage.spec.ts` — existing nav tests at lines 12-40.

`LeftSide.tsx:11-18` today:

```tsx
        <h1 className="text-rpd-text dark:text-rp-text cursor-default pb-4 text-4xl font-normal tracking-normal whitespace-nowrap sm:text-3xl md:text-7xl">
          <Link
            href="/"
            className="focus-visible:text-rpd-rose dark:focus-visible:text-rp-love"
          >
            William Phong
          </Link>
        </h1>
```

`NavigationWrapper.tsx:8-41` today:

```tsx
interface NavigationLinkProps {
  item: { name: string };
  isActive: boolean;
}

const NavigationLink = ({ item, isActive }: NavigationLinkProps) => (
  <li>
    <Link
      href={`#${item.name}`}
      // `activedark` is not a utility and no such class exists; dark mode
      // already works because .active reads --link-color, which .dark redefines.
      className={`group flex items-center py-3 ${isActive ? 'active' : ''}`}
    >
      <span className="nav-indicator bg-rpd-muted group-hover:bg-rpd-love group-focus-visible:bg-rpd-iris dark:bg-rp-muted dark:group-hover:bg-rp-rose dark:group-focus-visible:bg-rp-love mr-4 h-px w-8 transition-all group-hover:w-16 group-focus-visible:w-16 motion-reduce:transition-none"></span>
      <span className="nav-text text-rpd-muted group-hover:text-rpd-love group-focus-visible:text-rpd-rose dark:text-rp-muted dark:group-hover:text-rp-rose dark:group-focus-visible:text-rp-love text-xs font-bold tracking-widest uppercase">
        {item.name}
      </span>
    </Link>
  </li>
);

const Navigation = ({ activeSection }: { activeSection: string }) => (
  <nav className="nav hidden lg:block" aria-label="In-page jump links">
    <ul className="mt-16 w-max">
      {navigation.map((item) => (
        <NavigationLink
          key={item.name}
          item={item}
          isActive={activeSection === item.name}
        />
      ))}
    </ul>
  </nav>
);
```

and lines 43-45, 80:

```tsx
export const NavigationWrapper: React.FC = () => {
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname(); // track route changes
  ...
  return <Navigation activeSection={activeSection} />;
```

The three `<ol>` elements today: `ExperienceList.tsx:12` `<ol>`,
`ProjectList.tsx:14` `<ol>`, `EducationList.tsx:6` `<ol>` — all without a
className. Each card's wrapper (e.g. `ExperienceList.tsx:15`) is:

```tsx
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
```

`page.tsx:57-61` and `83`:

```tsx
        <Link
          className="group/link"
          href="/experience"
          rel="noreferrer noopener"
        >
...
        <Link className="group/link" href="/projects" rel="noreferrer noopener">
```

Repo conventions: named exports; brief *why* comments at the decision site;
Tailwind class order via Prettier; Playwright tests with a one-line comment
naming the failure mode (see `tests/homepage.spec.ts:12-40`).

## Commands you will need

| Purpose        | Command                                   | Expected on success        |
|----------------|-------------------------------------------|----------------------------|
| Install        | `pnpm install --frozen-lockfile`          | exit 0                     |
| Typecheck      | `pnpm exec tsc --noEmit`                  | exit 0                     |
| Lint           | `pnpm lint`                               | exit 0, 0 warnings         |
| Format changed | `pnpm exec prettier --write <files>`      | files listed               |
| Format check   | `pnpm format`                             | exit 0                     |
| E2E subset     | `pnpm test tests/homepage.spec.ts tests/a11y.spec.ts` | all pass       |
| E2E            | `pnpm test`                               | all pass                   |

## Scope

**In scope** (the only files you should modify):
- `app/(portfolio)/_components/LeftSide.tsx`
- `app/(portfolio)/_components/NavigationWrapper.tsx`
- `app/(portfolio)/_components/ExperienceList.tsx`
- `app/(portfolio)/_components/ProjectList.tsx`
- `app/(portfolio)/_components/EducationList.tsx`
- `app/(portfolio)/page.tsx`
- `tests/homepage.spec.ts`

**Out of scope** (do NOT touch, even though they look related):
- `app/(portfolio)/layout.tsx` — the column widths are correct; the heading
  must fit them.
- `app/(portfolio)/_components/ProjectVideo.tsx` / `ProjectImage.tsx` — plan 002.
- `lib/data.ts` — the `navigation` array is right; only hrefs change.
- Extracting the duplicated card wrapper into a shared component — a
  separate, unplanned tech-debt item; do not refactor here.
- `app/globals.css` — `.active` styling is fine.

## Git workflow

- Branch: `advisor/004-heading-nav-cards` from the current HEAD.
- Commit per step. Message style: short imperative sentence, e.g.
  `Keep the site title inside its column at the lg breakpoint`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Make the title ladder monotonic and fit the `lg` column

In `LeftSide.tsx:11` replace

```
text-4xl font-normal tracking-normal whitespace-nowrap sm:text-3xl md:text-7xl
```

with

```
text-4xl font-normal tracking-normal whitespace-nowrap sm:text-5xl md:text-7xl lg:text-6xl xl:text-7xl
```

Add a comment above the `<h1>`:

```tsx
        {/* Below lg the column is full width, so 7xl fits. At lg the column is
            ~448px and "William Phong" at 7xl is ~483px, overlapping <main>;
            6xl (~403px) fits, and xl restores 7xl. */}
```

Run Prettier on the file (it re-sorts classes).

**Verify**: `pnpm exec tsc --noEmit` → exit 0. The Step 4 test
"the site title does not overlap the content column" passes.

### Step 2: Route the jump links home when they are not on the home page

In `NavigationWrapper.tsx`:

1. Change the props interface and `NavigationLink`:

```tsx
interface NavigationLinkProps {
  item: { name: string };
  href: string;
  isActive: boolean;
}

const NavigationLink = ({ item, href, isActive }: NavigationLinkProps) => (
  <li>
    <Link
      href={href}
```

   (keep the existing comment and the two `<span>`s unchanged).

2. Change `Navigation` to take `pathname` and compute the href:

```tsx
const Navigation = ({
  activeSection,
  pathname,
}: {
  activeSection: string;
  pathname: string;
}) => (
  <nav className="nav hidden lg:block" aria-label="In-page jump links">
    <ul className="mt-16 w-max">
      {navigation.map((item) => (
        <NavigationLink
          key={item.name}
          item={item}
          // Only the home page has all four sections. On /experience and
          // /projects a bare "#about" is a dead fragment; "/#about" navigates
          // home and scrolls there.
          href={pathname === '/' ? `#${item.name}` : `/#${item.name}`}
          isActive={activeSection === item.name}
        />
      ))}
    </ul>
  </nav>
);
```

3. Change the final line of `NavigationWrapper` to
   `return <Navigation activeSection={activeSection} pathname={pathname} />;`

Run Prettier on the file.

**Verify**: `pnpm exec tsc --noEmit` → exit 0. `pnpm lint` → exit 0.

### Step 3: Turn on the sibling-dim hover effect

In each of `ExperienceList.tsx:12`, `ProjectList.tsx:14`,
`EducationList.tsx:6`, change `<ol>` to:

```tsx
      {/* The cards' lg:group-hover/list:* classes need this parent marker. */}
      <ol className="group/list">
```

(This is the evident intent of the existing card classes; the alternative —
deleting `lg:group-hover/list:opacity-50 lg:hover:!opacity-100` from all
three cards — is recorded in Maintenance notes for the owner.)

**Verify**: `grep -rn 'group/list"' 'app/(portfolio)/_components/'` → exactly
3 lines, one per list.

### Step 4: Drop `rel` from the two internal links in `page.tsx`

Remove `rel="noreferrer noopener"` from the `<Link href="/experience">` and
`<Link href="/projects">` elements (lines 57-61 and 83). Run Prettier.

**Verify**: `grep -n 'rel=' 'app/(portfolio)/page.tsx'` → no output.

### Step 5: Tests

Append to `tests/homepage.spec.ts`:

```ts
test.describe('at the lg breakpoint', () => {
  test.use({ viewport: { width: 1024, height: 800 } });

  test('the site title does not overlap the content column', async ({
    page,
  }) => {
    // At 7xl "William Phong" (whitespace-nowrap) spilled 19px into <main>.
    await page.goto('/');
    const title = await page.locator('h1 a').boundingBox();
    const main = await page.locator('main#content').boundingBox();
    if (!title || !main) throw new Error('missing bounding box');
    expect(title.x + title.width).toBeLessThanOrEqual(main.x);
  });
});

for (const route of ['/experience', '/projects']) {
  test(`${route}: jump links lead to a real section`, async ({ page }) => {
    // The nav is shared by the layout, but only the home page has all four
    // section ids; a bare "#about" on a sub-page scrolled nowhere.
    await page.goto(route);
    const nav = page.getByRole('navigation', { name: 'In-page jump links' });
    await nav.getByRole('link', { name: 'about', exact: true }).click();
    await expect(page).toHaveURL(/\/#about$/);
    await expect(page.locator('#about')).toBeInViewport();
  });
}

test('hovering one project card dims its siblings on desktop', async ({
  page,
}) => {
  // The cards carried lg:group-hover/list:opacity-50 with no group/list
  // parent, so the effect never fired.
  await page.goto('/projects');
  const cards = page.locator('ol.group\\/list > li > div');
  await expect(cards.first()).toBeVisible();
  await cards.first().hover();
  await expect(cards.nth(1)).toHaveCSS('opacity', '0.5');
  await expect(cards.first()).toHaveCSS('opacity', '1');
});
```

Run `pnpm exec prettier --write tests/homepage.spec.ts`.

**Verify**: `pnpm test tests/homepage.spec.ts tests/a11y.spec.ts` → all pass,
including the 4 new tests (title, two routes, hover). The existing
`scroll spy activates the section in view` test must still pass — the home
page hrefs are unchanged.

### Step 6: Full gate

**Verify**: `pnpm format` → exit 0. `pnpm test` → all pass.

## Test plan

- New tests in `tests/homepage.spec.ts` (Step 5): title fits at 1024×800;
  jump link from `/experience` and `/projects` lands on `/#about` with the
  section in view; hover dims sibling cards.
- Pattern: `tests/homepage.spec.ts:12-21` (nav scoped by role) and
  `:23-40` (scroll-spy).
- Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format` exit 0
- [ ] `pnpm test` exits 0; the 4 new tests exist and pass
- [ ] `grep -c 'sm:text-3xl' 'app/(portfolio)/_components/LeftSide.tsx'` → 0
- [ ] `grep -c 'group/list"' 'app/(portfolio)/_components/'*.tsx` shows 1 for each of the three list files
- [ ] `grep -n 'rel=' 'app/(portfolio)/page.tsx'` → no output
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- The title test still fails after Step 1 at 1024×800 (report the measured
  `title.x + title.width` and `main.x`; do not shrink the font further
  without the owner).
- The `/#about` test fails because the page does not scroll to the section
  after client navigation — report it; do not switch the nav to plain `<a>`
  elements, which would change the scroll-spy behaviour on the home page.
- The hover test fails because the per-card hover background
  (`lg:group-hover:bg-...`) and the sibling dim conflict visually — report
  with a screenshot; the owner decides.

## Maintenance notes

- Owner decision recorded: Step 3 turns the sibling-dim effect **on**. If it
  is not wanted, the alternative is to delete
  `lg:group-hover/list:opacity-50 lg:hover:!opacity-100` from the three card
  wrappers and drop the new `<ol className="group/list">`; then remove the
  hover test.
- The three list components still duplicate the card wrapper and pill
  markup verbatim; extracting `ListCard` / `TagPill` is a separate item in
  `plans/README.md` ("unplanned findings").
- If a section is ever added to `lib/data.ts` `navigation`, it needs a
  matching `id` on the home page — the new `/experience` test only checks
  `about`.
- Reviewer: check the title at 640, 768, 1024, 1100 and 1280 px; check that
  hovering a card at ≥1024 px dims the others and the hovered card's
  background still appears.
