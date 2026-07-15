---
title: Power Platform accessibility guidance — overview
description: A comparison of accessibility conformance and tooling across Power Platform surfaces, and where to start based on your role.
last_verified: 2026-07-15
---

# Power Platform accessibility guidance

This repo covers accessibility across five Power Platform surfaces, and the honest answer to "is this accessible?" is different for each one—some surfaces come with documented standards conformance and built-in tooling, others give you nothing and put full responsibility on the person writing the code. This page compares them side by side so you don't have to read all five pages to find that out.

**Key takeaway:** The same accessibility question doesn't have the same answer across surfaces. "Does the platform conform to WCAG?" is a documented yes for Power Pages, an implied-but-unstated yes for Canvas apps, and simply not addressed at all for PCF or Code Apps. Know which surface you're building on before you promise a compliance outcome to a stakeholder.

## Compare Power Platform surfaces

> The **Effort** column is this repo's own assessment based on the research in each page—not an official Microsoft rating—meant as a rough planning signal, not a guarantee.

| Surface | Platform conformance stated? | Built-in accessibility tooling | Who owns compliance | Effort to reach compliance |
| --- | --- | --- | --- | --- |
| [Power Pages](powerpages/index.md) | **Yes**—explicit WCAG 2.2, Section 508, EN 301 549 | None built-in; [Accessibility Insights](https://accessibilityinsights.io/) recommended | Platform conforms; you own anything you customize (Liquid, HTML, embeds) | Low–Medium |
| [Canvas apps](powerapps-canvas/index.md) | Implied only—contrast thresholds match WCAG 2.x AA, but no standard is named | **Yes**—Studio's built-in Accessibility Checker | Shared: platform provides accessible controls, you use the right properties | Low |
| [PCF (standard control)](powerapps-component-framework/index.md) | None | None—browser dev tools only | Entirely yours: ARIA, keyboard nav, focus, labelling | High |
| [PCF (React + Fluent platform library)](powerapps-component-framework/index.md#building-with-react-and-fluent-ui) | None from PCF itself; [Fluent UI's own components](fluent-ui-react/index.md) are built to meet WCAG/WAI-ARIA | None PCF-specific; inherits Fluent's `axe-core`-tested components | Shared: Fluent's components are accessible by default, you still own labelling/live regions/focus indicators | Medium |
| [Code Apps](powerapps-codeapps/index.md) | None—no Microsoft accessibility documentation exists for this surface | None by default; can add `eslint-plugin-jsx-a11y` + `vite-plugin-checker` + `@axe-core/react` | Entirely yours, from the first line of code | High |

[Fluent UI React (v9)](fluent-ui-react/index.md) isn't a Power Platform surface on its own—it's the shared component library behind the PCF and Code Apps rows above, so its accessibility architecture (labelling, focus indicators, live regions, truncation) is documented once and linked from both.

## Which surface should I choose?

A quick heuristic if you're scoping a new build and accessibility compliance is a hard requirement:

- **Extending a public-facing website?** Power Pages has the strongest documented conformance story—start there.
- **Building a low-code business app quickly, with a compliance deadline?** Canvas apps' built-in Accessibility Checker catches the most common issues before you ship, with the least manual effort.
- **Need a custom control inside Dataverse forms/views?** Build it as a **PCF React control with the Fluent platform library** rather than a standard control—you inherit Fluent's accessible-by-default components and automatic host theming instead of building everything from scratch.
- **Need a fully custom standalone app (SPA)?** Code Apps give you the most freedom and the least accessibility scaffolding—budget explicitly for an accessible component library (Fluent UI, or the `starter` template's Radix UI primitives) and the linting/runtime tooling from day one, not as an afterthought.

## Reading paths by role

**Solution Architects**, scoping or reviewing a build:

1. Start with the comparison table above to identify your surface's conformance status and effort level.
2. Read that surface's **Key takeaway** and standards/conformance section—enough to know what you can and can't promise a stakeholder.
3. Only read [Fluent UI React (v9)](fluent-ui-react/index.md) if you're evaluating a Fluent-based PCF or Code Apps build.

**Developers**, implementing a build:

1. Go straight to your surface's page and follow its **Quick tips / suggested review checklist** section.
2. If your surface uses Fluent UI (PCF or Code Apps), keep [Fluent UI React (v9)](fluent-ui-react/index.md) open alongside it—it covers labelling, focus indicators, live regions, and truncation in one place rather than repeating on every page.

## Product areas

- [Power Pages](powerpages/index.md)
- [Power Apps—Canvas apps](powerapps-canvas/index.md)
- [Power Apps—Code Apps](powerapps-codeapps/index.md)
- [Power Apps Component Framework (PCF)](powerapps-component-framework/index.md)
- [Power Apps—Generative/AI-generated pages](powerapps-generative-pages/index.md) *(placeholder—not yet written)*
- [Fluent UI React (v9)](fluent-ui-react/index.md)

See [CONTRIBUTING.md](../CONTRIBUTING.md) if you'd like to help fill in a placeholder page.
