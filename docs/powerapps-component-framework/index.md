---
title: Accessibility in Power Apps Component Framework (PCF) controls
description: What PCF provides automatically vs. what component authors must implement for accessible custom controls.
source: https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices
last_verified: 2026-07-15
---

# Accessibility in Power Apps Component Framework (PCF) controls

The Power Apps Component Framework (PCF) lets you build custom code components that render inside model-driven apps, canvas apps, and Power Pages. Unlike canvas apps' Studio-native controls, a PCF component is raw HTML/CSS/JS (or React) that you own end-to-end — there's no Accessibility Checker for custom components, and Microsoft doesn't publish a dedicated PCF accessibility article.

**Key takeaway:** PCF gives you almost nothing for accessibility automatically. There's no accessibility-focused API on the `Context` object, no automatic ARIA injection, and no documented high-contrast or reduced-motion signal. **You're responsible for keyboard navigation, ARIA roles and labels, and screen-reader testing for every component you ship.**

## What Microsoft documents

The only official PCF accessibility guidance is a short "Check accessibility" section inside the code components best-practices article. It states that component authors should:

- Provide keyboard-based alternatives to mouse/touch interactions (for example, tab to focus a dropdown, use arrow keys to navigate its options).
- Set `alt` text and ARIA attributes so screen readers announce an accurate representation of the component's interface.
- Use browser developer tools to inspect the rendered component for accessibility issues.

Microsoft specifically recommends building on **Fluent UI React** components where possible, since they're largely accessible and screen-reader-compatible out of the box — reducing how much of this you have to implement from scratch.

- Source: [Best practices for developing code components: Check accessibility](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices)

## What the framework provides vs. what you must implement

| Framework provides | Component author must implement |
| --- | --- |
| A container DOM element scoped to your component | All ARIA roles, states, and labels |
| Lifecycle hooks (`init`, `updateView`, `destroy`) | Keyboard navigation and focus management |
| `context.mode` (visible/disabled state flags) | Reflecting disabled/visible state through ARIA (e.g. `aria-disabled`) |
| `context.userSettings.isRTL` (bidirectional layout flag) | High-contrast and reduced-motion handling — no platform signal exists for either |
| Host app theme consistency, if you opt into Fluent UI | Screen-reader testing and verifying announcements |

> **Important:** There is no `context.accessibility` property. The documented `Context` object exposes `client`, `copilot`, `device`, `events`, `factory`, `formatting`, `mode`, `navigation`, `parameters`, `resources`, `updatedProperties`, `userSettings`, `utils`, and `webAPI` — none of which are accessibility-specific.

- More information: [Context object reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/context), [context.mode reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/mode), [context.userSettings reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/usersettings)

## A note on undocumented APIs

An unofficial `context.fluentDesignLanguage` property is referenced in community blog posts (not on Microsoft Learn) as a way to read theme tokens when a model-driven app's modern Fluent v9 theming is enabled. It isn't part of the documented `Context` reference. **Don't rely on it, or represent it, as an official accessibility or theming API** — build and test your high-contrast/theme handling explicitly instead.

## Quick tips / suggested review checklist

- [ ] Use Fluent UI React controls where possible, per Microsoft's own recommendation.
- [ ] Every custom-rendered interactive element has an explicit ARIA role, state, and label — the framework injects none of this automatically.
- [ ] Full keyboard navigation and visible focus management are implemented and manually tested.
- [ ] The component has been inspected with a browser's built-in accessibility dev tools.
- [ ] High-contrast and reduced-motion behavior have been tested directly — don't assume the platform signals either.
- [ ] The component has been tested inside every host it targets (model-driven app, canvas app, Power Pages), since none of them run an automatic accessibility check on custom components.
- [ ] No accessibility or theming claim depends on an undocumented API such as `context.fluentDesignLanguage`.

## Related links

- [Best practices for developing code components](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/code-components-best-practices)
- [Component framework overview](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/overview)
- [Context object reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/context)
- [context.mode reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/mode)
- [context.userSettings reference](https://learn.microsoft.com/en-us/power-apps/developer/component-framework/reference/usersettings)
- [Create accessible canvas apps](../powerapps-canvas/index.md) — cross-referenced by Microsoft's own PCF docs as further reading
- [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
