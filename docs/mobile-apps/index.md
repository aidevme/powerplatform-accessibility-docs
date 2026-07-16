---
title: Accessibility in the Power Apps Mobile App
description: Why there's no dedicated Microsoft accessibility article for the Power Apps mobile client, and how accessibility differs between canvas and model-driven apps running on it.
source: https://learn.microsoft.com/en-us/power-apps/mobile/run-powerapps-on-mobile
last_verified: 2026-07-16
---

# Accessibility in the Power Apps Mobile App

The **Power Apps mobile app** is the client you install from the App Store, Google Play, or the Windows Store to run both canvas apps and model-driven apps (and some Dynamics 365 apps) on a phone or tablet. It's a different thing from the apps that run inside it—this page is about the mobile client and its navigation gestures, not about designing an individual canvas app or model-driven app, which are covered on their own pages.

**Key takeaway:** Accessibility on Power Apps mobile is **fragmented by which app type you're running**. Canvas apps carry verified screen-reader support from their own accessibility documentation. Model-driven apps' only screen-reader guide is desktop-and-keyboard-only and doesn't mention mobile or touch at all. And the mobile client itself—installing, navigating, favoriting, closing apps—has **no dedicated accessibility article whatsoever**; its own Microsoft Learn page doesn't mention accessibility, screen readers, or assistive technology a single time.

## What's actually documented, and what isn't

- **Canvas apps on mobile**: Microsoft's own canvas app accessibility documentation explicitly verifies screen-reader support with **TalkBack on Chrome and Power Apps mobile**, and **VoiceOver on Power Apps mobile and Safari**. Everything in [Accessibility in Power Apps Canvas apps](../canvas-apps/index.md)—`AccessibleLabel`, `TabIndex`, the Accessibility Checker's findings—was verified against these mobile screen readers, so it applies here too.
- **Model-driven apps on mobile**: Microsoft's [screen reader guide for model-driven apps](https://learn.microsoft.com/en-us/power-apps/user/screen-reader) is entirely about desktop keyboard navigation—Narrator scan mode, Tab/Shift-Tab, Caps Lock + arrow-key navigation modes. It **never mentions mobile, touch, TalkBack, or VoiceOver once**. There's no equivalent published guidance for touch-based screen-reader navigation of a model-driven app on a phone.
- **The mobile client app itself**: [Install the Power Apps mobile app](https://learn.microsoft.com/en-us/power-apps/mobile/run-powerapps-on-mobile) documents sign-in, finding apps, favoriting, sorting, searching, and closing apps—with zero mention of accessibility anywhere in the article.

## Gesture-only interactions worth flagging

Reading the mobile client's own documentation surfaced concrete, gesture-dependent interactions with no confirmed accessible alternative:

- **Closing a canvas app on iOS** is documented as "swipe from the left edge of the app to the right"—with no alternative shown. (On Android, the same task has a documented alternative: pressing the **Back** button.)
- **Wrapped native mobile apps** can use the device accelerometer so that shaking the device opens the app menu. No manual, non-motion alternative is documented for this. A shake-only trigger with no alternative runs counter to [WCAG 2.5.4 (Motion Actuation)](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html), which requires functions triggered by device motion to also be operable through a conventional UI control.
- **Pinch-to-zoom** on a canvas app is standard OS-level gesture behavior with typical platform-level alternatives (OS zoom/magnification), so it's lower risk than the two above.

## What to do about it

- For canvas apps running on mobile, everything in [Accessibility in Power Apps Canvas apps](../canvas-apps/index.md) already applies—it's the same rendering engine, and Microsoft's own verification already covers TalkBack and VoiceOver.
- For model-driven apps on mobile, don't assume the desktop screen-reader guide's Narrator/keyboard instructions transfer to touch navigation. Test manually with VoiceOver (iOS) and TalkBack (Android) on an actual device—there's no substitute, since Microsoft's own documentation doesn't cover this.
- If you build or configure a wrapped native mobile app that uses shake-to-open or other motion triggers, provide a manual UI alternative (e.g., a visible menu button) rather than relying on the gesture alone.

## Quick tips / suggested review checklist

- [ ] For canvas apps, verify the `AccessibleLabel`/`TabIndex`/focus-indicator checklist from [Canvas apps](../canvas-apps/index.md) has actually been tested with VoiceOver and TalkBack on a real device, not just Narrator/JAWS/NVDA on desktop.
- [ ] For model-driven apps, manually test touch screen-reader navigation on iOS and Android—don't assume the desktop Narrator guide's behavior carries over.
- [ ] Confirm any gesture-only action (swipe-to-close, shake-to-open-menu) has a documented, discoverable non-gesture alternative for your users, especially on iOS where fewer hardware-button alternatives exist.
- [ ] Don't state or imply that Power Apps mobile as a client is independently accessibility-conformant—no Microsoft documentation makes that claim for the client itself.
- [ ] Re-verify this page's findings periodically—this is based on the absence of content in Microsoft's current docs, which could change without a clear announcement.

## Related links

- [Install the Power Apps mobile app](https://learn.microsoft.com/en-us/power-apps/mobile/run-powerapps-on-mobile)
- [Use a screen reader in model-driven apps](https://learn.microsoft.com/en-us/power-apps/user/screen-reader)
- [Accessibility in Power Apps Canvas apps](../canvas-apps/index.md)
- [Accessibility in Power Apps Model-Driven Apps](../model-apps/index.md)
- [WCAG 2.5.4: Motion Actuation](https://www.w3.org/WAI/WCAG22/Understanding/motion-actuation.html)
- [Comparison across Power Platform surfaces](../index.md)
