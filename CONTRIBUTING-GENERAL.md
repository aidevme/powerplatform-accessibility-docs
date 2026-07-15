# Contributing to Power Platform Accessibility Documentation

Thank you for your interest in contributing! This guide covers general environment setup and editing tips for working with this repository.

For what to contribute, documentation structure/frontmatter, and how to submit changes, see [CONTRIBUTING.md](CONTRIBUTING.md) — that's the primary contributing guide.

## About this repository

This is a documentation-only repository: plain Markdown files under [`docs/`](docs), with no build step, package manager, or test suite. There's no `package.json`, linter config, or static site generator here today — you can edit and preview the Markdown directly.

## Documentation standards

We follow Microsoft's documentation standards to ensure consistent, high-quality content. For general guidance on writing effective documentation, see:

📖 **[Microsoft Docs Authoring Pack](https://learn.microsoft.com/contribute/content/how-to-write-docs-auth-pack)** — writing clear content, markdown conventions, terminology, structure, and accessibility best practices for the docs themselves.

## Editing in VS Code

These extensions help catch basic issues as you write:

- **[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)** — real-time markdown formatting feedback, using the rules defined in [`.markdownlint.jsonc`](.markdownlint.jsonc).
- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)** — flags likely typos. Power Platform product names and accessibility terms (Dataverse, Liquid, WCAG, ARIA, etc.) will trigger false positives — use "Add to Workspace Dictionary" for legitimate terms rather than ignoring them.

VS Code can also preview Markdown natively: open a `.md` file and use **Open Preview** (`Ctrl+Shift+V`) to check rendering and links before submitting.

### Linting from the command line

There's no `package.json` in this repo, so [markdownlint-cli2](https://github.com/DavidAnson/markdownlint-cli2) is meant to be installed globally rather than as a project dependency:

```sh
npm install -g markdownlint-cli2
```

Then lint all docs from the repo root (it automatically picks up `.markdownlint.jsonc`):

```sh
markdownlint-cli2 "**/*.md"
```

There's no CI workflow enforcing this yet — running it locally before submitting a PR is currently the only check in place.

## Branch Naming Convention

Use the following prefixes for branch names:

- `docs/` - For documentation changes (e.g., `docs/update-api-guide`)
- `chore/` - For maintenance tasks (e.g., `chore/update-dependencies`)

## Submitting changes

See [CONTRIBUTING.md](CONTRIBUTING.md) for scope, page structure, frontmatter requirements, and commit message conventions ([Conventional Commits](https://www.conventionalcommits.org/)).

## Questions?

1. Review [CONTRIBUTING.md](CONTRIBUTING.md) for content and structure guidance.
2. Check existing [issues](.github/ISSUE_TEMPLATE/) for similar questions.
3. Open a new issue, or start a [GitHub Discussion](https://github.com/aidevme/powerplatform-accessibility-docs/discussions) for general questions.

Happy contributing!
