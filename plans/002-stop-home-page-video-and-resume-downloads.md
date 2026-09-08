# Plan 002: Stop the home page from downloading the project video and the resume PDF on load

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- 'app/(portfolio)/_components/ProjectVideo.tsx' 'app/(portfolio)/_components/ProjectImage.tsx' 'app/(portfolio)/_components/AboutMe.tsx' 'app/(portfolio)/_components/ProjectList.tsx' tests/homepage.spec.ts tests/a11y.spec.ts`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: plans/001-unblock-ci-format-gate.md (only so that `pnpm format` can be used as a gate)
- **Category**: perf
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

The home page is mostly text, yet a production build measured on 2026-09-07
transfers about 1.93 MB on first load. Two things cause almost all of it:

1. `ProjectVideo.tsx` calls `video.play()` in an effect on mount. The home
   page renders the "VR Earth Orbit Simulation" card (second project) far
   below the fold, so every visitor who does not have reduced motion enabled
   downloads the whole 1,269,059-byte `vrorbit.webm` immediately — 66% of the
   page — for a 300×140 clip shown at 130×78 that they have not scrolled to.
2. `AboutMe.tsx` links the resume with `next/link`. The App Router prefetches
   any same-origin `Link` that enters the viewport (`node_modules/next/dist/client/components/links.js`
   observes visibility; `app-router-utils.js` only rejects external origins),
   so `/files/resume.pdf` (107,027 bytes) is fetched with an `RSC: 1` header on
   every desktop visit, recognised as not-a-Flight-response, and thrown away.
   On click the router fetches it a second time before falling back to a hard
   navigation.

Two smaller defects live in the same files and are fixed here because the
rewrite touches the same lines:

- When autoplay is refused (iOS Low Power Mode, Data Saver, per-site media
  blocks) the `.catch(() => {})` leaves a blank rectangle with no controls.
- At `lg` and above, the project link's invisible click overlay
  (`ProjectList.tsx:32`) paints above the video cell, so the native controls
  shown under `prefers-reduced-motion` cannot be clicked with a mouse. The
  text column is a grid item with `z-10` (a stacking context); the media cell
  has no z-index, so it sits underneath.

After this plan the home page fetches neither the video nor the PDF until the
visitor scrolls to the card or clicks the link; refused autoplay shows
controls; and controls, when shown, are clickable.

## Current state

Files:

- `app/(portfolio)/_components/ProjectVideo.tsx` — client component rendering
  the `.webm` thumbnail; owns the reduced-motion logic. Rewritten in Step 2.
- `app/(portfolio)/_components/ProjectImage.tsx` — picks `ProjectVideo` for
  `.webm` URLs, `next/image` otherwise. Gains a poster path in Step 3.
- `app/(portfolio)/_components/AboutMe.tsx` — the bio; contains the resume
  link (lines 66-81) and the gallery link (lines 44-53).
- `app/(portfolio)/_components/ProjectList.tsx` — renders the cards; the
  overlay at line 32 is the reason for the `z-20` in Step 2. Read-only here.
- `tests/a11y.spec.ts` — two existing video tests (lines 47-69) must keep
  passing; they need one extra line each (Step 5).
- `tests/homepage.spec.ts` — new tests go here (Step 5).

`app/(portfolio)/_components/ProjectVideo.tsx` today (complete file):

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

// A looping autoplay video is moving content with no way to stop it
// (WCAG 2.2.2). Under prefers-reduced-motion we do not autoplay and we expose
// native controls instead, so the animation is opt-in rather than imposed.
export const ProjectVideo = ({
  url,
  alt,
  className,
}: {
  url: string;
  alt: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setReduced(query.matches);
      const video = videoRef.current;
      if (!video) return;
      if (query.matches) video.pause();
      else void video.play().catch(() => {});
    };

    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return (
    <video
      ref={videoRef}
      // The server render must not autoplay, or reduced-motion users see the
      // clip start before the effect runs.
      loop
      muted
      playsInline
      controls={reduced}
      preload="metadata"
      aria-label={alt}
      className={className}
    >
      <source src={url} type="video/webm" />
    </video>
  );
};
```

`app/(portfolio)/_components/ProjectImage.tsx:7-11` today:

```tsx
export const ProjectImage = ({ url, alt }: { url: string; alt: string }) => {
  const isWebm = url.endsWith('.webm');
  if (isWebm) {
    return <ProjectVideo url={url} alt={alt} className={THUMB_CLASS} />;
  }
```

`app/(portfolio)/_components/AboutMe.tsx:1-2` imports:

```tsx
import Link from 'next/link';
import { ArrowIcon } from './ArrowIcon';
```

`app/(portfolio)/_components/AboutMe.tsx:43-53` (gallery link):

