# Copilot instructions for `powerplatform-accessibility-docs`

## Build, test, and lint

- This repository does not define build, test, or lint tooling today. There is no `package.json`, `Makefile`, CI workflow, or language-specific test project in the repo root.
- There is no single-test command to run; changes are documentation-only and should be validated by reviewing the touched Markdown, frontmatter, and links against the cited source material.

## High-level architecture

- This repo is a documentation knowledge base, not an application codebase. `README.md` defines the repository purpose and the product-area taxonomy, while `CONTRIBUTING.md` defines how every documentation page should be structured.
- Documentation is organized by product area under `docs/`. Each product area gets its own directory (for example `docs/powerpages/`, `docs/powerapps-canvas/`, `docs/powerapps-component-framework/`) and the directory-level `index.md` acts as the landing page for that area.
- At the moment, `docs/powerpages/index.md` is the only populated page; the other product-area `index.md` files are placeholders. When adding new content, keep it under the appropriate product-area directory instead of creating a flat list of top-level docs.
- The repository's content model is "curated summary plus source traceability": pages are derived from authoritative upstream sources such as Microsoft Learn, WCAG/W3C, ETSI EN 301 549, or section508.gov, then rewritten into practical guidance for architects and developers.
- `.github/ISSUE_TEMPLATE/` encodes the main maintenance workflows: new documentation, documentation inaccuracies, outdated upstream content, and broken links. `config.yml` routes general questions to GitHub Discussions instead of issues.

## Key conventions

- Every documentation page starts with YAML frontmatter using this shape from `CONTRIBUTING.md`:

  ```yaml
  ---
  title: Page title
  description: One-sentence summary of the page.
  source: https://learn.microsoft.com/...
  last_verified: YYYY-MM-DD
  ---
  ```

- Always update `last_verified` when you confirm a page still matches its source, even if the prose does not otherwise change.
- Keep content practical and source-linked. Prefer restructuring and summarizing the source over copying it, and add a `Related links` section at the end that points back to the authoritative references.
- Follow the existing documentation style from `CONTRIBUTING.md` and `docs/powerpages/index.md`: use `##`/`###` headings without skipping levels, tables for structured comparisons, blockquotes for important responsibility callouts, and checklist items for review gates.
- Be precise with accessibility terminology and standards naming. Keep WCAG 2.1, WCAG 2.2, Section 508, and EN 301 549 distinct rather than treating them as interchangeable.
- Keep new content in scope for Power Platform accessibility guidance only. General Power Platform how-to content that is not accessibility-related does not belong here.
- Commit messages follow Conventional Commits. See `.github/instructions/commit-messages.instructions.md` for the full repository commit message guidance.
