# Writing Style Guide

This guide provides prescriptive instructions for writing accessibility guidance pages in this repository. For scope, frontmatter requirements, and how to submit changes, see [CONTRIBUTING.md](CONTRIBUTING.md); for environment setup, see [CONTRIBUTING-GENERAL.md](CONTRIBUTING-GENERAL.md).

## Required Page Structure

Every page under `docs/<product-area>/` should follow this structure, in order:

1. YAML frontmatter (`title`, `description`, `source`, `last_verified`)
1. Page title (H1) — matches the frontmatter `title`
1. Intro paragraph — what the page covers and why it matters to the reader
1. "Key takeaway" callout or paragraph — the one thing a reader should walk away with if they read nothing else
1. Body sections (H2/H3) — standards conformance, configuration options, responsibilities, etc.
1. Quick tips / suggested review checklist — practical, actionable guidance
1. Related links — sources and further reading

Not every page needs every section (a stub page won't have a checklist yet), but don't skip the frontmatter, H1, or intro.

## YAML Frontmatter

Every page starts with:

```yaml
---
title: Page title
description: One-sentence summary of the page.
source: https://learn.microsoft.com/... # primary source this page is derived from, if any
last_verified: YYYY-MM-DD               # date you last checked the content against the source
---
```

Update `last_verified` whenever you confirm a page still matches its source, even if no other content changes.

## Intro and Key Takeaway

Open with 1-2 short paragraphs stating what the reader needs to know and why. Address the reader as an architect or developer responsible for shipping a compliant solution — not a beginner being onboarded.

Follow with a clear statement of the reader's responsibility, since most pages in this repo hinge on a **platform conforms, but customizations are your responsibility** distinction. Bold the core takeaway.

**Example** (from `docs/powerpages/index.md`):

> Power Pages the *platform* conforms to WCAG 2.2, Section 508, and EN 301 549. However, conformance is not automatically inherited by your site once you add custom HTML, Liquid, JavaScript, CSS, or embedded components (Power BI reports, custom web templates, etc.). **You own the accessibility of anything you customize.**

## Headings

Use `##`/`###` for structure — don't skip levels. Prefer descriptive headings over generic ones (`### Liquid templates and content snippets`, not `### More details`). Break a broad topic (e.g., "accessibility standards conformed to") into one H3 per standard so each can be scanned or linked independently.

## Callouts

Use a blockquote with a bold label, not GitHub-style alert syntax:

```markdown
> **Important:** When you customize a Power Pages site, **you are responsible** for meeting the applicable accessibility standards.
```

Reserve **Important:**/**Note:** callouts for responsibility statements, caveats, or information that's easy to miss — not routine content. Plain, unlabeled blockquotes are fine for pointing to general background reading (see the "For general Microsoft accessibility information..." example on the Power Pages page).

## Tables

Use tables to compare structured options:

- Standards conformance (standard, governing body, scope, conformance status)
- Configuration options (name, description, default value)

Keep cell content terse — a phrase or short sentence, not a paragraph.

## Checklists

End sections that describe actionable guidance with a `- [ ]` checklist the reader can use as a pre-release gate. Each item should be independently verifiable (a specific criterion, tool, or test), not a vague goal.

**Example:**

```markdown
- [ ] All images have appropriate `alt` text (or empty `alt=""` for decorative images).
- [ ] Color contrast meets WCAG 2.2 AA (contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text).
```

## Links and Sourcing

- Link to primary sources (Microsoft Learn, W3C/WCAG, ETSI, section508.gov) rather than restating them from memory — verify links resolve before submitting.
- Use relative paths for links to other pages in this repo (e.g., `../configure/liquid-overview`), and absolute URLs for everything external.
- End the page with a `## Related links` section listing the sources cited in the body plus the primary `source` from the frontmatter.
- Prefer restructuring/summarizing source material over copying it verbatim.

## Writing Style

- Use active voice and present tense.
- Write for an architect/developer audience: direct, technical, no marketing language.
- Keep sentences focused — break up long, multi-clause sentences rather than packing in qualifiers.
- Be precise with standards terminology: WCAG 2.1 and WCAG 2.2 are not interchangeable, and neither is "Section 508" with "EN 301 549." Say exactly which standard/version a claim applies to.
- **Accessibility of the writing itself:** use "select" (not "click") for UI interactions and "field" (not "textbox") for form inputs — readers may interact via keyboard, touch, or screen reader rather than a mouse. If a page includes configuration steps, start each step with an action verb (Select, Enter, Navigate, Configure) and use the exact UI text in **bold**.

## Additional Resources

- [CONTRIBUTING.md](CONTRIBUTING.md) — scope, frontmatter, and submission process.
- [CONTRIBUTING-GENERAL.md](CONTRIBUTING-GENERAL.md) — environment setup and editing tools.
- [Microsoft Writing Style Guide](https://learn.microsoft.com/style-guide/welcome/) — official Microsoft style and terminology guide.
