---
title: Accessibility in Power Apps Canvas apps
description: Built-in accessibility tooling, key properties, and documented limitations for Power Apps Canvas apps.
source: https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps
last_verified: 2026-07-15
---

# Accessibility in Power Apps Canvas apps

Canvas apps are the drag-and-drop, formula-based Power Apps experience. Microsoft ships real accessibility tooling for this surface—a built-in Accessibility Checker, documented accessibility properties, and guidance on structure and navigation—but as the maker, you're still responsible for using them correctly.

**Key takeaway:** Unlike the Power Pages accessibility page, Microsoft's canvas app documentation doesn't cite a specific WCAG version by name. The Accessibility Checker's contrast thresholds match WCAG 2.x Level AA, so treat that as *implied* conformance from the tooling—not a documented certification—when you report compliance to stakeholders.

> **For Solution Architects:** No named standard is conformed to here, but the built-in Accessibility Checker and accessible-by-default controls make this the lowest-effort surface in this repo for reaching a good outcome (see [comparison across surfaces](../index.md)). Good for a low-code build under a compliance deadline—just don't claim WCAG conformance in writing, since Microsoft's own docs don't make that claim either. Effort to reach compliance: **Low**.

## Accessibility standards

Microsoft's canvas app accessibility docs don't state conformance to WCAG, Section 508, or EN 301 549 the way the [Power Pages accessibility page](../power-pages/index.md) does. The closest thing to a standard is numeric: the platform's contrast guidance requires **4.5:1 for normal text** and **3:1 for large text and non-text elements**, which matches [WCAG 1.4.3 (Contrast Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) at Level AA. Color contrast itself is **not** automatically checked by the Accessibility Checker—verifying it is a manual step.

## Built-in tooling: Accessibility Checker

Power Apps Studio includes an **Accessibility Checker** pane (App checker icon → **Accessibility**) that lists issues sorted by severity, then by screen. Selecting an issue jumps you to the relevant property; select **Re-check** after making fixes.

Issues are grouped into three severities:

| Severity | Meaning |
| --- | --- |
| **Error** | Blocks use of the app for people with disabilities. |
| **Warning** | Makes the app difficult to use for most people. |
| **Tip** | Would improve the experience, but isn't blocking. |

The checker's issue catalog includes: missing `AccessibleLabel`, `FocusedBorderThickness` set to `0` (focus not visible), missing closed captions, disabled helpful control settings, unsupported custom HTML, `Autostart=true` on audio/video, default (unnamed) screen names, missing state-indication text, `TabIndex > 0`, and pen-input controls with no alternate text-input method.

## Key accessibility properties

| Name | Description |
| --- | --- |
| **AccessibleLabel** | Screen reader label for inputs, `Image`, `Icon`, and `Shape` controls. Leave empty to hide a purely decorative image from screen readers. |
| **Live** (Label only) | `Off` / `Polite` / `Assertive`—drives live-region announcements (the same semantics as `aria-live`). Keep `Visible=true` at all times rather than toggling `Live`; clear and reset `Text` to re-announce an identical message. |
| **Role** (Label only) | `Heading1`–`Heading4` or `Default`. Use exactly one `Heading1` per screen. |
| **TabIndex** / **AcceptsFocus** | Controls keyboard focus order. Only `0` or negative values are supported—**`TabIndex > 0` is a deprecated, unsupported pattern** and is bad for accessibility, usability, and maintainability. |
| **FocusedBorderThickness** / **FocusedBorderColor** | Must be greater than `0` and contrast against the background so keyboard focus is visible. |

- More information: [Accessibility properties for canvas app controls](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-accessibility)

## Structure and navigation

Reading and tab order follow control position—top-to-bottom, then left-to-right (a "Z" pattern)—not the order controls were added. Use containers, form cards, and galleries to group related controls so screen readers and tab order treat them as a single unit.

> **Note:** A screen's name is announced first, as a hidden element, when it loads. Name screens meaningfully, and avoid calling `SetFocus` immediately on load—it overrides that announcement.

- More information: [Understand how to structure a canvas app for accessibility](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-structure)

## Known limitations

Microsoft's own documentation states that canvas apps **can't** natively support:

- Accessible custom dialogs or overlays.
- Custom tabbed interfaces—use the built-in **Tab list** control instead.
- Custom tables—use the **Data table** control, not a Gallery.
- Custom combo boxes—use the built-in **Combo box** or **Drop down** controls.
- Custom keyboard handling (intercepting arrow keys or <kbd>Escape</kbd>).
- Reliable focus-change detection.

For any of these, Microsoft recommends building a [PCF component](../powerapps-component-framework/index.md) instead.

- More information: [Accessibility limitations in canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-limitations)

## Quick tips / suggested review checklist

- [ ] Every interactive input and meaningful image/icon has an `AccessibleLabel` (empty for decorative images).
- [ ] Color contrast meets 4.5:1 for normal text and 3:1 for large text/non-text elements—verified manually, since the Accessibility Checker doesn't check this automatically.
- [ ] No control uses `TabIndex > 0`.
- [ ] Every control's `FocusedBorderThickness` is greater than `0` and visibly contrasts with its background.
- [ ] Controls are grouped in containers/form cards/galleries that match their logical reading order.
- [ ] Exactly one `Heading1`-role label exists per screen.
- [ ] Video/audio content has closed captions and doesn't autostart.
- [ ] The app has been tested with a keyboard only, and with a screen reader (Narrator, JAWS, or NVDA).
- [ ] Any pen-input or signature control has an alternate text-input method.

## Related links

- [Create accessible canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps)
- [Accessibility checker for canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessibility-checker)
- [Accessibility properties for canvas app controls](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/controls/properties-accessibility)
- [Design canvas apps for color blindness and contrast](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-color)
- [Understand how to structure a canvas app for accessibility](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-structure)
- [Accessibility limitations in canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-limitations)
- [Content visibility techniques for accessibility](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-content-visibility)
- [Live regions in canvas apps](https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/accessible-apps-live-regions)