```tsx
        , taking{' '}
        <Link
          className="link--color hover:underline-4 font-medium"
          href="/gallery"
          target="_blank"
          rel="noreferrer noopener"
          aria-label="pictures in my gallery"
        >
          {' '}
          pictures
        </Link>{' '}
```

`app/(portfolio)/_components/AboutMe.tsx:66-81` (resume link):

```tsx
      <br></br>
      <p className="mb-4">
        <Link
          className="group/link"
          href="/files/resume.pdf"
          rel="noreferrer noopener"
        >
          <span className="link--color hover:underline-4 inline-block font-medium">
            View my full resume here
            <ArrowIcon
              variant="up-right"
              className="translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1"
            />{' '}
          </span>
        </Link>
      </p>
```

`app/(portfolio)/_components/ProjectList.tsx:17-32` (why `z-20` is needed —
do not edit this file):

```tsx
            <div className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:group-hover/list:opacity-50 lg:hover:!opacity-100">
              ...
              <div className="z-10 sm:order-2 sm:col-span-6">
                <h3>
                  {project.link ? (
                    <a ... href={project.link} target="_blank" rel="noopener noreferrer">
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
```

`tests/a11y.spec.ts:47-69` today:

```ts
test('the project video autoplays normally', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/projects');

  const video = page.locator('video').first();
  await expect(video).not.toHaveAttribute('controls', /.*/);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
});

test('the project video is paused and controllable under reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects');

  const video = page.locator('video').first();
  await expect(video).toHaveAttribute('controls', /.*/);
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(true);
});
```

Repo conventions to match:

- Components in `app/(portfolio)/_components/` are named exports
  (`export const X = () => ...`).
- Comments explain *why* a decision was made, briefly, at the site of the
  decision (see the header comment of `ProjectVideo.tsx` and
  `ProjectList.tsx:22-24`).
- Tailwind class order is enforced by `prettier-plugin-tailwindcss`; run
  Prettier on every file you change.
- Tests are Playwright specs in `tests/`, `import { test, expect } from '@playwright/test'`,
  using `page.goto('/route')` against the configured `baseURL`. Each test has
  a one-line comment naming the failure mode it guards.
- External links use `target="_blank" rel="noopener noreferrer"`.

## Commands you will need

