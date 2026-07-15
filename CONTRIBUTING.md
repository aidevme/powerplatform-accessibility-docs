# Contributing

Thanks for helping build a curated, trustworthy accessibility knowledge base for Power Platform. This project is almost entirely documentation, so most contributions are writing, correcting, or reviewing content rather than code.

## About this repository

This is a documentation-only repository: plain Markdown files under [`docs/`](docs), with no build step, package manager, or static site generator. There's no `package.json`—linting and spell-checking tools ([markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2), [cspell](https://cspell.org/)) are meant to be installed globally rather than as project dependencies.

## Ways to contribute

- **Fix an inaccuracy** — outdated guidance, wrong defaults, incorrect standard references.
- **Add a new page** — cover a product area or topic not yet documented (see [Scope](#scope) below).
- **Update stale content** — the upstream Microsoft Learn source or a referenced standard (WCAG, Section 508, EN 301 549) has changed.
- **Fix a broken link.**
- **Improve clarity** — better structure, examples, or checklists for existing pages.

If you're not sure where something belongs or whether it's in scope, open an issue first using one of the [issue templates](.github/ISSUE_TEMPLATE/) — `New documentation page`, `Documentation inaccuracy`, `Outdated content`, or `Broken link`.

## Scope

This repo covers accessibility (WCAG 2.1/2.2, EN 301 549, Section 508) guidance for:

- Power Pages
- PCF components
- Canvas Apps
- Model-Driven Apps

Content should be useful to architects and developers shipping compliant enterprise solutions — practical, actionable, and traceable to an authoritative source. General Power Platform how-to content that isn't accessibility-related is out of scope.

## Documentation structure and conventions

- Pages live under `docs/<product-area>/`, e.g. `docs/powerpages/index.md`. Use one directory per product area; add new pages under the relevant one, or create a new directory for a new area.
- Each page starts with frontmatter:

  ```yaml
  ---
  title: Page title
  description: One-sentence summary of the page.
  source: https://learn.microsoft.com/... # primary source this page is derived from, if any
  last_verified: YYYY-MM-DD               # date you last checked the content against the source
  ---
  ```

- Update `last_verified` whenever you confirm a page still matches its source, even if no other content changes.
- Write in Markdown, following the style already used in existing pages:
  - `##`/`###` headings for structure; don't skip levels.
  - Tables for structured comparisons (e.g., standards, options, controls).
  - Blockquotes (`>`) for important callouts (e.g., "you are responsible for...").
  - Checklists (`- [ ]`) for actionable review steps.
  - Link to primary sources (Microsoft Learn, W3C/WCAG, ETSI, section508.gov) rather than restating them from memory — verify links resolve before submitting.
- Prefer restructuring/summarizing source material over copying it verbatim; add a "Related links" section at the end pointing back to the original source(s).
- Keep guidance practical: where relevant, prefer adding a short checklist or table over long prose.

## Editing and linting

For general writing guidance beyond this repo's own conventions, see the 📖 [Microsoft Docs Authoring Pack](https://learn.microsoft.com/contribute/content/how-to-write-docs-auth-pack)—clear content, markdown conventions, terminology, structure, and accessibility best practices for the docs themselves.

**In VS Code**, these extensions catch issues as you write:

- **[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)**—real-time markdown formatting feedback, using the rules in [`.markdownlint.jsonc`](.markdownlint.jsonc).
- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)**—flags likely typos, using the dictionary in [`cspell.json`](cspell.json). Power Platform product names and accessibility terms (Dataverse, Liquid, WCAG, ARIA, etc.) will trigger false positives if they're missing from `cspell.json`—add genuinely new terms there rather than ignoring them locally.

VS Code can also preview Markdown natively: open a `.md` file and use **Open Preview** (`Ctrl+Shift+V`) to check rendering and links before submitting.

**From the command line**, install both tools globally (there's no `package.json` to install them as project dependencies):

```sh
npm install -g markdownlint-cli2 cspell
```

Then run them from the repo root—both automatically pick up their config files (`.markdownlint.jsonc`, `cspell.json`):

```sh
markdownlint-cli2 "**/*.md"
cspell "**/*.md"
```

**In CI:** the [`validate-markdown`](.github/workflows/validate-markdown.yml) workflow runs markdownlint, a link checker, and cspell on every pull request—running the commands above locally first means no surprises when the workflow runs.

## Branch naming convention

Use the following prefixes for branch names:

- `docs/`—for documentation changes (e.g., `docs/update-api-guide`)
- `chore/`—for maintenance tasks (e.g., `chore/update-dependencies`)

## Submitting changes

1. Fork the repo (or create a branch if you have write access).
2. Make your changes under `docs/` (or elsewhere, for repo tooling).
3. Follow the [Conventional Commits](https://www.conventionalcommits.org/) format for commit messages: `<type>(<scope>): <subject>`.
   - Common types for this repo: `docs` (content changes), `chore` (repo tooling, templates, config), `fix` (correcting an error in existing docs).
   - Examples:
     - `docs(powerpages): correct WCAG version referenced in forms section`
     - `docs(canvasapps): add accessible screen reader guidance page`
     - `chore(github): update issue templates`
4. Open a pull request describing:
   - What changed and why.
   - The source(s) backing the change, if applicable.
   - Whether `last_verified` was updated.

## Review expectations

- Content should be technically accurate and traceable to an authoritative source — cite it.
- Prefer clarity and brevity over exhaustive restatement of the source material.
- Accessibility terminology and standard names (WCAG 2.1 vs 2.2, Section 508, EN 301 549) should be used precisely — don't conflate them.
- Reviewers may ask for a source link or a more recent reference if content looks outdated.

## Questions?

Check existing [issues](.github/ISSUE_TEMPLATE/) for similar questions first, then open a new issue, or start a [GitHub Discussion](https://github.com/aidevme/powerplatform-accessibility-docs/discussions) for general questions.

## Code of conduct

Be respectful and constructive. This is a community resource meant to help people ship more accessible Power Platform solutions — keep contributions focused on that goal.
