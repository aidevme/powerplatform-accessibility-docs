---
title: Accessibility in Power Apps Model-Driven Apps
description: The detailed keyboard and screen-reader navigation patterns built into model-driven apps, and what becomes your responsibility once you add custom web resources.
source: https://learn.microsoft.com/en-us/power-apps/user/screen-reader
last_verified: 2026-07-16
---

# Accessibility in Power Apps Model-Driven Apps

**Model-driven apps** are the Dataverse-schema-driven Power Apps experience—forms, views, grids, dashboards, and business process flows generated from your data model, rather than pixel-perfect canvas design. This page covers the base model-driven app experience itself. Custom code components inside a model-driven app are covered separately in [PCF](../powerapps-component-framework/index.md), AI-generated pages in [Generative pages](../generative-pages/index.md), and the mobile client in [Mobile apps](../mobile-apps/index.md).

**Key takeaway:** Model-driven apps ship with the most detailed built-in keyboard and screen-reader navigation documentation of any surface in this repo—specific Narrator navigation modes for forms, grids, dashboards, and business process flows. But that documentation is **desktop and keyboard only**. The moment you add a custom web resource, you take on full semantic-HTML/ARIA responsibility yourself, the same as any custom web code.

## Built-in screen reader and keyboard navigation

Microsoft documents specific, detailed navigation patterns for Narrator (with JAWS and NVDA also supported generally):

- **Scan mode** (`Caps Lock+Spacebar`)—navigate by heading, link, landmark, or table using arrow keys.
- **Grids**—row/column headers, position, and sort state are announced; `Tab`/`Shift+Tab` moves between header cells, arrow keys move between data cells.
- **Forms**—multiple navigation modes (landmarks, headings, form columns), cycled with `Caps Lock+Up arrow` and traversed with `Caps Lock+Left/Right arrow`. Narrator announces the control type, value, state, and any special instructions per field.
- **Dashboards and charts**—`Tab` for interactive elements, `Caps Lock`+arrow keys for headings/landmarks/non-interactive items. Charts require a current Windows 10 update for full accessibility support.
- **Business process flows**—`Tab`/`Shift+Tab` moves between stages; Narrator announces the stage, status, title, and position (e.g., "element 2 of 5").
- **Dialog boxes**—the title is announced on open; focus defaults to **Close** for informational dialogs or the primary action button (e.g., **Delete**, **OK**) for action-required dialogs; `Esc` closes.

> **Note:** This entire reference is written for **desktop, keyboard-driven** use. It doesn't address touch or mobile screen-reader navigation at all—see [Accessibility in the Power Apps Mobile App](../mobile-apps/index.md) for that gap.

- Source: [Use a screen reader in model-driven apps](https://learn.microsoft.com/en-us/power-apps/user/screen-reader)

## Accessible web resources are your responsibility

Once you add a custom web resource (custom HTML/JS embedded in a form or elsewhere), you own its accessibility the same way you would for any hand-built web page:

- Use correct, semantic HTML elements for the interactions you need—a `div` with a click handler doesn't get exposed to assistive technology the way a real `button` element does.
- Layer [ARIA](https://learn.microsoft.com/en-us/microsoft-edge/accessibility) over semantic HTML for custom, dynamically updating controls that semantic HTML alone can't describe.
- Also account for text resizing, color-independence, and full keyboard operability—not just screen-reader support.

Microsoft's own guidance points to legacy Windows/Visual Studio tools for testing (Visual Studio Accessibility Checker, UI Accessibility Checker/AccChecker, Inspect, Accessible Event Watcher)—these are Windows-desktop developer tools, not something you'd run against a modern web-based workflow. Consider a current tool like [Accessibility Insights](https://accessibilityinsights.io/) or browser DevTools instead.

- Source: [Create accessible web resources (model-driven apps)](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/create-accessible-web-resources)

## Legacy note: the classic app/site map designer

Microsoft separately documented keyboard shortcuts and a screen-reader-per-browser support table (JAWS, Narrator, VoiceOver) for makers with disabilities using the **classic** app designer and site map designer. That classic designer was deprecated in October 2023 in favor of the modern designer, and switching back to classic is no longer available by default. **This repo found no equivalent, current accessibility article for the modern designer**—if you rely on assistive technology to build model-driven apps yourself, verify current support directly rather than assuming the classic designer's documented behavior still applies.

- Source: [Understand accessibility with app designer and site map designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/accessibility-app-designer-site-map-designer-my-apps-page)

## Quick tips / suggested review checklist

- [ ] Test your app's forms, grids, dashboards, and business process flows with Narrator (or JAWS/NVDA) using the navigation modes above—don't assume default behavior is sufficient without a pass.
- [ ] Any custom web resource uses semantic HTML first, with ARIA layered on only where semantic HTML can't describe the interaction.
- [ ] Custom web resources have been tested with a current accessibility scanner (e.g. Accessibility Insights), not just the legacy Windows tools Microsoft's web-resources article points to.
- [ ] Verify keyboard-only operability end to end—every action available by mouse/touch has a keyboard path.
- [ ] Don't assume mobile touch screen-reader behavior matches this page's desktop guidance—see [Mobile apps](../mobile-apps/index.md).
- [ ] If you or a teammate rely on assistive technology to build the app itself (not just to use it), verify current support in the modern designer directly—don't rely on the classic designer's now-outdated documentation.

## Related links

- [Use a screen reader in model-driven apps](https://learn.microsoft.com/en-us/power-apps/user/screen-reader)
- [Create accessible web resources (model-driven apps)](https://learn.microsoft.com/en-us/power-apps/developer/model-driven-apps/create-accessible-web-resources)
- [Understand accessibility with app designer and site map designer](https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/accessibility-app-designer-site-map-designer-my-apps-page)
- [Accessibility in Power Apps Component Framework (PCF) controls](../powerapps-component-framework/index.md)
- [Accessibility in Power Apps Generative Pages](../generative-pages/index.md)
- [Accessibility in the Power Apps Mobile App](../mobile-apps/index.md)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Comparison across Power Platform surfaces](../index.md)
