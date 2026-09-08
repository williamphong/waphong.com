# Plan 005: Serve a branded, themed 404 page instead of Next's default

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- next.config.mjs app/global-not-found.tsx app/global-error.tsx 'app/(portfolio)/layout.tsx' tests/blog.spec.ts tests/not-found.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW (uses an experimental Next flag — verified against the Next 16.3.4 source and docs; see STOP conditions)
- **Depends on**: plans/001-unblock-ci-format-gate.md (format gate)
- **Category**: bug
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

Verified on the live site on 2026-09-07: `https://waphong.com/asdf` and
`https://waphong.com/blog/does-not-exist` both return Next's built-in 404
(`<title>404: This page could not be found.</title>`, `<h1 class="next-error-h1">`),
with no stylesheet, no Rosé Pine palette, no site font and no link back.
It is the only page on the site that is not designed, and it is exactly the
page a recruiter lands on from a stale link.

Why there is no fix in place already: the app has three root layouts
(`app/(portfolio)/layout.tsx`, `app/(blog)/blog/layout.tsx`,
`app/(gallery)/gallery/layout.tsx`) and no top-level `app/layout.tsx`, so an
`app/not-found.tsx` has no layout to render inside. Next's docs
(`node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/not-found.md`,
section "global-not-found.js (experimental)") name this exact case and
provide `app/global-not-found.tsx` + `experimental.globalNotFound: true`,
which "bypasses your app's normal rendering" and must import its own styles,
font and theme. In Next 16.3.4 the file becomes the `/_not-found` route entry
(`node_modules/next/dist/server/dev/on-demand-entry-handler.js:298-307`), so
it covers both unmatched URLs and the blog's `dynamicParams = false` misses,
and OpenNext serves it the same way it serves today's default `/_not-found`.

## Current state

- `next.config.mjs:67-71` — the `experimental` block:

```js
  experimental: {
    // Only list packages the app actually imports; entries for absent packages
    // are silently inert and mislead about what is in the bundle.
    optimizePackageImports: ['motion'],
  },
```

- `app/global-error.tsx` — the closest existing pattern: a root-level file
  that supplies its own `<html>`/`<body>`, imports `@/app/globals.css`, and
  explains in a comment why it exists. Model the new file on it:

```tsx
'use client';

import '@/app/globals.css';

// There is no shared app/layout.tsx — each route group declares its own root
// layout — so an error thrown inside one of those layouts has no boundary above
// it. global-error is the only catch-all, and it must supply its own document.
export default function GlobalError({ ... }) {
  return (
    <html lang="en">
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle antialiased">
        <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-6 text-center">
          <h1 className="text-rpd-text dark:text-rp-text text-2xl font-bold">
            Something went wrong
          </h1>
```

