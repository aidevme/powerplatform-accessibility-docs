---
title: Accessibility in Power Apps MCP App Widgets
description: Why no Microsoft accessibility guidance exists for MCP App widgets, and what standards and Fluent UI Web Components conventions to apply instead.
source: https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generate-mcp-app-widgets
last_verified: 2026-07-16
---

# Accessibility in Power Apps MCP App Widgets

**MCP App widgets** are self-contained HTML files that render a Model Context Protocol (MCP) tool's JSON output visually—as cards, charts, tables, or maps—inside an MCP Apps-compatible chat host, such as Microsoft 365 Copilot Chat, Claude, or Visual Studio Code. You generate them with AI code-gen tools (Claude Code, GitHub Copilot CLI) using the `generate-mcp-app-ui` skill, rather than hand-writing them. This is a **preview feature**, distinct from the separate [Power Apps MCP Server](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/power-apps-mcp-server) feature (which lets agents invoke Power Apps tools for data entry and human-in-the-loop supervision)—that's a different capability and isn't covered on this page.

**Key takeaway:** Microsoft's documentation for MCP App widgets doesn't mention accessibility, WCAG, or ARIA **anywhere**—the most complete absence of any surface covered in this repo. Widgets are single self-contained HTML files with no build step and no accessibility tooling of any kind. You own 100% of the accessibility outcome, with even less framework scaffolding than Code Apps.

## What MCP App widgets are

- Generated via the `/generate-mcp-app-ui` skill (installed as a plugin for Claude Code or GitHub Copilot CLI), which turns a description plus a sample of your MCP tool's real JSON output into a rendered widget.
- Communicate with their host through the `App` class from the `@modelcontextprotocol/ext-apps` package (`ontoolresult`, `onhostcontextchanged` for theme changes, `callServerTool` for interactive refresh, etc.).
- Load all dependencies from a CDN at runtime (`@modelcontextprotocol/ext-apps`, `@fluentui/tokens`, `@fluentui/web-components`)—there's no build step and no local installation.
- MCP Apps support in Microsoft 365 Copilot Chat is generally available as of March 2026; Power Apps support for MCP apps in declarative agents is in public preview.

- Source: [Generate MCP App widgets with AI code generation tools](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generate-mcp-app-widgets)

## No accessibility guidance exists

Scanning Microsoft's entire documentation set for this feature turns up no mention of accessibility, WCAG, ARIA, screen readers, or keyboard navigation—not once. Unlike [Code Apps](../code-apps/index.md) or [Generative pages](../generative-pages/index.md), there isn't even a general disclaimer like "the agent makes a best-effort attempt at accessibility." This is a brand-new (2026), preview-stage feature, and accessibility simply hasn't been documented for it yet.

## What you get for free—and what you don't

- **Fluent UI Web Components** (`@fluentui/web-components`, e.g. `<fluent-card>`, `<fluent-button>`, `<fluent-text-input>`, `<fluent-spinner>`) are available and used by the generated widgets.

  > **Important:** This is a **different package** from **Fluent UI React** (`@fluentui/react-components`), which is what [Accessibility in Fluent UI React (v9)](../fluent-ui-react/index.md) documents. Nothing in Microsoft's MCP App widgets documentation states that Fluent UI Web Components underwent the same `axe-core` testing regimen described for Fluent UI React. **Don't assume the same accessibility guarantees transfer between the two packages.**
- **Theme tokens are required, not optional**—widgets must use CSS custom properties (e.g. `var(--colorNeutralForeground1)`) rather than hardcoded colors, and Microsoft's own best practices explicitly say to *"test with both themes... to verify contrast and readability."* That's a real, if narrow, accessibility-adjacent instruction already baked into the guidance—just not framed as one.
- **Loading-state guidance** recommends a contextual message (e.g. *"Finding attractions…"*) rather than a generic "Loading…"—good practice for screen reader users too, though Microsoft's docs don't frame it that way.
- Beyond that: no linting, no automated accessibility testing, no checker of any kind. The entire "best practices" section in Microsoft's docs is about visual/data-shape fit (matching chart type to data), not ARIA, keyboard interaction, or screen readers.

## What standard to apply instead

Since there's no Power Platform-specific accessibility conformance statement for this surface, apply the same standards any custom-built web component must meet:

- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/)**, Level AA at minimum.
- **[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)**—this is raw HTML rendered inside a third-party chat surface, so standard web accessibility patterns apply directly and fully.
- Remember the widget's HTML is self-sufficient inside someone else's chat UI (Microsoft 365 Copilot, Claude, VS Code)—you don't control the surrounding host chrome, so your widget's own markup must carry its full accessibility burden.

## Quick tips / suggested review checklist

- [ ] Treat this as building a small, self-contained accessible web component from scratch—no Power Platform accessibility tooling applies here at all.
- [ ] Prefer the provided Fluent UI Web Components over raw `<div>`-based custom controls where one fits your data.
- [ ] Don't assume Fluent UI Web Components (`@fluentui/web-components`) carry the same documented accessibility guarantees as Fluent UI React (`@fluentui/react-components`)—verify independently; they're different packages.
- [ ] Add explicit alt text or ARIA labels to any chart, map, or icon-only interactive element (e.g. a refresh button)—none of this is generated automatically.
- [ ] Test keyboard navigation and screen reader behavior for any interactive widget (one using `callServerTool`, like a refresh button); read-only widgets have less surface area but should still be checked.
- [ ] Test in both light and dark themes for contrast, per Microsoft's own best-practice guidance—but verify against WCAG 2.2 AA's actual contrast ratios, since Microsoft's instruction doesn't cite a numeric threshold.
- [ ] Don't state or imply WCAG, Section 508, or EN 301 549 conformance for an MCP App widget—no Microsoft guidance or platform tooling supports that claim.
- [ ] Remember this is a preview feature—expect the underlying APIs and this guidance to change.

## Related links

- [Generate MCP App widgets with AI code generation tools](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/generate-mcp-app-widgets)
- [Work with Power Apps MCP server](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/power-apps-mcp-server)—the separate, adjacent feature for agent-tool invocation, not the same as MCP App widgets
- [MCP Apps now available in Copilot Chat](https://devblogs.microsoft.com/microsoft365dev/mcp-apps-now-available-in-copilot-chat/)
- [Model Context Protocol specification](https://modelcontextprotocol.io/)
- [Fluent UI Web Components](https://fluent2.microsoft.design/)
- [Accessibility in Fluent UI React (v9)](../fluent-ui-react/index.md)—covers a related but distinct Fluent package
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Comparison across Power Platform surfaces](../index.md)
