# Plan 007: Seven small accessibility and UX fixes (motion, theme toggle, gallery headings, lightbox backdrop, error page theme, blog mobile padding, duplicate favicon)

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- 'app/(portfolio)/layout.tsx' 'app/(blog)/blog/layout.tsx' 'app/(gallery)/gallery/layout.tsx' 'app/(gallery)/gallery/_components/GalleryCards.tsx' 'app/(portfolio)/_components/Footers.tsx' 'app/(blog)/blog/page.tsx' 'app/(blog)/blog/[id]/page.tsx' app/global-error.tsx components/themeToggle/theme-toggle.tsx tests`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-unblock-ci-format-gate.md. Independent of 002-005; run BEFORE plan 006 (006 remaps colours in some of these files).
- **Category**: bug (accessibility / UX)
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

Each item is small, HIGH confidence, and the kind of thing a careful reviewer
of a portfolio notices:

1. **Smooth scrolling ignores reduced motion.** All three root layouts set
   `scroll-smooth` on `<html>` with no `motion-reduce:` counterpart, while
   every other motion source in the repo (page fade, video, spotlight, icon
   animations) honours the preference. The jump-link nav goes through it.
2. **The theme toggle never says which theme it will switch to.** It carries
   `title="theme toggle"`, `aria-label="Theme toggle"` *and* an sr-only span
   with the same words; the accessible name is identical in both states, so
   a screen-reader user cannot tell what a click does. It also sits inside
   a `<ul aria-label="Social media">`.
3. **`/gallery` has two `<h1>`s and skips from h1 to h3.** The layout's
   "William Phong" and the page's "Gallery" are both `<h1>`; cards are `<h3>`
   with no `<h2>`. The blog sidebar already solved the same problem by using
   a `<p>` for site chrome.
4. **Clicking the dark area around a gallery photo does not close the
   lightbox.** The `<dialog>` is `fixed inset-0 h-full w-full p-4` and its
   first child fills it, so `e.target === dialogRef.current` is only true in
   the 16 px padding ring; the comment's premise is wrong. Escape and ✕ work.
5. **`global-error.tsx` renders without the theme class.** Its `dark:`
   utilities are inert (the `dark` variant needs `.dark` on `<html>`, set by
   `ThemeProvider`, which this document does not mount), so dark-mode users
   get a white error page.
6. **Blog pages hard-code `px-16` at every breakpoint**, leaving ~247 px of
   text on a 375 px phone, while the portfolio uses `px-6 md:px-12 lg:px-16`.
7. **Two `<link rel="icon">` tags on `/`, `/projects`, `/blog`.**
   `app/favicon.ico` already emits one automatically; the explicit
   `metadata.icons` in the portfolio and blog layouts emits a second
   (verified in built HTML). The gallery layout, which omits it, has one.

## Current state

Item 1 — `<html ... className={`${inter.className} scroll-smooth`}` at
`app/(portfolio)/layout.tsx:67`; `${ibm.className} scroll-smooth` at
`app/(blog)/blog/layout.tsx:75`; `"font-sfpro scroll-smooth"` at
`app/(gallery)/gallery/layout.tsx:50`.

Item 2 — `components/themeToggle/theme-toggle.tsx:21-49`:

```tsx
  if (!mounted) {
    return (
      <Button
        className="link--color bg-rpd-surface dark:bg-rp-surface"
        variant="outline"
        size="icon"
        disabled
      >
        <SunMoonIcon />
        <span className="sr-only">Theme toggle</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <Button
      className="link--color bg-rpd-surface hover:text-rpd-love dark:bg-rp-surface dark:hover:text-rp-rose cursor-pointer"
      variant="outline"
      size="icon"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title="theme toggle"
      aria-label="Theme toggle"
    >
      {isDark ? <MoonIcon /> : <SunMediumIcon />}
      <span className="sr-only">Theme toggle</span>
    </Button>
  );
```

and `app/(portfolio)/_components/Footers.tsx:44-68`:

```tsx
export const LeftFooter = () => {
  return (
    <ul
      className="my-4 flex items-center gap-5 md:my-4 lg:my-0"
      aria-label="Social media"
    >
      <li>
        <ModeToggle />
      </li>
      {socials.map(({ href, title, label, icon }) => (
        <li key={title}>
          ...
        </li>
      ))}
    </ul>
  );
};
```

`tests/homepage.spec.ts:66-75` locates the toggle by
`getByRole('button', { name: 'Theme toggle' })`.

Item 3 — `app/(gallery)/gallery/layout.tsx:67-71`:

```tsx
            <h1 className="text-rpd-text dark:text-rp-text flex-1 cursor-default pb-4 text-xl font-bold tracking-wide whitespace-nowrap sm:text-2xl md:text-4xl">
              <Link href="/" className="focus-visible:text-rpd-rose">
                William Phong
              </Link>
            </h1>
```

`app/(gallery)/gallery/page.tsx:18` `<h1>Gallery</h1>`;
`app/(gallery)/gallery/_components/GalleryCards.tsx:41`
`<h3 className="text-sm font-medium">{title}</h3>`.
`tests/a11y.spec.ts:32-45` checks heading order for `/experience` and
`/projects` only; `tests/homepage.spec.ts:3-10` checks a single h1 on `/` only.

Item 4 — `GalleryCards.tsx:120-133`:

```tsx
      <dialog
        ref={dialogRef}
        aria-label={selected?.title}
        // onClose fires for Escape and for close(), so state stays in sync.
        onClose={() => setSelected(null)}
        // Clicks land on the dialog itself only when they hit the backdrop.
        onClick={(e) => {
          if (e.target === dialogRef.current) setSelected(null);
        }}
        className="fixed inset-0 z-50 h-full max-h-none w-full max-w-none bg-transparent p-4 backdrop:bg-black/80"
      >
        {selected && (
          <div className="flex h-full w-full items-center justify-center">
            <div className="relative flex h-[90vh] w-[90vw] items-center justify-center">
```

Item 5 — `app/global-error.tsx:15-18`:

```tsx
  return (
    <html lang="en">
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-6 text-center">
```

`ThemeProvider` is `components/themeToggle/theme-provider.tsx` (a client
component wrapping next-themes); the three root layouts mount it with
`attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange`.

Item 6 — `app/(blog)/blog/page.tsx:18` `<header className="flex items-center justify-start border-b px-16 py-6">`
and `:28` `... border-b px-16 py-6 last:border-0"`;
`app/(blog)/blog/[id]/page.tsx:50` `<header className="flex flex-row items-center justify-between border-b px-16 py-6">`
and `:62` `<section className="px-16 py-6">`.

Item 7 — `app/(portfolio)/layout.tsx:23-25` and `app/(blog)/blog/layout.tsx:23-25`:

```tsx
  icons: {
    icon: '/favicon.ico',
  },
```

Built HTML for `/` contains both
`<link rel="icon" href="/favicon.ico?favicon.168ltmv9f9g2v.ico" sizes="700x700" type="image/x-icon"/>`
(from `app/favicon.ico`) and `<link rel="icon" href="/favicon.ico"/>`.

Conventions: Prettier class ordering; brief *why* comments; Playwright tests
with a failure-mode comment; `tests/gallery.spec.ts` is the pattern for
dialog tests.

## Commands you will need

| Purpose        | Command                                   | Expected on success        |
|----------------|-------------------------------------------|----------------------------|
| Install        | `pnpm install --frozen-lockfile`          | exit 0                     |
| Typecheck      | `pnpm exec tsc --noEmit`                  | exit 0                     |
| Lint / format  | `pnpm lint` / `pnpm format`               | exit 0                     |
| E2E subset     | `pnpm test tests/a11y.spec.ts tests/gallery.spec.ts tests/homepage.spec.ts tests/blog.spec.ts tests/metadata.spec.ts` | all pass |
| E2E            | `pnpm test`                               | all pass                   |

## Scope

**In scope** (the only files you should modify):
- `app/(portfolio)/layout.tsx`, `app/(blog)/blog/layout.tsx`, `app/(gallery)/gallery/layout.tsx`
- `components/themeToggle/theme-toggle.tsx`
- `app/(portfolio)/_components/Footers.tsx`
- `app/(gallery)/gallery/_components/GalleryCards.tsx`
- `app/global-error.tsx`
- `app/(blog)/blog/page.tsx`, `app/(blog)/blog/[id]/page.tsx`
- `tests/a11y.spec.ts`, `tests/gallery.spec.ts`, `tests/homepage.spec.ts`, `tests/blog.spec.ts`, `tests/metadata.spec.ts`

**Out of scope** (do NOT touch, even though they look related):
- `app/(gallery)/gallery/_components/Socials.tsx` — duplicates `Footers.tsx`'s
  list but has no toggle; consolidating the two is an unplanned tech-debt item.
- `components/ui/button.tsx` — its variant tokens are a separate item.
- Colour classes (`text-rpd-*`) — plan 006.
- `app/favicon.ico` itself.

## Git workflow

- Branch: `advisor/007-a11y-ux-fixes` from the current HEAD.
- One commit per item (seven), each with its test. Message style: short
  imperative sentence, e.g. `Honour reduced motion for smooth scrolling`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Reduced-motion scrolling

In the three layouts, change `scroll-smooth` to
`scroll-smooth motion-reduce:scroll-auto` (inside the template string for
the portfolio and blog layouts; in the plain string for the gallery).

**Verify**: `grep -rn "motion-reduce:scroll-auto" app | wc -l` → 3.

### Step 2: Theme toggle name and placement

Replace lines 21-49 of `theme-toggle.tsx` with:

```tsx
  if (!mounted) {
    return (
      <Button
        className="link--color bg-rpd-surface dark:bg-rp-surface"
        variant="outline"
        size="icon"
        disabled
        aria-label="Theme toggle"
      >
        <SunMoonIcon />
      </Button>
    );
  }

  const isDark = resolvedTheme === 'dark';
  const next = isDark ? 'light' : 'dark';

  return (
    <Button
      className="link--color bg-rpd-surface hover:text-rpd-love dark:bg-rp-surface dark:hover:text-rp-rose cursor-pointer"
      variant="outline"
      size="icon"
      onClick={() => setTheme(next)}
      // One name that states the action. A static "Theme toggle" (plus a
      // title and an sr-only span saying the same) never told a screen-reader
      // user which theme they were about to get.
      aria-label={`Switch to ${next} theme`}
    >
      {isDark ? <MoonIcon /> : <SunMediumIcon />}
    </Button>
  );
```

In `Footers.tsx`, replace the `LeftFooter` body so the toggle is a sibling of
the list rather than a "social media" item:

```tsx
export const LeftFooter = () => {
  return (
    <div className="my-4 flex items-center gap-5 md:my-4 lg:my-0">
      <ModeToggle />
      <ul className="flex items-center gap-5" aria-label="Social media">
        {socials.map(({ href, title, label, icon }) => (
          <li key={title}>
            <a
              href={href}
              title={title}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rpd-gold dark:hover:text-rp-gold link--color transition-colors"
            >
              {icon}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

In `tests/homepage.spec.ts:66-75`, change the locator to
`page.getByRole('button', { name: /switch to (light|dark) theme/i })` and
append a new test:

```ts
test('the theme toggle switches the theme and announces the next one', async ({
  page,
}) => {
  // The button used to be named "Theme toggle" in both states.
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Switch to dark theme' });
  await expect(toggle).toBeEnabled();
  await toggle.click();
  await expect(page.locator('html')).toHaveClass(/dark/);
  await expect(
    page.getByRole('button', { name: 'Switch to light theme' })
  ).toBeVisible();
});
```

**Verify**: `pnpm exec tsc --noEmit` → exit 0. `pnpm test tests/homepage.spec.ts` → all pass.

### Step 3: Gallery heading structure

- `app/(gallery)/gallery/layout.tsx:67`: change `<h1 ...>` / `</h1>` to
  `<p ...>` / `</p>` (same className), with a comment above:
  `{/* Site chrome, not the page heading: the page supplies its own h1. */}`
- `GalleryCards.tsx:41`: change `<h3 className="text-sm font-medium">` to
  `<h2 className="text-sm font-medium">` (and the closing tag).
- `tests/a11y.spec.ts:32`: change `for (const route of ['/experience', '/projects'])`
  to `for (const route of ['/experience', '/projects', '/gallery'])`.
- Append to `tests/a11y.spec.ts`:

```ts
test('/gallery has exactly one h1', async ({ page }) => {
  // The layout's site title and the page title were both h1.
  await page.goto('/gallery');
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
});
```

**Verify**: `pnpm test tests/a11y.spec.ts tests/gallery.spec.ts` → all pass
(the gallery tests click cards by button name; the name comes from the card
text, which is unchanged).

### Step 4: Lightbox backdrop click

In `GalleryCards.tsx`, remove the `onClick` prop (and its comment) from the
`<dialog>` and put the handler on the full-size wrapper:

```tsx
        {selected && (
          // The dialog fills the viewport, so a click on the "backdrop" lands
          // on this wrapper — never on the dialog element or its ::backdrop.
          <div
            className="flex h-full w-full items-center justify-center"
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelected(null);
            }}
          >
```

Append to `tests/gallery.spec.ts`:

```ts
test('clicking the dark area around the photo closes the lightbox', async ({
  page,
}) => {
  // The old check compared against the dialog element, which its full-size
  // child covered entirely, so only a 16px edge ring could dismiss it.
  await page.goto('/gallery');
  await page.getByRole('button', { name: /Del Mar Beach/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  await page.mouse.click(40, 400);
  await expect(dialog).toBeHidden();
});
```

**Verify**: `pnpm lint` → exit 0 (the repo enables only two jsx-a11y rules;
no `click-events-have-key-events` warning is expected — if one appears, see
STOP). `pnpm test tests/gallery.spec.ts` → all pass.

### Step 5: Theme the global error page

In `app/global-error.tsx`: add
`import { ThemeProvider } from '@/components/themeToggle/theme-provider';`
after the CSS import; add `suppressHydrationWarning` to `<html lang="en">`;
wrap the `<main>` in

```tsx
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          ...
        </ThemeProvider>
```

Update the file's header comment to add one line: `next-themes sets the
.dark class, so the dark: utilities below only work inside ThemeProvider.`

**Verify**: `pnpm exec tsc --noEmit` → exit 0. (There is no test that can
throw a root-layout error in production; verify by `pnpm build` exit 0.)

### Step 6: Blog padding on phones

- `app/(blog)/blog/page.tsx:18` and `:28`: `px-16` → `px-6 md:px-12 lg:px-16`.
- `app/(blog)/blog/[id]/page.tsx:62`: `px-16` → `px-6 md:px-12 lg:px-16`.
- `app/(blog)/blog/[id]/page.tsx:50`: `flex flex-row items-center justify-between border-b px-16 py-6`
  → `flex flex-col gap-2 border-b px-6 py-6 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16`.

Append to `tests/blog.spec.ts`:

```ts
test.describe('on a phone', () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test('blog pages use the responsive gutter', async ({ page }) => {
    // px-16 at every breakpoint left ~247px for prose on a 375px screen.
    await page.goto('/blog/welcome-to-my-blog');
    await expect(page.locator('article section').first()).toHaveCSS(
      'padding-left',
      '24px'
    );
    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
```

**Verify**: `pnpm test tests/blog.spec.ts` → all pass.

### Step 7: Single favicon link

Delete the `icons: { icon: '/favicon.ico' },` block (3 lines) from
`app/(portfolio)/layout.tsx` and `app/(blog)/blog/layout.tsx`.

Append to `tests/metadata.spec.ts`:

```ts
test('each root layout emits a single favicon link', async ({ page }) => {
  // app/favicon.ico already emits one; metadata.icons emitted a second.
  for (const route of ['/', '/blog', '/gallery']) {
    await page.goto(route);
    await expect(page.locator('link[rel="icon"]')).toHaveCount(1);
  }
});
```

**Verify**: `pnpm test tests/metadata.spec.ts` → all pass.

### Step 8: Full gate

Run Prettier on every changed file, then:

**Verify**: `pnpm lint`, `pnpm format`, `pnpm exec tsc --noEmit` → exit 0.
`pnpm test` → all pass.

## Test plan

- Modified/new tests per step above, in the existing spec that owns each
  page: `homepage` (toggle), `a11y` (gallery headings), `gallery` (backdrop),
  `blog` (mobile gutter), `metadata` (favicon).
- Verification: `pnpm test` → all pass, 5 new tests.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format` exit 0
- [ ] `pnpm test` exits 0 with the 5 new tests passing
- [ ] `grep -rn "motion-reduce:scroll-auto" app | wc -l` → 3
- [ ] `grep -c 'sr-only' components/themeToggle/theme-toggle.tsx` → 0 and `grep -c 'title=' components/themeToggle/theme-toggle.tsx` → 0
- [ ] `grep -rn "icons:" app/'(portfolio)'/layout.tsx app/'(blog)'/blog/layout.tsx` → no output
- [ ] `grep -c "<h1" app/'(gallery)'/gallery/layout.tsx` → 0
- [ ] `grep -c "ThemeProvider" app/global-error.tsx` → 3 (import + open + close)
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any excerpt in "Current state" no longer matches (line numbers may shift
  by a few lines after plans 004/005; the text must match).
- `pnpm lint` reports a `jsx-a11y` warning for the Step 4 wrapper — report
  it; do not add `role`/`tabIndex` to a non-interactive wrapper or disable
  the rule.
- The favicon test finds 0 links on any route after Step 7 (the file
  convention did not emit one) — restore the `icons` block and report.
- The backdrop test cannot find a dark-area point that closes the dialog
  (image container geometry differs from the 90vw/90vh assumption) — report
  the container's bounding box.

## Maintenance notes

- The blog and gallery still duplicate the skip link and `ThemeProvider`
  props with the portfolio layout; extracting them is an unplanned item.
- `Socials.tsx` (gallery) is a copy of the `Footers.tsx` list without the
  toggle; when the socials list changes, both must change (unplanned item).
- Reviewer: keyboard-test the toggle (Tab, Enter) and confirm the announced
  name flips; open the lightbox and click the dark area; view `/blog` at
  375 px.
