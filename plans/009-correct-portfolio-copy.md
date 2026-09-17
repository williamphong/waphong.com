# Plan 009: Correct the false description of this very site and the misspelled technology names in the portfolio copy

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- lib/data.ts 'app/(portfolio)/_components/RightFooter.tsx' 'app/(portfolio)/_components/AboutMe.tsx'`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P2
- **Effort**: S
- **Risk**: LOW — text only; the owner should read the diff
- **Depends on**: none (independent of every other plan; if plan 003 ran, only the `imageUrl` lines in `lib/data.ts` differ)
- **Category**: docs (public content)
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

The portfolio's purpose is technical credibility, and its copy is read
against the linked repositories. Two classes of problem, both HIGH
confidence:

1. **A provably false claim about this codebase.** The "Portfolio Website //
   waphong.com" project says it *"Integrates BetterAuth, Prisma and
   PostgreSQL for backend usage."* `package.json` has none of `better-auth`,
   `prisma`, `@prisma/client` or any database driver; there is no `app/api/`,
   no schema, and `open-next.config.ts` configures a static-asset cache with
   no KV/R2/D1 binding. The entry's own tags (Next.js, TypeScript, Tailwind,
   Cloudflare, Playwright) contradict its description. A reader who opens
   the linked GitHub repo sees the mismatch immediately.
2. **Misspelled technology names.** `Next.JS` (four times; the same file
   spells it `Next.js` once), `Tensorflow`, `Pytorch`, `Sci-kit`,
   `Postgresql` (vs `PostgreSQL` elsewhere in the same file), `Deans List`,
   `Algorithm's`, and `Typescript` in the footer. Also `iCharm` in the bio vs
   `iCHARM` in the experience entry.

This plan applies only the objective corrections. Wording that is the
owner's voice (the bio's internship sentence, the tagline) is listed under
"Owner decisions" and is NOT to be changed by the executor.

## Current state

`lib/data.ts` (as of `38c20f5`):

```ts
21:    tags: ['Next.JS', 'TypeScript', 'Python', 'Docker', 'CARLA'],
38:      'Developed predictive analytics model using linear/multinomial regression and XGBoost algorithms. Data operations are managed with PostgreSQL and results are visualized using Matplotlib',
39-47:    tags: [
      'Python',
      'Tensorflow',
      'Pytorch',
      'Sci-kit',
      'Matplotlib',
      'Pandas',
      'Postgresql',
    ],
53:    title: 'Portfolio Website // waphong.com',
54-55:    description:
      'My personal portfolio website. Integrates BetterAuth, Prisma and PostgreSQL for backend usage.',
56:    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Cloudflare', 'Playwright'],
64:    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Netlify'],
72:    tags: ['Next.JS', 'TypeScript', 'Tailwind', 'Netlify'],
185:    awards: 'Cum Laude, Deans List Spring 2023 & 2024',
186-187:    classes:
      "Data Structures and Algorithm's, Operating Systems, ...",
```

`app/(portfolio)/_components/RightFooter.tsx:8`:

```tsx
        Developed with Next.js, Typescript, Tailwind CSS, and deployed on
```

`app/(portfolio)/_components/AboutMe.tsx:27`:

```tsx
        with the SDSU Climate Informatics Lab, working on the iCharm interface.
```

`lib/data.ts:118-121` spells it `iCHARM`:

```ts
    company: 'SDSU Research Foundation — Climate Informatics Lab',
    ...
      'Founding engineer on iCHARM, a full-stack platform for 3D visualization ...
```

Facts about this repo to write the replacement from: Next.js 16 App Router,
TypeScript, Tailwind CSS v4, statically generated, deployed to Cloudflare
Workers through OpenNext (`README.md` "Deployment"), Playwright end-to-end
tests run in CI (`.github/workflows/ci.yml`), Renovate-managed dependencies.

Conventions: `lib/data.ts` strings use single quotes unless the text has an
apostrophe (then double quotes); Prettier enforces it.

## Commands you will need

| Purpose        | Command                                   | Expected on success        |
|----------------|-------------------------------------------|----------------------------|
| Typecheck      | `pnpm exec tsc --noEmit`                  | exit 0                     |
| Lint / format  | `pnpm lint` / `pnpm format`               | exit 0                     |
| E2E            | `pnpm test`                               | all pass                   |

## Scope

**In scope** (the only files you should modify):
- `lib/data.ts` (the lines listed in Step 1 only)
- `app/(portfolio)/_components/RightFooter.tsx` (line 8 only)
- `app/(portfolio)/_components/AboutMe.tsx` (line 27 only)

