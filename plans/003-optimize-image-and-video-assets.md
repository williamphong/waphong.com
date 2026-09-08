# Plan 003: Ship project, gallery and video assets at the size they are displayed

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- lib/data.ts public/images 'app/(gallery)/gallery/_components/GalleryCards.tsx'`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none (plan 002 regenerates the video poster afterwards — run 003 before 002 if you can, otherwise re-run plan 002 Step 1 at the end)
- **Category**: perf
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

`next.config.mjs` sets `images.unoptimized: true` (deliberate: the Cloudflare
OpenNext adapter has no image optimizer). That means `next/image` emits no
`srcset` and no `sizes`; the browser always downloads the original file. So
the files in `public/images` must already be the size they are displayed at,
and today they are not:

| File | Bytes | Pixels | Displayed at |
|---|---|---|---|
| `public/images/projects/vrorbit.webm` | 1,269,059 | 300×140, 18.2 s, 50 fps, ~557 kbps VP9 | 130×78 desktop / ~350 px mobile |
| `public/images/gallery/sf.webp` | 812,566 | 2005×3024 | ~373 px card / 90vw lightbox |
| `public/images/projects/website.png` | 617,094 | 3348×1818 | **referenced nowhere** |
| `public/images/projects/kwauche.png` | 387,775 | 800×516 | 130×78 |
| `public/images/gallery/jpgarden.webp` | 366,360 | 1228×1818 | ~373 px / 90vw |
| `public/images/projects/wordcloud.png` | 348,147 | 640×323 | 130×78 |
| `public/images/projects/promptcarla.png` | 174,486 | 1000×600 | 130×78 |
| `public/images/projects/csusm.jpg` | 97,342 | 639×300 | 130×78 |
| `public/images/projects/craniumknight.png` | 70,005 | 320×206 | 130×78 |
| `public/images/projects/f1.jpg` | 65,317 | 554×317 | 130×78 |
| `public/images/projects/waphong.png` | 34,723 | 320×206 | 130×78 |
| `public/images/projects/discord-bot.webp` | 6,132 | 1200×675 | 130×78 — already fine |

Measured on a production build: `/projects` transfers ~1.18 MB of thumbnails
and `/gallery` ~1.53 MB of photos for a few hundred KB of useful pixels. The
50 fps video is 2× the frame rate anyone can see at that size. After this
plan every project thumbnail is a WebP no wider than 800 px (2× the widest
mobile slot), the video is re-encoded at 25 fps with a size cap, the two
oversized gallery photos are brought in line with the other four, and the
unreferenced 617 KB PNG is deleted.

## Current state

- `lib/data.ts:16-104` — `projectsData`; each entry's `imageUrl` names a file
  under `public/images/projects/`. Seven of those paths change extension in
  Step 3. Today:

```ts
    imageUrl: '/images/projects/promptcarla.png',      // line 23
    imageUrl: '/images/projects/vrorbit.webm',         // line 32
    imageUrl: '/images/projects/f1.jpg',               // line 49
    imageUrl: '/images/projects/waphong.png',          // line 58
    imageUrl: '/images/projects/craniumknight.png',    // line 66
    imageUrl: '/images/projects/kwauche.png',          // line 74
    imageUrl: '/images/projects/wordcloud.png',        // line 83
    imageUrl: '/images/projects/discord-bot.webp',     // line 92
    imageUrl: '/images/projects/csusm.jpg',            // line 101
