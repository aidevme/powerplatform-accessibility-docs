---
title: Accessibility in Power Apps Component Framework (PCF) controls
description: What PCF provides automatically vs. what component authors must implement for accessible custom controls.
source: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices
last_verified: 2026-07-15
---

# Accessibility in Power Apps Component Framework (PCF) controls

The Power Apps Component Framework (PCF) lets you build custom code components that render inside model-driven apps, canvas apps, and Power Pages. Unlike canvas apps' Studio-native controls, a PCF component is raw HTML/CSS/JS (or React) that you own end-to-end—there's no Accessibility Checker for custom components, and Microsoft doesn't publish a dedicated PCF accessibility article.

**Key takeaway:** A standard PCF control gives you almost nothing for accessibility automatically—no accessibility-focused API on the `Context` object, no automatic ARIA injection, and no reduced-motion signal. Building a **React control with the Fluent platform library** (see below) is the one documented exception, since it inherits the host app's theme—including high-contrast—automatically. Either way, **you're responsible for keyboard navigation, ARIA roles and labels, and screen-reader testing for every component you ship.**

> **For Solution Architects:** There's no platform conformance statement for PCF at all (see [comparison across surfaces](../index.md))—every control is a bespoke accessibility deliverable. If you can choose, scope custom controls as **React controls using the Fluent platform library** rather than standard controls: you inherit Fluent's accessible-by-default components and automatic host theming, which meaningfully lowers effort from High to Medium. A standard control gets none of that for free.

**In this article:**
[What Microsoft documents](#what-microsoft-documents) ·
[React and Fluent UI](#building-with-react-and-fluent-ui) ·
[Framework vs. author responsibility](#what-the-framework-provides-vs-what-you-must-implement) ·
[Undocumented APIs](#a-note-on-undocumented-apis) ·
[Checklist](#quick-tips--suggested-review-checklist)

## What Microsoft documents

The only official PCF accessibility guidance is a short "Check accessibility" section inside the code components best-practices article. It states that component authors should:

- Provide keyboard-based alternatives to mouse/touch interactions (for example, tab to focus a dropdown, use arrow keys to navigate its options).
- Set `alt` text and ARIA attributes so screen readers announce an accurate representation of the component's interface.
- Use browser developer tools to inspect the rendered component for accessibility issues.

Microsoft specifically recommends building on **Fluent UI React** components where possible, since they're largely accessible and screen-reader-compatible out of the box—reducing how much of this you have to implement from scratch.

- Source: [Best practices for developing code components: Check accessibility](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices)

## Building with React and Fluent UI

PCF officially supports a React-based control type, distinct from the default "standard" control:

- Scaffold one with `pac pcf init --framework react` (or `-fw react`). This sets `control-type="virtual"` in `ControlManifest.Input.xml` instead of `standard`, and `ReactControl.updateView` returns a `ReactElement` rather than rendering directly into a `div`.
- The manifest declares **platform libraries** it needs, for example:

  ```xml
  <platform-library name="React" version="16.14.0" />
  <platform-library name="Fluent" version="9.46.2" />
  ```

  Both **Fluent 8** (`@fluentui/react`) and **Fluent 9** (`@fluentui/react-components`) are supported as platform libraries—but not both in the same manifest.
- Because these libraries are the platform's own shared instance (not a copy your component bundles), your control's bundle size shrinks, and—significantly for accessibility—its **theming stays aligned with the host app's Fluent design system automatically**, rather than needing to be re-implemented per component.
- **Limitation:** React controls & platform libraries are supported for canvas apps and model-driven apps, but **not for Power Pages**. A PCF control embedded in Power Pages must still be a standard (non-virtual) control.

Fluent UI itself has a detailed accessibility architecture worth knowing before you build on it—component labelling anti-patterns, focus-indicator APIs, live-region/notification best practices, and truncation guidance. See [Accessibility in Fluent UI React (v9)](../fluent-ui-react/index.md) for the full breakdown.

- Source: [React controls & platform libraries](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/react-controls-platform-libraries)

## What the framework provides vs. what you must implement

| Framework provides | Component author must implement |
| --- | --- |
| A container DOM element scoped to your component | All ARIA roles, states, and labels |
| Lifecycle hooks (`init`, `updateView`, `destroy`) | Keyboard navigation and focus management |
| `context.mode` (visible/disabled state flags) | Reflecting disabled/visible state through ARIA (e.g. `aria-disabled`) |
| `context.userSettings.isRTL` (bidirectional layout flag) | Reduced-motion handling—no platform signal exists for it |
| Automatic host theme (including high-contrast) consistency, but *only* if you use the React framework's Fluent **platform library**, not a bundled copy | Screen-reader testing and verifying announcements |

> **Important:** No `context.accessibility` property exists. The documented `Context` object exposes `client`, `copilot`, `device`, `events`, `factory`, `formatting`, `mode`, `navigation`, `parameters`, `resources`, `updatedProperties`, `userSettings`, `utils`, and `webAPI`—none of which are accessibility-specific.

- More information: [Context object reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/context), [context.mode reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/mode), [context.userSettings reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/usersettings)

## A note on undocumented APIs

An unofficial `context.fluentDesignLanguage` property is referenced in community blog posts (not on Microsoft Learn) as a way to read theme tokens when a model-driven app's modern Fluent v9 theming is enabled. It isn't part of the documented `Context` reference. **Don't rely on it, or represent it, as an official accessibility or theming API.**

The officially documented equivalent is the **Fluent platform library** described above: declare `<platform-library name="Fluent" version="..." />` in your React control's manifest, build your UI from `@fluentui/react` (v8) or `@fluentui/react-components` (v9) components, and the host app's theme—including high-contrast mode—carries through automatically because you're using the same shared library instance as the host, not a bundled copy. A standard (non-React) control, or a React control that bundles its own copy of Fluent instead of declaring it as a platform library, gets none of this for free—build and test its high-contrast/theme handling explicitly instead.

## Quick tips / suggested review checklist

- [ ] Use Fluent UI React controls where possible, per Microsoft's own recommendation.
- [ ] Every custom-rendered interactive element has an explicit ARIA role, state, and label—the framework injects none of this automatically.
- [ ] Full keyboard navigation and visible focus management are implemented and manually tested.
- [ ] The component has been inspected with a browser's built-in accessibility dev tools.
- [ ] If building a React control, Fluent is declared as a **platform library** in the manifest (not bundled) so host theming—including high-contrast—carries through automatically; if building a standard control, high-contrast and reduced-motion behavior have been tested directly instead.
- [ ] If the control targets Power Pages, it's built as a standard control—React controls & platform libraries aren't supported there.
- [ ] The component has been tested inside every host it targets (model-driven app, canvas app, Power Pages), since none of them run an automatic accessibility check on custom components.
- [ ] No accessibility or theming claim depends on an undocumented API such as `context.fluentDesignLanguage`.

## Related links

- [Best practices for developing code components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices)
- [React controls & platform libraries](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/react-controls-platform-libraries)
- [ReactControl API reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/react-control)
- [Component framework overview](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [Context object reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/context)
- [context.mode reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/mode)
- [context.userSettings reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/usersettings)
- [Create accessible canvas apps](../canvas-apps/index.md)—cross-referenced by Microsoft's own PCF docs as further reading
- [Accessibility in Fluent UI React (v9)](../fluent-ui-react/index.md)—component labelling, focus indicators, live regions, and truncation guidance for the library PCF recommends
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
