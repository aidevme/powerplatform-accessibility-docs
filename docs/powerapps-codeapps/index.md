---
title: Accessibility in Power Apps Code Apps
description: Why no Microsoft accessibility guidance exists yet for Code Apps, and what standards to apply in the meantime.
source: https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview
last_verified: 2026-07-15
---

# Accessibility in Power Apps Code Apps

Power Apps Code Apps let developers build apps with standard code (React, TypeScript, and similar) using the Power Platform CLI, connect them to Dataverse and other connectors, and publish them through Power Apps. As of this writing, Microsoft hasn't published dedicated accessibility guidance for code apps — walking the entire code-apps documentation set turns up no WCAG, ARIA, or accessibility page.

**Key takeaway:** There's no Microsoft-documented accessibility standard, checklist, or tooling specific to code apps today. Because code apps ship as raw React/HTML/CSS/JS that you fully control — with no Studio-based Accessibility Checker and no managed rendering layer — **responsibility for WCAG/ARIA compliance sits entirely with you, the developer, from the first line of code.**

## Why there's no platform-specific guidance

Code apps are the newest Power Apps surface, built around developer-owned code rather than a managed designer. In that sense they're closer in spirit to Power Pages' custom Liquid/HTML than to canvas apps' Studio-managed controls — except that, unlike Power Pages, there's no top-level [accessibility conformance page](../powerpages/index.md) covering this surface yet.

## Closest Microsoft precedent

The nearest thing Microsoft has published to a statement of developer-owned accessibility responsibility for custom Power Platform code is the "Check accessibility" section of the [PCF code components best-practices article](../powerapps-component-framework/index.md#what-microsoft-documents): provide keyboard alternatives to mouse/touch interaction, set `alt` text and ARIA attributes, inspect with browser dev tools, and prefer accessible component libraries such as Fluent UI React. Treat this as the applicable model for code apps too, even though it's written for PCF.

## What the official templates actually ship with

The [code apps architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture) doc only requires "an HTML or TypeScript/JavaScript app" — the platform itself is framework-agnostic. In practice, though, Microsoft's own [quickstart](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch) scaffolds from a template in the [`microsoft/PowerAppsCodeApps`](https://github.com/microsoft/PowerAppsCodeApps) GitHub repo, and both official templates are React-based:

| Template | Stack | Accessible component library included? |
| --- | --- | --- |
| `vite` (used in the quickstart) | React 19 + TypeScript + Vite | None — a bare React app, no UI component library |
| `starter` | React 19 + TypeScript + Vite + Tailwind, scaffolded via [shadcn/ui](https://ui.shadcn.com/) | **Radix UI primitives** (`@radix-ui/react-*`) — not Fluent UI |

Radix UI Primitives explicitly document [WAI-ARIA authoring-practices compliance](https://www.radix-ui.com/primitives/docs/overview/accessibility), built-in keyboard navigation, and automatic focus management — so a code app built on the `starter` template already has a meaningfully more accessible baseline than one built from scratch on `vite` or with hand-written HTML.

> **Note:** Fluent UI React remains a valid choice for a code app — it's just an npm dependency like any other React project could add — and using it would match Microsoft's own PCF recommendation and give visual consistency with the rest of Power Apps. But **it isn't what either official code-apps template ships with by default**; don't assume a code app uses Fluent UI unless you added it yourself. If you do add it, see [Accessibility in Fluent UI React (v9)](../generic/index.md) for its labelling, focus-indicator, and live-region conventions.

## What standard to apply instead

Since there's no Power Platform–specific conformance statement to point to for code apps, apply the same standards any custom-built web application must meet:

- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/)**, Level AA at minimum.
- **[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)** for any custom interactive components you build.
- If your organization has a **Section 508** or **EN 301 549** obligation, a code app must meet it the same way any custom-built web application would — there's no Power Platform-provided conformance report to rely on for this surface.

## Quick tips / suggested review checklist

- [ ] Treat this like a custom web app project, not a low-code Power Platform surface — there's no Accessibility Checker and no built-in accessible controls to lean on.
- [ ] Know which template you started from: the `vite` template gives you no component library at all; the `starter` template gives you Radix UI primitives, not Fluent UI.
- [ ] Use an accessible component library (Radix UI/shadcn as shipped in `starter`, Fluent UI React, or similar) rather than building interactive controls from scratch.
- [ ] If you added Fluent UI yourself, don't assume it came with the template — verify it's actually installed and used consistently, since neither official template includes it by default.
- [ ] Run automated tooling (such as axe or Accessibility Insights) plus manual keyboard and screen-reader testing — the same rigor you'd apply to any React/web app.
- [ ] Don't state or imply WCAG, Section 508, or EN 301 549 conformance for a code app without independently verifying it — none of it is inherited from the platform.

## Related links

- [Power Apps code apps overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Power Apps code apps architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture)
- [Quickstart: Create a code app from scratch](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)
- [microsoft/PowerAppsCodeApps templates](https://github.com/microsoft/PowerAppsCodeApps) — source of the `vite` and `starter` templates
- [Radix UI Primitives accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [Accessibility in Fluent UI React (v9)](../generic/index.md) — if you add Fluent UI to a code app instead of the default template's Radix UI
- [Best practices for developing code components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices) — closest Microsoft precedent for developer-owned accessibility
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Microsoft Accessibility](https://www.microsoft.com/en-us/accessibility)
- [Accessibility in Power Pages](../powerpages/index.md) — a comparable custom-code surface that does have Microsoft accessibility guidance