| Purpose        | Command                                                   | Expected on success                    |
|----------------|-----------------------------------------------------------|----------------------------------------|
| Install        | `pnpm install --frozen-lockfile`                          | exit 0                                 |
| Typecheck      | `pnpm exec tsc --noEmit`                                  | exit 0, no output                      |
| Lint           | `pnpm lint`                                               | exit 0, 0 warnings                     |
| Format changed | `pnpm exec prettier --write <files>`                      | files listed                           |
| Format check   | `pnpm format`                                             | exit 0                                 |
| Build          | `pnpm build`                                              | exit 0                                 |
| Browser (once) | `pnpm exec playwright install chromium`                   | exit 0                                 |
| E2E            | `pnpm test`                                               | all pass (builds first; ~2 min)        |
| E2E subset     | `pnpm test tests/homepage.spec.ts tests/a11y.spec.ts`     | all pass                               |
| Poster frame   | `ffmpeg` + `cwebp` (both at `/opt/homebrew/bin` on the owner's machine) | see Step 1 |

## Scope

**In scope** (the only files you should modify):
- `app/(portfolio)/_components/ProjectVideo.tsx`
- `app/(portfolio)/_components/ProjectImage.tsx`
- `app/(portfolio)/_components/AboutMe.tsx`
- `public/images/projects/vrorbit-poster.webp` (create)
- `tests/homepage.spec.ts`
- `tests/a11y.spec.ts`

**Out of scope** (do NOT touch, even though they look related):
- `app/(portfolio)/_components/ProjectList.tsx` — the overlay is intentional
  (whole-card click target); the fix is on the video side.
- `lib/data.ts` — the poster path is derived by convention, not stored.
- `public/images/projects/vrorbit.webm` — re-encoding is plan 003.
- `next.config.mjs`, `public/_headers`.
- The `<br></br>` at `AboutMe.tsx:66` — cosmetic; leave it.

## Git workflow

- Branch: `advisor/002-home-page-downloads` from the current HEAD of
  `update-portfolio-content` (after plan 001 if it is not yet merged).
- Commit per step. Message style: short imperative sentence, no prefix, e.g.
  `Play the project video only when it is in view`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Create the poster frame

The rewritten player uses `preload="none"`, so without a poster the card is
an empty box until playback starts. Extract one frame:

```sh
TMP=$(mktemp -d)
ffmpeg -y -loglevel error -i public/images/projects/vrorbit.webm -ss 2 -frames:v 1 "$TMP/poster.png"
cwebp -quiet -q 80 "$TMP/poster.png" -o public/images/projects/vrorbit-poster.webp
```

**Verify**: `ls -l public/images/projects/vrorbit-poster.webp` → file exists,
size under 30,000 bytes. `file public/images/projects/vrorbit-poster.webp` →
contains `Web/P`.

If `ffmpeg` or `cwebp` is not on PATH, see STOP conditions.

### Step 2: Rewrite `ProjectVideo.tsx`

Replace the whole file with:

```tsx
'use client';

import { useEffect, useRef, useState } from 'react';

// A looping autoplay video is moving content with no way to stop it
// (WCAG 2.2.2). Under prefers-reduced-motion we do not autoplay and we expose
// native controls instead, so the animation is opt-in rather than imposed.
//
// Playback is also gated on visibility. The home page renders this card well
// below the fold, and an unconditional play() on mount made every visitor
// download the whole clip (two thirds of the page's bytes) before they had
// scrolled anywhere near it.
export const ProjectVideo = ({
  url,
  poster,
  alt,
  className = '',
}: {
  url: string;
  poster?: string;
  alt: string;
  className?: string;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced, setReduced] = useState(false);
  // Browsers refuse muted autoplay under Low Power Mode, Data Saver and
  // per-site media blocks. Without controls that leaves a dead poster frame.
  const [autoplayFailed, setAutoplayFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    const sync = () => {
      setReduced(query.matches);
      if (query.matches || !visible) {
        video.pause();
        return;
      }
      void video.play().catch(() => setAutoplayFailed(true));
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: '200px 0px' }
    );

    observer.observe(video);
    query.addEventListener('change', sync);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', sync);
    };
  }, []);

  const controls = reduced || autoplayFailed;

  return (
    <video
      ref={videoRef}
      // The server render must not autoplay, or reduced-motion users see the
      // clip start before the effect runs.
      loop
      muted
      playsInline
      controls={controls}
      // Nothing is fetched until play() runs or the user presses play.
      preload="none"
      poster={poster}
      aria-label={alt}
      // The project link's whole-card click overlay (ProjectList.tsx) paints
      // above this cell at lg. When native controls are shown they must win.
      className={`${className} ${controls ? 'relative z-20' : ''}`}
    >
      <source src={url} type="video/webm" />
    </video>
  );
};
```

**Verify**: `pnpm exec tsc --noEmit` → exit 0. `pnpm lint` → exit 0.

### Step 3: Pass the poster from `ProjectImage.tsx`

Change lines 7-11 to:

```tsx
export const ProjectImage = ({ url, alt }: { url: string; alt: string }) => {
  const isWebm = url.endsWith('.webm');
  if (isWebm) {
    // Convention: a video's poster sits next to it as <name>-poster.webp, so
    // lib/data.ts does not need a field that only one project would use.
    const poster = url.replace(/\.webm$/, '-poster.webp');
    return (
      <ProjectVideo
        url={url}
        poster={poster}
        alt={alt}
        className={THUMB_CLASS}
      />
    );
  }
```

**Verify**: `pnpm exec tsc --noEmit` → exit 0.

### Step 4: Replace the two `next/link` uses in `AboutMe.tsx` with plain anchors

1. Delete the line `import Link from 'next/link';` (it becomes unused).
2. Replace the gallery link block (lines 44-53) with:

```tsx
        <a
          className="link--color hover:underline-4 font-medium"
          href="/gallery"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="pictures in my gallery"
        >
          pictures
        </a>{' '}
```

   (The gallery is a separate root layout, so `next/link` gave no client
   navigation here; it only prefetched a payload the new tab never used. The
   stray `{' '}` inside the old link put a leading space in the link text.)

3. Replace the resume link block (lines 68-80, the `<Link ...>...</Link>`
   inside the last `<p>`) with:

```tsx
        {/* A plain anchor, not next/link: the router prefetched the PDF as if
            it were a route on every desktop visit and then discarded it. */}
        <a
          className="group/link"
          href="/files/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link--color hover:underline-4 inline-block font-medium">
            View my full resume here
            <span className="sr-only"> (PDF, opens in a new tab)</span>
            <ArrowIcon
              variant="up-right"
              className="translate-y-px transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 group-focus-visible/link:translate-x-1 group-focus-visible/link:-translate-y-1"
            />{' '}
          </span>
        </a>
```

Then run `pnpm exec prettier --write 'app/(portfolio)/_components/AboutMe.tsx' 'app/(portfolio)/_components/ProjectVideo.tsx' 'app/(portfolio)/_components/ProjectImage.tsx'`.

**Verify**: `grep -n "next/link" 'app/(portfolio)/_components/AboutMe.tsx'` → no output.
**Verify**: `pnpm lint` → exit 0, 0 warnings. `pnpm format` → exit 0.

### Step 5: Tests

1. In `tests/a11y.spec.ts`, in BOTH existing video tests, insert
   `await video.scrollIntoViewIfNeeded();` immediately after
   `const video = page.locator('video').first();`. Playback is now
   visibility-gated, so the test must bring the card into view before
   polling.

2. Append to `tests/homepage.spec.ts`:

```ts
test('the home page does not fetch the project video or the resume on load', async ({
  page,
}) => {
  // Both used to download on every visit: play() ran on mount, and next/link
  // prefetched the PDF as though it were a route.
  const heavy: string[] = [];
  page.on('request', (req) => {
    const url = req.url();
    if (url.endsWith('.webm') || url.includes('/files/resume.pdf')) {
      heavy.push(url);
    }
  });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(heavy).toEqual([]);
});

test('the project video starts once it is scrolled into view', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => v.paused))
    .toBe(false);
});

test('the resume link is a direct link to a PDF that exists', async ({
  page,
}) => {
  await page.goto('/');
  const link = page.getByRole('link', { name: /resume/i });
  await expect(link).toHaveAttribute('href', '/files/resume.pdf');
  await expect(link).toHaveAttribute('target', '_blank');

  const res = await page.request.get('/files/resume.pdf');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('application/pdf');
});

test('the video controls are clickable under reduced motion at desktop width', async ({
  page,
}) => {
  // The whole-card link overlay used to sit above the video cell, so the
  // controls shown for reduced-motion users could not be clicked.
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/projects');
  const video = page.locator('video').first();
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveAttribute('controls', /.*/);
  const box = await video.boundingBox();
  if (!box) throw new Error('video has no bounding box');
  const hit = await page.evaluate(
    ([x, y]) => document.elementFromPoint(x, y)?.tagName,
    [box.x + box.width / 2, box.y + box.height / 2]
  );
  expect(hit).toBe('VIDEO');
});
```

Run `pnpm exec prettier --write tests/homepage.spec.ts tests/a11y.spec.ts`.

**Verify**: `pnpm test tests/homepage.spec.ts tests/a11y.spec.ts` → all pass,
including the 4 new tests. (Before Step 2-4, the first, third and fourth new
tests fail — that is the regression they guard.)

### Step 6: Full gate

**Verify**: `pnpm build` → exit 0. `pnpm test` → all pass. `pnpm format` → exit 0.

## Test plan

- New tests (Step 5) in `tests/homepage.spec.ts`: no video/PDF request on
  load; video plays once scrolled into view; resume link is a plain PDF link
  that returns 200 `application/pdf`; controls are the element under the
  pointer at 1280px under reduced motion.
- Modified tests in `tests/a11y.spec.ts`: existing autoplay / reduced-motion
  tests, now scrolling the video into view first.
- Pattern to model on: `tests/a11y.spec.ts:47-69` (poll `paused`) and
  `tests/blog.spec.ts:21-24` (status code assertion).
- Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm exec tsc --noEmit` exits 0
- [ ] `pnpm lint` exits 0 with 0 warnings
- [ ] `pnpm format` exits 0
- [ ] `pnpm test` exits 0; the 4 new tests exist and pass
- [ ] `grep -n "next/link" 'app/(portfolio)/_components/AboutMe.tsx'` returns nothing
- [ ] `grep -n 'preload="none"' 'app/(portfolio)/_components/ProjectVideo.tsx'` returns one line
- [ ] `public/images/projects/vrorbit-poster.webp` exists and is under 30,000 bytes
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- The code at the locations in "Current state" doesn't match the excerpts.
- `ffmpeg` or `cwebp` is missing from PATH (`command -v ffmpeg cwebp`). Report
  it; do not commit without a poster and do not install tools.
- The "does not fetch ... on load" test still records a `.webm` request after
  Step 2. Likely cause: the card is inside the 200px root margin at the
  test viewport — report the measured position rather than widening the
  margin to 0 or removing the test.
- A step's verification fails twice after a reasonable fix attempt.
- The fix appears to require editing `ProjectList.tsx` or `lib/data.ts`.

## Maintenance notes

- If a second video project is ever added to `lib/data.ts`, it needs a
  matching `<name>-poster.webp` beside it (convention set in Step 3).
- Plan 003 re-encodes `vrorbit.webm`; regenerate the poster afterwards with
  the Step 1 commands so the frame matches the new encode.
- The nav's four hash `Link`s in `NavigationWrapper.tsx` and the h1 link
  still prefetch `/` (about 8 KB total). Deliberately left alone — plan 004
  touches that file for a different reason and the cost is small.
- Reviewer: confirm `preload="none"` + `poster` renders a frame in the card
  before scrolling (screenshot at 1280×800), and that the reduced-motion
  controls are clickable at `lg`.
