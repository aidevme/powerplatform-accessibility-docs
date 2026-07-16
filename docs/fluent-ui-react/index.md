---
title: Accessibility in Fluent UI React (v9)
description: How Fluent UI React v9's own accessibility architecture works—component scope, labelling, focus, live-region notifications, and truncation—for anyone building on it inside Power Platform.
source: https://github.com/microsoft/fluentui/tree/master/apps/public-docsite-v9/src/Concepts/Accessibility
last_verified: 2026-07-15
---

# Accessibility in Fluent UI React (v9)

Fluent UI React is the component library Microsoft recommends across Power Platform's custom-code surfaces: [PCF's own best practices](../powerapps-component-framework/index.md#what-microsoft-documents) call it out by name, and it's a reasonable choice for [Code Apps](../code-apps/index.md) too, even though neither official code-apps template ships it by default. This page covers Fluent UI v9's own accessibility architecture—what it does for you, and what you still have to get right—so it doesn't need repeating on every product-area page that touches it.

**Key takeaway:** Fluent UI v9 components are built to meet WCAG and WAI-ARIA out of the box (semantic DOM, ARIA state, keyboard/screen-reader navigation, focus handling, contrast, and Light/Dark/High-Contrast themes), and this is verified with `axe-core` in Fluent's own CI. But **using accessible components doesn't make your app accessible**—labelling, live-region announcements, focus-indicator styling, and truncation are all things you still have to get right yourself, and Fluent's own documentation is explicit that these are easy to get wrong.

> **For Solution Architects:** This isn't a Power Platform surface on its own—it's the shared library behind the PCF and Code Apps rows in the [surface comparison](../index.md). Its components are independently `axe-core`-tested against WCAG/WAI-ARIA, which is a genuine head start over building custom controls from scratch. But adopting Fluent UI doesn't transfer that conformance to your app automatically—labelling, live regions, and focus indicators are still your responsibility, covered below.

## What Fluent UI v9 components guarantee

Per Fluent's own scope statement, components fulfill:

- **Semantic DOM structure**—correct element types or ARIA roles.
- **Valid ARIA attributes**—correct state information for the component/role used.
- **Keyboard navigation**—tabbing, arrow keys, pagination/letter keys, activation (<kbd>Enter</kbd>/<kbd>Space</kbd>, <kbd>Shift</kbd>+<kbd>F10</kbd>), and dismissal (<kbd>Escape</kbd>).
- **Screen reader navigation** (virtual cursor/browse mode/scan mode/VoiceOver keys) and **touch interaction**.
- **Predictable focus handling**—autofocus on open, focus trapping for dialogs/popups, all built on [tabster](https://github.com/microsoft/tabster).
- **Sufficient color contrast**, plus Light, Dark, and **High Contrast** themes.
- A visible **[focus indicator](#focus-indicators)** when navigating by keyboard.
- Testing at up to **400% zoom**.

Explicitly **out of scope**: internationalization, globalization, keyboard shortcuts, and language detection—the hosting application owns those, same as any application-level focus handling beyond what's listed above.

> **Note:** Components are tested with `axe-core` during development/build, plus manual testing against small isolated accessibility-scenario pages (per component) by trusted accessibility testers.

- Source: [Components accessibility overview](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/AccessibleComponents.mdx)

## Designing an accessible experience around the components

Accessible components are necessary but not sufficient. Fluent's own guidance for the surrounding application/page design:

- Decompose the UI and identify which component, variant, and behavior to use for each part.
- Define heading and landmark structure.
- Verify color/contrast conveys information correctly.
- Keep tab order and arrow-key navigation consistent with DOM structure and ARIA roles.
- Label components that lack visible text (icon-only buttons) and containers (lists, toolbars).
- Write text for state-change announcements (errors, confirmations, dynamic UI changes).
- Identify content that appears on hover/focus and define its keyboard/screen-reader equivalent—screen readers and most touch devices don't support hover.
- List every case where focus must move programmatically, and every case where it must be trapped (dialogs, popups, hierarchical navigation).
- Cover **High Contrast** and **zoom/reflow** scenarios explicitly in your designs.

- Source: [Accessible experiences](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/AccessibleExperiences.mdx)

## Component labelling

A label should explain the component's purpose without restating its type, action, state, position, or repeating text the screen reader already announces. Fluent's documented anti-patterns:

| Avoid | Prefer | Why |
| --- | --- | --- |
| `aria-label="Click here to send message"` | `aria-label="Send message"` | The action ("click here to") is redundant—the screen reader already announces the component type. |
| `aria-label="Mute microphone button"` | `aria-label="Mute microphone"` | The component type ("button") is announced automatically from its role. |
| `aria-label="Files tab is active"` | No custom label; use `aria-selected` | State should come from the correct ARIA state attribute, not hard-coded text. |
| Hard-coded `"first item of four"` in each item's label | Correct ARIA roles (`menu`/`menuitem`, `radiogroup`, `listbox`, etc.) | The screen reader adds "X of Y" automatically when the roles are correct. |
| Repeating `aria-label="Meeting participant [name]"` on every list item | Label the container once (`aria-label="Meeting participants"` on the list) | Repeated text on every item prolongs narration for every single entry. |
| `tabindex="0"` on plain (non-interactive) text | Reference the text via `aria-describedby`, or wrap it with `role="group"` + `aria-label` | Non-actionable elements shouldn't add a tab stop. |

The general rule: **prefer reusing visible text for labels**—for example, an element can self-reference its own visible label via `aria-labelledby` rather than duplicating it in `aria-label`.

- Source: [Component labelling](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/ComponentLabelling.mdx)

## Focus indicators

Fluent's focus handling is built on [tabster](https://github.com/microsoft/tabster), exposed through the `@fluentui/react-tabster` package:

- **`useKeyboardNavAttribute`** adds a `data-keyboard-nav` attribute to an element only while the user is navigating by keyboard (backed by [keyborg](https://github.com/microsoft/keyborg)), so focus styling can be scoped to keyboard use without triggering a React re-render.
- **`createFocusOutlineStyle`**—the default outline-based focus indicator style (used by components like `AccordionHeader`).
- **`createCustomFocusIndicatorStyle`**—for a custom, non-outline focus indicator (used by `Link`, for example, to show a double-underline on focus).

> **Important:** Fluent's own docs warn: *"A bad focus indicator can have serious accessibility consequences and can render your experience unusable by certain users."* Get design/accessibility review before shipping a custom focus indicator style.

- Source: [Focus indicator](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/FocusIndicator.mdx)

## Live-region notifications (screen reader announcements)

Three ways exist to mark an element as a live region, each with different behavior:

| Approach | Behavior |
| --- | --- |
| `aria-live="assertive"` | For notifications more important than the user's current interaction. Interrupts the speech queue (behavior varies by screen reader/OS). |
| `aria-live="polite"` | For notifications less important than the user's current interaction. |
| `role="alert"` | Best for errors/high-importance toasts—the only live region reliably announced **on insertion**, not just on subsequent mutation. |
| `role="status"` | Roughly equivalent to `aria-live="polite"`. |

Live regions should be **short**, **stable** (mutate infrequently), and never fire at the same time as a focus change or user input—doing so conflicts with the screen reader's own announcement of that event.

**Prefer Fluent's own `useAnnounce` hook** (with an `AriaLiveAnnouncer` mounted near the app root) over hand-rolled live regions—it uses the emerging `document.ariaNotify` browser API where available, with a DOM live-region fallback, and avoids most of the manual-implementation pitfalls below.

Fluent's named common mistakes to avoid:

- Forgetting to localize live-region announcement strings (they're often not visible on screen, so it's easy to miss).
- Wrapping a large region (a full chat list, a table with frequently-updating cells) in a live region.
- Relying on `aria-relevant`/`aria-atomic`—cross-browser/screen-reader support is inconsistent.
- Putting an editable field (input, checkbox, select, `contenteditable`) inside or as a live region—every keystroke can re-trigger it.
- Expecting a freshly-inserted live-region *node with content already in it* to be read—except for `role="alert"`, live regions must exist in the DOM **before** the announced text is inserted.
- Calling `announce()` inside a `useEffect` with unstable dependencies (e.g. an un-memoized callback prop), causing repeat firing.
- Announcing on every keystroke of a text field—use Fluent's `useTypingAnnounce` hook instead, which debounces and fires ~0.5s after the user stops typing.

- Source: [Notification best practices](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/Notifications.mdx)

## Debugging live-region bugs

Screen reader live-region behavior is notoriously hard to debug (undocumented, differs per screen reader/browser combination). Fluent's documented triage order:

1. **Check for conflicting focus changes or typing**—some screen readers (e.g. VoiceOver) re-read the focused element right after a live-region fires, appearing to "swallow" the announcement.
2. **Check known edge cases**—an open modal (`role="dialog"`/`aria-modal="true"`) can block live-region updates from outside it (VoiceOver-specific); some screen readers filter out repeated identical text.
3. **Verify the live region's DOM directly**—confirm the node exists, isn't hidden (`aria-hidden`, `display: none`, `visibility: hidden`), and that the announced text is inserted at the right time relative to the node's existence. A `MutationObserver` on the node is Fluent's recommended way to watch this happening live.
4. If still stuck, escalate to an accessibility subject-matter expert.

- Source: [Debugging notifications](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/DebuggingNotifications.mdx)

## Truncation

Fluent deliberately moved away from CSS-based text truncation in v9 because of its accessibility problems: at small screen sizes or high zoom, truncated text can become unreadable, and the common "put the full text in a tooltip" fix doesn't reliably help—tooltips are often inaccessible to touchscreen and screen-magnification users, the population most likely to need the full text (per [WCAG 1.4.13, Content on Hover or Focus](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)).

Fluent's recommended alternatives, in order of preference:

1. **JavaScript character-count truncation**, optionally truncating in the *middle* of the string rather than the end (useful for filenames/emails where the end carries meaning)—this guarantees a minimum readable length regardless of zoom or container width.
2. A reasonable CSS `min-width` combined with CSS truncation, for tables/grids where horizontal scrolling is an expected pattern—but watch for [WCAG Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) failures if the `min-width` forces horizontal scroll at high zoom.
3. Only truncate content that's genuinely not needed to understand or operate the UI (e.g. an internal ID, or supplementary text after a title that already stands alone).
4. Truncate only in response to an explicit user action or setting (e.g. a user-selected "compact view").

- Source: [Truncation](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/Truncation.mdx)

## Quick tips / suggested review checklist

- [ ] No `aria-label` restates the component's type, action, state, or position—verify against Fluent's labelling anti-patterns above.
- [ ] Any custom focus-indicator style has been reviewed with a designer or accessibility expert before shipping.
- [ ] Live-region announcements use Fluent's `useAnnounce`/`AriaLiveAnnouncer` rather than a hand-rolled `aria-live` node, where practical.
- [ ] No editable field (input, checkbox, select, `contenteditable`) is inside or is itself a live region.
- [ ] Text-input-driven announcements use `useTypingAnnounce`, not a raw `announce()` call on every keystroke.
- [ ] No component relies on CSS truncation with only a tooltip as the full-text fallback—verify against Fluent's truncation guidance.
- [ ] The app has been tested at 400% zoom and in Windows High Contrast mode, not just the default theme.

## Related links

- [Components accessibility overview](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/AccessibleComponents.mdx)
- [Accessible experiences](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/AccessibleExperiences.mdx)
- [Component labelling](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/ComponentLabelling.mdx)
- [Focus indicator](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/FocusIndicator.mdx)
- [Notification best practices](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/Notifications.mdx)
- [Debugging notifications](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/DebuggingNotifications.mdx)
- [Truncation](https://github.com/microsoft/fluentui/blob/master/apps/public-docsite-v9/src/Concepts/Accessibility/Truncation.mdx)
- [tabster](https://github.com/microsoft/tabster)—the focus-management library Fluent UI is built on
- [Accessibility in Power Apps Component Framework (PCF) controls](../powerapps-component-framework/index.md)
- [Accessibility in Power Apps Code Apps](../code-apps/index.md)