- `app/(portfolio)/layout.tsx:3-8, 65-70, 78-83` — how the portfolio loads
  Inter and sets the theme class; the 404 must do the same because it
  bypasses this layout:

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});
...
    <html
      lang="en"
      className={`${inter.className} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle leading-relaxed antialiased">
...
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
```

- `app/globals.css:5, 59-75` — `dark:` utilities need `.dark` on `<html>`
  (set by next-themes), and `.link--color` reads `--link-color`, defined only
  under `.light` / `.dark`. Without `ThemeProvider` both are inert.
- `tests/blog.spec.ts:21-24` — asserts the status only:

```ts
test('an unknown post returns a real 404', async ({ page }) => {
  const response = await page.goto('/blog/does-not-exist');
  expect(response?.status()).toBe(404);
});
```

- No `not-found.tsx` or `global-not-found.tsx` exists anywhere under `app/`
  (`find app -name '*not-found*'` → nothing).

## Commands you will need

| Purpose        | Command                                                | Expected on success                     |
|----------------|--------------------------------------------------------|-----------------------------------------|
| Install        | `pnpm install --frozen-lockfile`                       | exit 0                                  |
| Typecheck      | `pnpm exec tsc --noEmit`                               | exit 0                                  |
| Lint / format  | `pnpm lint` / `pnpm format`                            | exit 0                                  |
| Build          | `pnpm build`                                           | exit 0; route list includes `/_not-found` |
| Serve build    | `pnpm start --port 3100` (background)                  | "Ready" in log                          |
| Worker build   | `pnpm exec opennextjs-cloudflare build`                | exit 0                                  |
| Worker preview | `pnpm exec opennextjs-cloudflare preview` (background) | listens on http://localhost:8787        |
| E2E            | `pnpm test`                                            | all pass                                |

## Scope

**In scope** (the only files you should modify):
- `next.config.mjs` (add one experimental flag)
- `app/global-not-found.tsx` (create)
- `tests/not-found.spec.ts` (create)

**Out of scope** (do NOT touch, even though they look related):
- `app/global-error.tsx` — a different boundary; plan 007 touches it.
- The three root layouts — do NOT add a top-level `app/layout.tsx`; the
  separate root layouts are a documented decision (`README.md`).
- `app/(blog)/blog/[id]/page.tsx` — keep `dynamicParams = false`; the
  incremental-cache setup in `open-next.config.ts` depends on it.
- `tests/blog.spec.ts:21-24` — leave the existing status-only test; the new
  spec adds the branded assertions.

## Git workflow

- Branch: `advisor/005-branded-404` from the current HEAD.
- Two commits: the page + flag, then the tests. Message style: short
  imperative sentence, e.g. `Add a branded 404 page for unmatched routes`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Enable the flag

In `next.config.mjs`, change the `experimental` block to:

```js
  experimental: {
    // Only list packages the app actually imports; entries for absent packages
    // are silently inert and mislead about what is in the bundle.
    optimizePackageImports: ['motion'],
    // Three root layouts and no app/layout.tsx means an app/not-found.tsx has
    // nothing to render inside. global-not-found supplies its own document.
    globalNotFound: true,
  },
```

**Verify**: `node -e "import('./next.config.mjs').then(m=>console.log(m.default.experimental.globalNotFound))"` → `true`.

### Step 2: Create `app/global-not-found.tsx`

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/app/globals.css';
import { ThemeProvider } from '@/components/themeToggle/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Page not found | William Phong',
  description: 'The page you are looking for does not exist.',
  robots: { index: false },
};

// There is no shared app/layout.tsx — each route group declares its own root
// layout — so an unmatched URL has no layout to render a not-found.tsx inside.
// global-not-found bypasses layouts entirely and must supply its own document,
// styles, font and theme class (next-themes sets .light/.dark on <html>).
export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="bg-rpd-base text-rpd-subtle dark:bg-rp-base dark:text-rp-subtle leading-relaxed antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="flex min-h-screen flex-col items-center justify-center gap-y-4 px-6 text-center">
            <p className="text-rpd-pine dark:text-rp-gold text-xs font-semibold tracking-widest uppercase">
              404
            </p>
            <h1 className="text-rpd-text dark:text-rp-text text-2xl font-bold">
              Page not found
            </h1>
            <p className="max-w-md text-sm">
              There is nothing at this address. It may have moved, or the link
              may be out of date.
            </p>
            <a
              href="/"
              className="link--color hover:underline-4 mt-4 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              Back to the portfolio
            </a>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

Run `pnpm exec prettier --write app/global-not-found.tsx`.

**Verify**: `pnpm exec tsc --noEmit` → exit 0. `pnpm lint` → exit 0.

### Step 3: Build and check both 404 paths on `next start`

```sh
pnpm build 2>&1 | tee /tmp/plan005-build.log
grep -n "_not-found" /tmp/plan005-build.log
```

**Verify**: build exits 0 and the route table lists `/_not-found`.

```sh
(pnpm start --port 3100 > /tmp/plan005-start.log 2>&1 &) ; sleep 4
for p in /asdf /blog/does-not-exist; do
  printf '%s status=' "$p"; curl -s -o /tmp/p.html -w '%{http_code}\n' "http://localhost:3100$p"
  printf '  branded=%s default=%s\n' "$(grep -c 'Page not found' /tmp/p.html)" "$(grep -c 'next-error-h1' /tmp/p.html)"
done
pkill -f "next start --port 3100" || true
```

