# Plan 001: Make `pnpm format` pass again so CI is green on this branch

> **Executor instructions**: Follow this plan step by step. Run every
> verification command and confirm the expected result before moving to the
> next step. If anything in the "STOP conditions" section occurs, stop and
> report — do not improvise. When done, update the status row for this plan
> in `plans/README.md` — unless a reviewer dispatched you and told you they
> maintain the index.
>
> **Drift check (run first)**: `git diff --stat 38c20f5..HEAD -- .prettierignore .agents .github/workflows/ci.yml`
> If any in-scope file changed since this plan was written, compare the
> "Current state" excerpts against the live code before proceeding; on a
> mismatch, treat it as a STOP condition.

## Status

- **Priority**: P1
- **Effort**: S
- **Risk**: LOW
- **Depends on**: none
- **Category**: dx
- **Planned at**: commit `38c20f5`, 2026-09-07

## Why this matters

CI (`.github/workflows/ci.yml`) runs `pnpm format` (Prettier in check mode)
as a hard gate. Commit `38c20f5` on this branch added four vendored Markdown
files under `.agents/skills/improve/` that are not Prettier-formatted, so
`pnpm format` currently exits 1. The moment this branch is pushed or a PR is
opened, CI goes red, and every other plan in this directory that relies on
"`pnpm format` exits 0" as a done criterion cannot pass. Ignoring the vendored
directory is the right fix: the files are tracked by `skills-lock.json`
(`computedHash`), so reformatting them would change the locked content.

## Current state

- `.prettierignore` — the ignore list Prettier is given alongside
  `.gitignore` (see `package.json` scripts `format` / `format:fix`).
- `.agents/skills/improve/**` — four vendored Markdown files (SKILL.md and
  three references). `.claude/skills/improve` is a symlink to
  `.agents/skills/improve`.

`.prettierignore` today (`.prettierignore:1-11`):

```
# The format scripts pass this file alongside .gitignore. A single
# --ignore-path *replaces* the default, so this file used to be ignored itself.

# Generated
pnpm-lock.yaml
.open-next
.wrangler
build
coverage
test-results
playwright-report
```

Current failure (`pnpm format`, verified 2026-09-07):

```
[warn] .agents/skills/improve/references/audit-playbook.md
[warn] .agents/skills/improve/references/closing-the-loop.md
[warn] .agents/skills/improve/references/plan-template.md
[warn] .agents/skills/improve/SKILL.md
[warn] Code style issues found in 4 files. Run Prettier with --write to fix.
 ELIFECYCLE  Command failed with exit code 1.
```

Repo convention: config files carry a short comment explaining *why* a line
exists (see the header of `.prettierignore` itself). Match that.

## Commands you will need

| Purpose      | Command                            | Expected on success                                   |
|--------------|------------------------------------|-------------------------------------------------------|
| Install      | `pnpm install --frozen-lockfile`   | exit 0                                                |
| Format check | `pnpm format`                      | exit 0, "All matched files use Prettier code style!"  |
| Lint         | `pnpm lint`                        | exit 0, 0 warnings                                    |

## Scope

**In scope** (the only files you should modify):
- `.prettierignore`

**Out of scope** (do NOT touch, even though they look related):
- `.agents/**` and `.claude/**` — vendored skill files; do NOT run
  `format:fix` on them.
- `skills-lock.json` — its `computedHash` tracks the vendored content.
- `.github/workflows/ci.yml` — the gate is correct; the input was wrong.

## Git workflow

- Branch: `advisor/001-unblock-ci-format-gate`, created from the current HEAD
  of `update-portfolio-content`.
- One commit. Message style in this repo is a short imperative sentence with
  no prefix, e.g. `Add agent instructions and improve skill`. Suggested:
  `Ignore vendored agent skills in Prettier`.
- Do NOT push or open a PR unless the operator instructed it.

## Steps

### Step 1: Ignore the vendored skill directories

Append to the end of `.prettierignore`:

```
# Vendored agent skills (tracked by skills-lock.json). Their formatting is
# owned upstream; rewriting them would change the locked content hash.
.agents
.claude
```

**Verify**: `pnpm format` → exit 0 and the line
`All matched files use Prettier code style!`

### Step 2: Confirm nothing else is affected

**Verify**: `pnpm lint` → exit 0, no warnings.
**Verify**: `git status --short` → only ` M .prettierignore` (plus
`plans/README.md` once you update it).

## Test plan

No new tests: this is a tooling change verified by the gate itself
(`pnpm format` exit code).

## Done criteria

Machine-checkable. ALL must hold:

- [ ] `pnpm format` exits 0
- [ ] `pnpm lint` exits 0
- [ ] `git diff --stat` shows only `.prettierignore` (and `plans/README.md`)
- [ ] `plans/README.md` status row updated

## STOP conditions

Stop and report back (do not improvise) if:

- After Step 1, `pnpm format` still reports files outside `.agents/` or
  `.claude/` — something else on the branch is unformatted and needs a human
  decision on whether to run `format:fix` on it.
- `.prettierignore` no longer matches the excerpt above.

## Maintenance notes

- Any future vendored directory (skills, generated docs) belongs in this
  block, not in `format:fix`.
- Reviewer: check that `.agents` and `.claude` are the only additions and
  that no vendored file was rewritten (`git diff --stat` must not list them).
