---
title: Accessibility in Power Apps Generative Pages
description: How the built-in Accessibility Assistant works in AI-generated model-driven app pages, and what still needs manual review.
source: https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generative-pages
last_verified: 2026-07-16
---

# Accessibility in Power Apps Generative Pages

**Generative pages** let a model-driven app maker describe a page in natural language—optionally referencing up to six Dataverse tables and attaching a reference image—and an AI agent generates the React code (front-end and business logic) for a fully functional page. It's the newest AI-driven surface covered in this repo, and unlike Code Apps or standard PCF controls, it ships with dedicated, built-in accessibility tooling.

**Key takeaway:** Generative pages include a real **Accessibility Assistant** that scans the generated code after every iteration and offers a one-click "Auto fix." That's a genuine step up from Code Apps or PCF, which give you nothing. But Microsoft's own documentation states—twice, in nearly identical wording—that generated code is **not guaranteed to be production-ready or compliant**, and validating it remains entirely the maker's responsibility.

## What generative pages are

- Available only in **model-driven apps**—not canvas apps. (Microsoft's own FAQ confirms: *"Can I use generative pages with canvas apps or other app types? No, generative pages are currently only supported in model-driven apps."*)
- Two ways to build them:
  - **Power Apps maker studio** (make.powerapps.com)—a browser-based conversational UI. Limited to environments in the United States, Great Britain, Australia, or Singapore.
  - **AI code generation tools**—for developers who want local TypeScript/React development and CLI-based deployment, using external tools that Microsoft's own docs name explicitly, including **Claude Code**. Available worldwide on public clouds.
- Constrained to Dataverse data: up to 6 tables per page, a fixed set of supported column data types, and CRUD operations only—no other data sources.

- Source: [Generate a page using natural language with model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generative-pages)

## Built-in Accessibility Assistant

After each iteration of code generation, an **Accessibility assistant** panel at the bottom of the screen scans the generated code for accessibility issues:

- Shows a high-level status directly on screen.
- Lets you open detailed results in a panel.
- Offers **Auto fix**, which passes violations back to the agent to attempt an automatic resolution.

> **Note:** Microsoft's documentation describes the Accessibility Assistant specifically within the **browser maker-studio** workflow. It doesn't state whether the same scanning runs when generating pages through the external AI code-gen tools/CLI path instead. Don't assume it applies there until you've confirmed it yourself.

## What Microsoft says about compliance

The source article and its FAQ both state, in nearly identical language:

> **Important:** While the agent makes a best-effort attempt to generate complete, production-ready code, including considerations for accessibility and security best practices, you're ultimately responsible for validating the code. Ensure the generated code meets your organization's standards and compliance requirements.

Microsoft's published evaluation methodology for this feature tests for syntactic correctness, UX/functional quality, and alignment with "Microsoft's responsible AI principles"—it does **not** describe testing against WCAG, Section 508, or EN 301 549 specifically. No standard or conformance level is named anywhere in the source documentation.

- Source: [FAQ about generative pages in model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/common/faq-generative-pages-model-driven)

## Limitations relevant to accessibility

- **Model-driven apps only**—this guidance doesn't apply to canvas apps.
- **Collaboration isn't supported**—only one maker should work on a generative page at a time.
- **Localization and right-to-left (RTL) support aren't automatic.** To get them, your prompt must explicitly ask for target languages, a translation dictionary for user-visible text, and RTL layout support for languages like Arabic or Hebrew—otherwise you get none of it by default.
- **In-studio prompting is US-English only**; the external AI code-gen tools path supports other languages and is available worldwide.

## Quick tips / suggested review checklist

- [ ] Run every iteration through the Accessibility Assistant panel before publishing—don't rely on the first pass alone.
- [ ] Review "Auto fix" output before accepting it—it's still AI-generated code that needs validation, not a guarantee.
- [ ] Don't state or imply WCAG, Section 508, or EN 301 549 conformance for a generative page—Microsoft's own docs explicitly don't guarantee any of it.
- [ ] If you used external AI code-gen tools (CLI-based, e.g. Claude Code) instead of the maker studio, manually verify whether the Accessibility Assistant ran at all—it's documented for the studio flow, not confirmed for the CLI path.
- [ ] Test with real keyboard navigation and a screen reader in addition to the Accessibility Assistant's automated scan—automated tools don't catch everything.
- [ ] If the page must support right-to-left languages, confirm your original prompt explicitly requested it.
- [ ] Remember this feature is model-driven-app-only; don't apply this checklist to canvas apps.

## Related links

- [Generate a page using natural language with model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generative-pages)
- [FAQ about generative pages in model-driven apps](https://learn.microsoft.com/en-us/power-apps/maker/common/faq-generative-pages-model-driven)
- [Create and edit generative pages with AI code generation tools](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generative-page-external-tools)
- [Create accessible canvas apps](../canvas-apps/index.md)—the other Power Apps surface with built-in, maker-facing accessibility tooling
- [Comparison across Power Platform surfaces](../index.md)
