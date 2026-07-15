# Contributing

Thanks for helping build a curated, trustworthy accessibility knowledge base for Power Platform. This project is almost entirely documentation, so most contributions are writing, correcting, or reviewing content rather than code.

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
- Power Automate

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

## Code of conduct

Be respectful and constructive. This is a community resource meant to help people ship more accessible Power Platform solutions — keep contributions focused on that goal.
