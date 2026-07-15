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

## What standard to apply instead

Since there's no Power Platform–specific conformance statement to point to for code apps, apply the same standards any custom-built web application must meet:

- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/)**, Level AA at minimum.
- **[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)** for any custom interactive components you build.
- If your organization has a **Section 508** or **EN 301 549** obligation, a code app must meet it the same way any custom-built web application would — there's no Power Platform-provided conformance report to rely on for this surface.

## Quick tips / suggested review checklist

- [ ] Treat this like a custom web app project, not a low-code Power Platform surface — there's no Accessibility Checker and no built-in accessible controls to lean on.
- [ ] Use an accessible component library (e.g. Fluent UI React) rather than building interactive controls from scratch.
- [ ] Run automated tooling (such as axe or Accessibility Insights) plus manual keyboard and screen-reader testing — the same rigor you'd apply to any React/web app.
- [ ] Don't state or imply WCAG, Section 508, or EN 301 549 conformance for a code app without independently verifying it — none of it is inherited from the platform.

## Related links

- [Power Apps code apps overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Best practices for developing code components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices) — closest Microsoft precedent for developer-owned accessibility
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Microsoft Accessibility](https://www.microsoft.com/en-us/accessibility)
- [Accessibility in Power Pages](../powerpages/index.md) — a comparable custom-code surface that does have Microsoft accessibility guidance