**Out of scope** (do NOT touch, even though they look related):
- Any sentence listed under "Owner decisions" below.
- `public/files/resume.pdf` — the PDF may carry the same typos; the owner
  regenerates it.
- `README.md`.
- Descriptions' substance (dates, claims about other projects) — only the
  spellings and the one false claim change.

## Git workflow

- Branch: `advisor/009-portfolio-copy` from the current HEAD.
- One commit. Message style: short imperative sentence, e.g.
  `Correct the site description and technology names`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Apply the corrections in `lib/data.ts`

| Line | Replace | With |
|---|---|---|
| 21, 56, 64, 72 | `'Next.JS'` | `'Next.js'` |
| 41 | `'Tensorflow'` | `'TensorFlow'` |
| 42 | `'Pytorch'` | `'PyTorch'` |
| 43 | `'Sci-kit'` | `'scikit-learn'` |
| 46 | `'Postgresql'` | `'PostgreSQL'` |
| 55 | `'My personal portfolio website. Integrates BetterAuth, Prisma and PostgreSQL for backend usage.'` | `'My personal portfolio website. Statically generated with Next.js and Tailwind CSS, deployed to Cloudflare Workers through OpenNext, with Playwright end-to-end tests gating every change in CI.'` |
| 185 | `Deans List` | `Dean's List` (the string will need double quotes: `"Cum Laude, Dean's List Spring 2023 & 2024"`) |
| 187 | `Algorithm's` | `Algorithms` |

**Verify**:

```sh
grep -n "Next\.JS\|Tensorflow\|Pytorch\|Sci-kit\|Postgresql\|BetterAuth\|Prisma\|Deans List\|Algorithm's" lib/data.ts
```

→ no output.

### Step 2: Footer and bio spellings

- `RightFooter.tsx:8`: `Typescript` → `TypeScript`.
- `AboutMe.tsx:27`: `iCharm` → `iCHARM` (matches `lib/data.ts` and the
  project's own capitalisation).

Run `pnpm exec prettier --write lib/data.ts 'app/(portfolio)/_components/RightFooter.tsx' 'app/(portfolio)/_components/AboutMe.tsx'`.

**Verify**: `grep -rn "Typescript\|iCharm" app lib` → no output.

### Step 3: Gate

**Verify**: `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format` → exit 0.
`pnpm test` → all pass (`tests/homepage.spec.ts` looks for the `Unity` tag
and the `Discord Bot` title, both unchanged).

## Test plan

No new tests — content only. The existing suite renders every changed
string. Verification: `pnpm test` → all pass.

## Done criteria

Machine-checkable. ALL must hold:

- [ ] The Step 1 and Step 2 greps return nothing
- [ ] `grep -c "Cloudflare Workers through OpenNext" lib/data.ts` → 1
- [ ] `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm format`, `pnpm test` exit 0
- [ ] `git diff --stat` lists only the three in-scope files (plus `plans/README.md`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- Any "Replace" string in Step 1 is not found at the stated line (the file
  changed since `38c20f5`; re-locate with `grep -n`, and if the sentence
  itself has been rewritten, stop — the owner already edited it).
- You are tempted to reword anything outside the table. Don't; list it in
  your report instead.

## Owner decisions (not executed by this plan)

Recorded so they are not lost; each is a wording call only the owner can make:

- `AboutMe.tsx:19-21` says "I've recently completed an internship at a
  biotech startup, applying machine learning to accelerate drug discovery",
  but the newest experience entry (`lib/data.ts:108-114`) is a *current*
  Machine Learning Intern role at Sesh Incorporated (Jun 2026 – Present)
  and the completed one (Tensor Therapeutics) ended Aug 2025. Suggested
  shape: "I'm currently a machine learning intern at Sesh, working on
  immuno-oncology models, after a summer at a biotech startup applying ML
  to drug discovery."
- `LeftSide.tsx:21` tagline "MSCS, Graduate Research Assistant @ SDSU"
  omits the current internship.
- `lib/data.ts:24` PromptCARLA `date: 'Present'` breaks the "Mon YYYY" /
  range format of every other entry (the field is not rendered today).
- `lib/data.ts:41-42` list TensorFlow and PyTorch on the F1 project whose
  description mentions neither.
- `lib/data.ts:93` Discord Bot "Jan 2019 - Present" — confirm it is still
  running.
- Mixed straight (`'`) and curly (`’`) apostrophes in `AboutMe.tsx`
  (lines 8, 9, 15, 24, 30) — pick one.

## Maintenance notes

- `lib/data.ts` is the single source for portfolio copy; `resume.pdf` is
  maintained by hand alongside it (both changed in commit `5288763`). When
  one changes, check the other.
- Reviewer: read the new site description once for tone; everything else
  is spelling.
