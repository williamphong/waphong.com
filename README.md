## Personal Website

Hi, my name is William Phong and this is my portfolio website! This is a project done to learn Next.js, Typescript, and Tailwind. Part of the design and css come from websites that have inspired me - https://brittanychiang.com and https://carlbeaverson.com. ESLint and Prettier were also utilized to streamline my development process. New features are developed on my test branch.

## Stack

- **Next.js 16** (App Router, Turbopack) with **React 19** and **TypeScript**
- **Tailwind CSS v4** (CSS-first config, no `tailwind.config.ts`), Rosé Pine palette
- **pnpm** as the package manager — pinned via `packageManager` in `package.json`
- **Playwright** for end-to-end tests

The site is split into three route groups, each with its own root layout: `(portfolio)`, `(blog)`, and `(gallery)`. Because they are separate root layouts, navigating between them is a full document load rather than a client transition.

## Deployment

The site runs on **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare), with Cloudflare DNS and a domain registered through Porkbun. It was originally deployed on Vercel and migrated to Workers.

Cloudflare Workers Builds watches `main` and runs:

```
npx opennextjs-cloudflare build   # build command
npx wrangler deploy               # deploy command
```

Two details make that work:

- `open-next.config.ts` configures `staticAssetsIncrementalCache`. Prerendered pages of dynamic routes (`/blog/[id]`, which sets `dynamicParams = false`) are only reachable through the incremental cache — without one, every lookup misses and Next.js returns a 404.
- `wrangler.jsonc` runs `opennextjs-cloudflare populateCache local` as a custom build step. That copies the prerendered pages into `.open-next/assets/cdn-cgi/_next_cache` so they ship with the asset upload. `opennextjs-cloudflare deploy` does this on its own; a bare `wrangler deploy` does not.

## Local development

```
pnpm install
pnpm dev          # next dev
pnpm preview      # build + run the real Worker locally
pnpm lint
pnpm format:fix
```

`.dev.vars` holds local Cloudflare bindings and is gitignored.

## Credits

- [pqoqubbw/icons](https://icons.pqoqubbw.dev/) — animated icons
- [cursify](https://cursify.vercel.app/) — spotlight cursor
- [shadcn/ui](https://ui.shadcn.com/) — button primitive
- [transfonter](https://transfonter.org/) — font subsetting
