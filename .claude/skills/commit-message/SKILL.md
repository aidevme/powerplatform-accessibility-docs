---
name: commit-message
description: Draft a Conventional Commits-formatted commit message for the current staged/unstaged changes in this repo, following .github/instructions/commit-messages.instructions.md.
---

# Commit message

Draft a commit message for the current changes in this repository, following the Conventional Commits specification described in `.github/instructions/commit-messages.instructions.md`.

## Steps

1. Run `git status` and `git diff --staged` (fall back to `git diff` if nothing is staged) to see what actually changed.
2. Run `git log --oneline -10` to match this repo's existing commit message style and scope naming.
3. Determine the correct `type` (see Types below) and `scope`. Prefer this repo's actual product-area/folder names as scopes—`power-pages`, `canvas-apps`, `code-apps`, `powerapps-component-framework`, `fluent-ui-react`, `generative-pages`, `mcp-apps`, `mobile-apps`, `model-apps`, `github`, `docs`, `deps`. Omit the scope only for genuinely repo-wide changes.
4. Write the subject in imperative mood, lowercase first letter, no trailing period, 72 characters or fewer.
5. If the change needs explanation beyond the subject—non-obvious motivation, a decision worth recording—add a body explaining *why*, wrapped at roughly 72 characters, separated from the subject by a blank line.
6. If the change is a breaking change, mark it with `!` after the type/scope and add a `BREAKING CHANGE:` footer describing what breaks and how to migrate.
7. If the diff spans multiple unrelated concerns, say so explicitly and suggest splitting into separate commits rather than writing one broad message covering everything.

## Types

- `feat`—a new feature
- `fix`—a bug fix
- `docs`—documentation-only changes
- `style`—formatting/whitespace, no behavior change
- `refactor`—code change that neither fixes a bug nor adds a feature
- `test`—adding or correcting tests
- `chore`—maintenance, tooling, dependency bumps
- `perf`—a performance improvement
- `ci`—CI/CD configuration or scripts
- `build`—build system or external dependency changes
- `revert`—reverts a previous commit (`revert: <original subject>`, body: `This reverts commit <hash>.`)

## Output

Present the drafted commit message in a fenced code block. **Do not run `git commit` yourself unless the user explicitly asks you to**—this skill only drafts the message.