```

- `app/(gallery)/gallery/_components/GalleryCards.tsx:74-105` — the gallery
  photo list; paths are already `.webp` and do not change. Read-only here.
- `app/(portfolio)/_components/ProjectImage.tsx` — renders thumbnails with
  `aspect-[5/3] ... object-cover`; any aspect ratio is acceptable because it
  is cropped. Read-only here.
- `public/_headers:12-13` — `/images/*` is cached for a day with
  stale-while-revalidate; because the thumbnail filenames change extension,
  no stale cache is served.
- Tools: `cwebp`, `ffmpeg`, `ffprobe` and `magick` are installed at
  `/opt/homebrew/bin` on the owner's machine (verified 2026-09-07). `sharp` is
  not importable from the project (transitive dependency only).

Repo convention: `lib/data.ts` is the single source for project paths;
nothing else references thumbnail filenames (verify in Step 2).

## Commands you will need

| Purpose        | Command                                   | Expected on success        |
|----------------|-------------------------------------------|----------------------------|
| Install        | `pnpm install --frozen-lockfile`          | exit 0                     |
| Typecheck      | `pnpm exec tsc --noEmit`                  | exit 0                     |
| Lint           | `pnpm lint`                               | exit 0                     |
| Format check   | `pnpm format`                             | exit 0                     |
| Build          | `pnpm build`                              | exit 0                     |
| E2E            | `pnpm test`                               | all pass                   |
| Tools present  | `command -v cwebp ffmpeg ffprobe`         | three paths printed        |

## Scope

**In scope** (the only files you should modify):
- `public/images/projects/*` (convert, replace, delete as listed)
- `public/images/gallery/sf.webp`, `public/images/gallery/jpgarden.webp`
- `lib/data.ts` (the seven `imageUrl` strings only)

**Out of scope** (do NOT touch, even though they look related):
- `public/images/xi_cat.jpg` — the Open Graph image; crawlers only.
- `app/favicon.ico` — separate concern.
- `app/(portfolio)/_components/ProjectImage.tsx`, `next.config.mjs`,
  `public/_headers` — no code change is needed for this plan.
- The other four gallery photos (already 50–152 KB).
- `public/images/projects/vrorbit-poster.webp` if it exists (plan 002 owns
  it; regenerate it with plan 002 Step 1 after the video is re-encoded).

## Git workflow

- Branch: `advisor/003-optimize-assets` from the current HEAD.
- Two commits: one for images (Steps 2-4), one for the video (Step 5).
  Message style: short imperative sentence, e.g. `Resize project thumbnails
  and drop the unused screenshot`.
- Use `git rm` for deletions and `git add` for new files so the diff is a
  rename-free replace.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Confirm tools and record the baseline

```sh
command -v cwebp ffmpeg ffprobe
du -sk public/images/projects public/images/gallery
```

**Verify**: three tool paths printed. Record the two `du` numbers (baseline
is roughly 3,050 KB and 1,490 KB) for the report.

### Step 2: Delete the unreferenced screenshot

```sh
grep -rn "website.png" app components lib tests public/_headers README.md
```

**Verify**: no output. Then `git rm public/images/projects/website.png`.

### Step 3: Convert the seven raster thumbnails to WebP (max width 800)

Run from the repo root:

```sh
cd public/images/projects
cwebp -quiet -q 80 -resize 800 0 promptcarla.png  -o promptcarla.webp
cwebp -quiet -q 80               kwauche.png      -o kwauche.webp
cwebp -quiet -q 80               wordcloud.png    -o wordcloud.webp
cwebp -quiet -q 80               craniumknight.png -o craniumknight.webp
cwebp -quiet -q 80               waphong.png      -o waphong.webp
cwebp -quiet -q 80               csusm.jpg        -o csusm.webp
cwebp -quiet -q 80               f1.jpg           -o f1.webp
cd -
git rm public/images/projects/{promptcarla,kwauche,wordcloud,craniumknight,waphong}.png public/images/projects/{csusm,f1}.jpg
git add public/images/projects/*.webp
```

(`-resize 800 0` keeps the aspect ratio; only `promptcarla` is wider than
800 px, so the others are converted at native size.)

Then in `lib/data.ts` change the seven `imageUrl` values so each ends in
`.webp` (e.g. `'/images/projects/promptcarla.webp'`). Leave `vrorbit.webm`
and `discord-bot.webp` unchanged.

**Verify**:

```sh
ls public/images/projects
node -e "
const fs=require('fs');
const src=fs.readFileSync('lib/data.ts','utf8');
const urls=[...src.matchAll(/imageUrl: '([^']+)'/g)].map(m=>m[1]);
const missing=urls.filter(u=>!fs.existsSync('public'+u));
console.log(urls.length,'imageUrls;',missing.length,'missing',missing);
process.exit(missing.length?1:0)"
```

→ `9 imageUrls; 0 missing []`, exit 0. Every project file is `.webp` except
`vrorbit.webm`; the largest thumbnail is under 120,000 bytes
(`ls -l public/images/projects | sort -k5 -n`).

### Step 4: Bring the two oversized gallery photos in line

```sh
cd public/images/gallery
cwebp -quiet -q 78 -resize 0 1818 sf.webp       -o sf.new.webp       && mv sf.new.webp sf.webp
cwebp -quiet -q 75               jpgarden.webp  -o jpgarden.new.webp && mv jpgarden.new.webp jpgarden.webp
cd -
```

**Verify**: `ls -l public/images/gallery/sf.webp public/images/gallery/jpgarden.webp`
→ each under 300,000 bytes. `sips -g pixelHeight public/images/gallery/sf.webp`
→ `pixelHeight: 1818`.

### Step 5: Re-encode the video at 25 fps with a size target

```sh
ffmpeg -y -loglevel error -i public/images/projects/vrorbit.webm \
  -c:v libvpx-vp9 -crf 38 -b:v 0 -r 25 -an -row-mt 1 \
  public/images/projects/vrorbit.new.webm
ffprobe -v error -show_entries format=duration,size -of default=nw=1 public/images/projects/vrorbit.new.webm
```

**Verify**: `duration` ≈ 18.2 and `size` under 500000. If size is over
500000, re-run with `-crf 42` once. Then:

```sh
mv public/images/projects/vrorbit.new.webm public/images/projects/vrorbit.webm
```

If `public/images/projects/vrorbit-poster.webp` exists (plan 002 done),
regenerate it with plan 002 Step 1.

### Step 6: Full gate

```sh
du -sk public/images/projects public/images/gallery
pnpm exec tsc --noEmit && pnpm lint && pnpm format && pnpm build && pnpm test
```

**Verify**: `public/images/projects` under 900 KB total; `public/images/gallery`
under 1,000 KB total; every command exits 0; all Playwright tests pass
(`tests/homepage.spec.ts` and `tests/gallery.spec.ts` render these files).

## Test plan

No new tests: the existing suite exercises every changed file by rendering
`/`, `/projects` and `/gallery`, and the Step 3 `node -e` check proves every
`imageUrl` resolves. Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `command -v cwebp ffmpeg ffprobe` printed three paths (recorded in the report)
- [ ] `ls public/images/projects` lists only `.webp` files plus `vrorbit.webm` (and `vrorbit-poster.webp` if plan 002 ran)
- [ ] The Step 3 `node -e` check prints `0 missing` and exits 0
- [ ] `stat -f%z public/images/projects/vrorbit.webm` < 500000
- [ ] `du -sk public/images/projects` < 900 and `du -sk public/images/gallery` < 1000
- [ ] `git ls-files public/images/projects/website.png` prints nothing
- [ ] `pnpm build` and `pnpm test` exit 0
- [ ] No files outside the in-scope list are modified (`git status --short`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any tool in Step 1 is missing. Do not install tools; report which one.
- Step 2's grep finds a reference to `website.png` — it is not dead after all.
- A converted thumbnail is *larger* than its source (bad input; report it
  rather than lowering quality below 70).
- `lib/data.ts` no longer matches the excerpt (paths or line numbers moved).
- The video re-encode cannot get under 500,000 bytes at `-crf 42`.
- `pnpm test` fails on `tests/gallery.spec.ts` or `tests/homepage.spec.ts`
  after the swap.

## Maintenance notes

- New thumbnails: export as WebP, max 800 px wide, quality ~80, before adding
  a path to `lib/data.ts`. New gallery photos: long edge ≤ 1818 px.
- If `images.unoptimized` is ever turned off (e.g. a move to a host with an
  image optimizer), `sizes` in `ProjectImage.tsx` becomes live and larger
  sources are fine again.
- Reviewer: open `/projects` and `/gallery` in both themes and confirm no
  visible quality loss at 2× DPR; check the lightbox on `sf.webp`.