**Verify**: both paths print `status=404`, `branded=` ≥ 1 and `default=0`.

### Step 4: Check the Worker build serves it too

```sh
pnpm exec opennextjs-cloudflare build 2>&1 | tail -5
(pnpm exec opennextjs-cloudflare preview > /tmp/plan005-preview.log 2>&1 &) ; sleep 15
for p in /asdf /blog/does-not-exist; do
  printf '%s status=' "$p"; curl -s -o /tmp/p.html -w '%{http_code}\n' "http://localhost:8787$p"
  printf '  branded=%s default=%s\n' "$(grep -c 'Page not found' /tmp/p.html)" "$(grep -c 'next-error-h1' /tmp/p.html)"
done
pkill -f "wrangler" || true
```

(If the preview log shows a different port, use that one.)

**Verify**: same three results as Step 3 for both paths. This is the check
that matters — production runs the Worker, not `next start`.

### Step 5: Tests

Create `tests/not-found.spec.ts`:

```ts
import { test, expect } from '@playwright/test';

// With three root layouts and no app/layout.tsx, Next used to fall back to
// its unstyled built-in 404 for every unmatched URL — including blog slugs
// rejected by dynamicParams = false.
for (const route of ['/this-route-does-not-exist', '/blog/does-not-exist']) {
  test(`${route} returns the branded 404 page`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(404);

    await expect(
      page.getByRole('heading', { level: 1, name: 'Page not found' })
    ).toBeVisible();
    await expect(page.getByRole('link', { name: /portfolio/i })).toHaveAttribute(
      'href',
      '/'
    );
    await expect(page.locator('.next-error-h1')).toHaveCount(0);
    await expect(page).toHaveTitle(/William Phong/);
  });
}
```

Run `pnpm exec prettier --write tests/not-found.spec.ts`.

**Verify**: `pnpm test tests/not-found.spec.ts tests/blog.spec.ts` → all pass.

### Step 6: Full gate

**Verify**: `pnpm format` → exit 0. `pnpm test` → all pass.

## Test plan

- New: `tests/not-found.spec.ts` — for an unmatched URL and an unknown blog
  slug: status 404, branded h1 visible, home link, no default markup,
  branded title. Modelled on `tests/blog.spec.ts:21-24` and
  `tests/metadata.spec.ts:16-23`.
- Manual (Step 4): the same two URLs against the OpenNext Worker preview.
- Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format` exit 0
- [ ] `pnpm build` exits 0 and its output lists `/_not-found`
- [ ] Step 3 curl loop: both paths `status=404`, `branded≥1`, `default=0`
- [ ] Step 4 curl loop against the Worker preview: same results (paste them in the report)
- [ ] `pnpm test` exits 0; `tests/not-found.spec.ts` exists with 2 passing tests
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- `pnpm build` fails or warns that `global-not-found` is unsupported with
  the installed Next version (`node_modules/next/package.json` must say
  16.3.x or later).
- Step 3 passes but Step 4 (Worker preview) still serves the default 404 for
  either path. Report which path. Do NOT work around it by removing
  `dynamicParams = false` from the blog page. The documented fallback for a
  human to consider: a catch-all `app/(portfolio)/[...notFound]/page.tsx`
  that calls `notFound()` plus `app/(portfolio)/not-found.tsx` (covers
  unmatched URLs only, not the blog slug case).
- The preview server does not start within 30 s — report the log; do not
  install or reconfigure wrangler.

## Maintenance notes

- `experimental.globalNotFound` is experimental in Next 16.3. Renovate groups
  `next` upgrades; when it stabilises, move the flag out of `experimental`
  (the build will say so). If a future Next drops support, the STOP fallback
  above is the replacement.
- `global-not-found.tsx` bypasses every layout: it must keep its own
  `globals.css` import, font and `ThemeProvider`. If the body colour tokens
  change (plan 006), update this file too.
- Reviewer: open `/asdf` in both themes; confirm the font is Inter and the
  home link works; confirm `robots` meta is `noindex`.
