# Standalone commit message prompt

A self-contained prompt for generating a commit message with any AI tool. Paste the block below, then append your `git diff` output (or a plain description of the change) where indicated.

---

You are an expert software engineer writing a git commit message for the changes provided below. Follow the Conventional Commits specification exactly.

## Format

```text
<type>(<scope>): <subject>

<optional body>

<optional footer(s)>
```

## Rules

- **type** (required): one of `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`.
- **scope** (optional but preferred when the change is localized): a short noun describing the affected area (a module, folder, or feature name). Omit it only when the change is genuinely repo-wide or doesn't map to one area.
- **subject** (required): imperative mood ("add", not "added"/"adds"), lowercase first letter, no trailing period, 72 characters or fewer, describes *what* changed.
- **body** (optional): wrap at roughly 72 characters per line. Explain *why* the change was made and any context a reviewer needs—not a restatement of the diff. Separate from the subject with one blank line.
- **breaking changes**: mark with `!` immediately after the type/scope (e.g., `feat(api)!: ...`) AND include a `BREAKING CHANGE: <description>` footer explaining what breaks and how to migrate.
- **footers** (optional): `BREAKING CHANGE: ...`, `Closes #123`, `Refs #456`—one per line, after a blank line following the body.
- **revert commits**: use `revert: <subject of the commit being reverted>` with a body containing `This reverts commit <hash>.`

## Types

- `feat`—a new feature
- `fix`—a bug fix
- `docs`—documentation-only changes
- `style`—formatting, whitespace, missing semicolons—no code behavior change
- `refactor`—code change that neither fixes a bug nor adds a feature
- `test`—adding or correcting tests
- `chore`—maintenance, tooling, dependency bumps that don't affect src or test files
- `perf`—a performance improvement
- `ci`—CI/CD configuration or scripts
- `build`—build system or external dependency changes
- `revert`—reverts a previous commit

## Examples

- `feat: add connection export functionality`
- `feat(tools): add tool verification system`
- `fix: resolve tool loading error on startup`
- `fix(connections): handle invalid connection URLs`
- `docs: update README with new API examples`
- `docs(api): add missing type definitions`
- `style: format code according to ESLint rules`
- `refactor: restructure tool manager for better maintainability`
- `refactor(auth): simplify authentication flow`
- `test: add unit tests for settings manager`
- `chore: update dependencies to latest versions`
- `chore(build): update TypeScript configuration`
- `perf(query): memoize expensive filter computation`
- `ci(actions): bump node version to 24`
- `feat(auth)!: require MFA for admin accounts`

  `BREAKING CHANGE: Admin accounts without MFA enrolled will be locked out until they complete enrollment.`
- `revert: feat(tools): add tool verification system`

  `This reverts commit a1b2c3d.`

## What I'll give you

The output of `git diff` (staged or unstaged) and/or a plain-language description of the change.

## What I want back

1. A single commit message following the format above, in a fenced code block.
2. If the change genuinely spans multiple unrelated concerns, say so explicitly and suggest splitting into separate commits instead of writing one broad message.
3. If the diff doesn't give enough context to know *why* the change was made, ask rather than guessing at a body.

Here is the diff:

```diff
<PASTE DIFF HERE>
```
