---
title: Accessibility in Power Apps Code Apps
description: Why no Microsoft accessibility guidance exists yet for Code Apps, and what standards to apply in the meantime.
source: https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview
last_verified: 2026-07-15
---

# Accessibility in Power Apps Code Apps

Power Apps Code Apps let developers build apps with standard code (React, TypeScript, and similar) using the Power Platform CLI, connect them to Dataverse and other connectors, and publish them through Power Apps. As of this writing, Microsoft hasn't published dedicated accessibility guidance for code apps—walking the entire code-apps documentation set turns up no WCAG, ARIA, or accessibility page.

**Key takeaway:** There's no Microsoft-documented accessibility standard, checklist, or tooling specific to code apps today. Because code apps ship as raw React/HTML/CSS/JS that you fully control—with no Studio-based Accessibility Checker and no managed rendering layer—**responsibility for WCAG/ARIA compliance sits entirely with you, the developer, from the first line of code.**

> **For Solution Architects:** Treat this surface as a custom web app for compliance-planning purposes, not a Power Platform low-code surface (see [comparison across surfaces](../index.md))—there's no Microsoft conformance statement, no built-in checker, and neither official template includes an accessible component library by default. Budget for an accessible component library and testing tooling from day one. Effort to reach compliance: **High**.

**In this article:**
[Why no platform guidance](#why-theres-no-platform-specific-guidance) ·
[Closest precedent](#closest-microsoft-precedent) ·
[What the templates ship with](#what-the-official-templates-actually-ship-with) ·
[Vite tooling](#accessibility-tooling-for-the-vite-based-templates) ·
[Standard to apply](#what-standard-to-apply-instead) ·
[Checklist](#quick-tips--suggested-review-checklist)

## Why there's no platform-specific guidance

Code apps are the newest Power Apps surface, built around developer-owned code rather than a managed designer. In that sense they're closer in spirit to Power Pages' custom Liquid/HTML than to canvas apps' Studio-managed controls—except that, unlike Power Pages, there's no top-level [accessibility conformance page](../powerpages/index.md) covering this surface yet.

## Closest Microsoft precedent

The nearest thing Microsoft has published to a statement of developer-owned accessibility responsibility for custom Power Platform code is the "Check accessibility" section of the [PCF code components best-practices article](../powerapps-component-framework/index.md#what-microsoft-documents): provide keyboard alternatives to mouse/touch interaction, set `alt` text and ARIA attributes, inspect with browser dev tools, and prefer accessible component libraries such as Fluent UI React. Treat this as the applicable model for code apps too, even though it's written for PCF.

## What the official templates actually ship with

The [code apps architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture) doc only requires "an HTML or TypeScript/JavaScript app"—the platform itself is framework-agnostic. In practice, though, Microsoft's own [quickstart](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch) scaffolds from a template in the [`microsoft/PowerAppsCodeApps`](https://github.com/microsoft/PowerAppsCodeApps) GitHub repo, and both official templates are React-based:

| Template | Stack | Accessible component library included? |
| --- | --- | --- |
| `vite` (used in the quickstart) | React 19 + TypeScript + Vite | None—a bare React app, no UI component library |
| `starter` | React 19 + TypeScript + Vite + Tailwind, scaffolded via [shadcn/ui](https://ui.shadcn.com/) | **Radix UI primitives** (`@radix-ui/react-*`)—not Fluent UI |

Radix UI Primitives explicitly document [WAI-ARIA authoring-practices compliance](https://www.radix-ui.com/primitives/docs/overview/accessibility), built-in keyboard navigation, and automatic focus management—so a code app built on the `starter` template already has a meaningfully more accessible baseline than one built from scratch on `vite` or with hand-written HTML.

> **Note:** Fluent UI React remains a valid choice for a code app—it's just an npm dependency like any other React project could add—and using it would match Microsoft's own PCF recommendation and give visual consistency with the rest of Power Apps. But **it isn't what either official code-apps template ships with by default**; don't assume a code app uses Fluent UI unless you added it yourself. If you do add it, see [Accessibility in Fluent UI React (v9)](../fluent-ui-react/index.md) for its labelling, focus-indicator, and live-region conventions.

## Accessibility tooling for the Vite-based templates

Both official templates build with [Vite](https://vite.dev/), so Vite's plugin ecosystem is where to add automated accessibility checks—none of this is wired up for you by either template.

| Tool | What it catches | When it runs |
| --- | --- | --- |
| [`eslint-plugin-jsx-a11y`](https://www.npmjs.com/package/eslint-plugin-jsx-a11y) | Static AST rules on JSX (missing `alt`, invalid ARIA attributes/roles, non-interactive elements with click handlers, and similar) | Whenever ESLint runs—editor, CI, or dev server |
| [`vite-plugin-checker`](https://www.npmjs.com/package/vite-plugin-checker) | Surfaces ESLint (including `jsx-a11y` rules) errors live in the terminal and browser overlay during `vite dev`, not just at build/CI time | Dev server, on file save |
| [`@axe-core/react`](https://www.npmjs.com/package/@axe-core/react) | Dynamic, rendered-DOM accessibility audit (contrast, ARIA state mismatches, etc.) reported to the browser DevTools console | Runtime, in the browser, dev builds only |

**1. Add `jsx-a11y` to your flat ESLint config**—both templates already ship ESLint 9 flat config (`eslint.config.js`), so add the plugin's preset alongside it:

```js
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // ...your existing config (js, react-hooks, react-refresh, typescript-eslint)
  jsxA11y.flatConfigs.recommended, // or .strict for a stricter rule set
];
```

**2. Surface those rules live during `vite dev`** with `vite-plugin-checker`, so accessibility issues show up in the terminal and a browser overlay while you're still writing the component, not just when CI runs later:

```ts
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{ts,tsx}"',
      },
    }),
  ],
});
```

**3. Add a runtime, rendered-DOM check** with `@axe-core/react`, which catches issues static analysis can't (actual contrast values, ARIA state that only exists after render). Its own docs show a CommonJS/`process.env` example—adapt it to Vite's ESM + `import.meta.env` convention:

```ts
if (import.meta.env.DEV) {
  import('@axe-core/react').then(({ default: axe }) => {
    axe(React, ReactDOM, 1000);
  });
}
```

> **Note:** `vite-plugin-eslint` is a different, older package that also integrates ESLint with Vite—but it hasn't been published since 2022 and predates ESLint 9's flat config. Use `vite-plugin-checker`'s built-in ESLint support instead.

## What standard to apply instead

Since there's no Power Platform–specific conformance statement to point to for code apps, apply the same standards any custom-built web application must meet:

- **[WCAG 2.2](https://www.w3.org/TR/WCAG22/)**, Level AA at minimum.
- **[WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)** for any custom interactive components you build.
- If your organization has a **Section 508** or **EN 301 549** obligation, a code app must meet it the same way any custom-built web application would—there's no Power Platform-provided conformance report to rely on for this surface.

## Quick tips / suggested review checklist

- [ ] Treat this like a custom web app project, not a low-code Power Platform surface—there's no Accessibility Checker and no built-in accessible controls to lean on.
- [ ] Know which template you started from: the `vite` template gives you no component library at all; the `starter` template gives you Radix UI primitives, not Fluent UI.
- [ ] Use an accessible component library (Radix UI/shadcn as shipped in `starter`, Fluent UI React, or similar) rather than building interactive controls from scratch.
- [ ] If you added Fluent UI yourself, don't assume it came with the template—verify it's actually installed and used consistently, since neither official template includes it by default.
- [ ] `eslint-plugin-jsx-a11y` is added to `eslint.config.js`, and `vite-plugin-checker` surfaces it live during `vite dev`—neither ships by default in either template.
- [ ] `@axe-core/react` (or a similar runtime checker) is wired up for dev builds to catch rendered-DOM issues static linting can't.
- [ ] Manual keyboard and screen-reader testing has also been done—automated tooling catches a minority of real accessibility issues, not all of them.
- [ ] Don't state or imply WCAG, Section 508, or EN 301 549 conformance for a code app without independently verifying it—none of it is inherited from the platform.

## Related links

- [Power Apps code apps overview](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/overview)
- [Power Apps code apps architecture](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/architecture)
- [Quickstart: Create a code app from scratch](https://learn.microsoft.com/en-us/power-apps/developer/code-apps/how-to/create-an-app-from-scratch)
- [microsoft/PowerAppsCodeApps templates](https://github.com/microsoft/PowerAppsCodeApps)—source of the `vite` and `starter` templates
- [Radix UI Primitives accessibility](https://www.radix-ui.com/primitives/docs/overview/accessibility)
- [eslint-plugin-jsx-a11y](https://www.npmjs.com/package/eslint-plugin-jsx-a11y)
- [vite-plugin-checker](https://www.npmjs.com/package/vite-plugin-checker)
- [@axe-core/react](https://www.npmjs.com/package/@axe-core/react)
- [Accessibility in Fluent UI React (v9)](../fluent-ui-react/index.md)—if you add Fluent UI to a code app instead of the default template's Radix UI
- [Best practices for developing code components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices)—closest Microsoft precedent for developer-owned accessibility
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- [Microsoft Accessibility](https://www.microsoft.com/en-us/accessibility)
- [Accessibility in Power Pages](../powerpages/index.md)—a comparable custom-code surface that does have Microsoft accessibility guidance
