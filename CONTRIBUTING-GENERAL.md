# Contributing to Power Platform Accessibility Documentation

Thank you for your interest in contributing! This guide covers general environment setup and editing tips for working with this repository.

For what to contribute, documentation structure/frontmatter, and how to submit changes, see [CONTRIBUTING.md](CONTRIBUTING.md) — that's the primary contributing guide.

## About this repository

This is a documentation-only repository: plain Markdown files under [`docs/`](docs), with no build step, package manager, or test suite. There's no `package.json`, linter config, or static site generator here today — you can edit and preview the Markdown directly.

## Documentation standards

We follow Microsoft's documentation standards to ensure consistent, high-quality content. For general guidance on writing effective documentation, see:

📖 **[Microsoft Docs Authoring Pack](https://learn.microsoft.com/contribute/content/how-to-write-docs-auth-pack)** — writing clear content, markdown conventions, terminology, structure, and accessibility best practices for the docs themselves.

## Editing in VS Code

There's no repo-level linting configuration, but these extensions still help catch basic issues as you write:

- **[markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)** — real-time markdown formatting feedback (uses its default rule set, since this repo has no `.markdownlint.jsonc`).
- **[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)** — flags likely typos. Power Platform product names and accessibility terms (Dataverse, Liquid, WCAG, ARIA, etc.) will trigger false positives — use "Add to Workspace Dictionary" for legitimate terms rather than ignoring them.

VS Code can also preview Markdown natively: open a `.md` file and use **Open Preview** (`Ctrl+Shift+V`) to check rendering and links before submitting.

## Submitting changes

See [CONTRIBUTING.md](CONTRIBUTING.md) for scope, page structure, frontmatter requirements, and commit message conventions ([Conventional Commits](https://www.conventionalcommits.org/)).

## Questions?

1. Review [CONTRIBUTING.md](CONTRIBUTING.md) for content and structure guidance.
2. Check existing [issues](.github/ISSUE_TEMPLATE/) for similar questions.
3. Open a new issue, or start a [GitHub Discussion](https://github.com/aidevme/powerplatform-accessibility-docs/discussions) for general questions.

Happy contributing!
