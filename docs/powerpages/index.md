---
title: Accessibility in Power Pages
description: Comprehensive guidance on accessibility standards conformance, accessible site customization, and testing practices for Power Pages.
source: https://learn.microsoft.com/en-us/power-pages/admin/accessibility
last_verified: 2026-07-15
---

# Accessibility in Power Pages

Microsoft is committed to making its products and services accessible to everyone. This page summarizes the accessibility standards Power Pages conforms to out of the box, and — more importantly for architects and developers — outlines **what you remain responsible for** once you start customizing a site.

> For general Microsoft accessibility information, see the [Microsoft Accessibility](https://www.microsoft.com/accessibility) website and [Accessibility features of Microsoft products](https://www.microsoft.com/en-us/accessibility).

## Key takeaway for solution builders

Power Pages the *platform* conforms to WCAG 2.2, Section 508, and EN 301 549. However, conformance is not automatically inherited by your site once you add custom HTML, Liquid, JavaScript, CSS, or embedded components (Power BI reports, custom web templates, etc.). **You own the accessibility of anything you customize.**

## Accessibility standards Power Pages conforms to

Detailed conformance reports for each standard are published at [Microsoft Accessibility Conformance Reports](https://cloudblogs.microsoft.com/industry-blog/government/2018/09/11/accessibility-conformance-reports/).

### WCAG 2.2

The [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/) cover a wide range of recommendations for making web content accessible to people with visual impairments, hearing loss, limited mobility, inability to speak, blindness and low vision, deafness, limited movement, photosensitivity, and cognitive or developmental disabilities. The guidelines also address accessibility of content across desktops, laptops, tablets, and mobile devices.

**Power Pages conforms to the WCAG 2.2 accessibility standard.**

### US Section 508

The US General Services Administration (GSA) Office of Government-wide Policy (OGP) is tasked under [Section 508](https://www.section508.gov/) of the Rehabilitation Act with providing technical assistance to help Federal agencies comply with these requirements, ensuring that covered information and communication technology (ICT) is accessible to, and usable by, individuals with disabilities.

**Power Pages conforms to the Section 508 guidelines defined by the US GSA.**

### EN 301 549

[EN 301 549](https://www.etsi.org/deliver/etsi_en/301500_301599/301549/02.01.02_60/en_301549v020102p.pdf), published by the European Telecommunications Standards Institute (ETSI), provides an open, inclusive, and collaborative environment supporting the timely development, ratification, and testing of globally applicable standards for ICT-enabled systems, applications, and services.

**Power Pages conforms to ETSI EN 301 549.**

| Standard | Governing body | Scope | Conformance |
| --- | --- | --- | --- |
| WCAG 2.2 | W3C / WAI | Global web content accessibility | Conforms |
| Section 508 | US GSA (Rehabilitation Act) | US Federal ICT accessibility | Conforms |
| EN 301 549 | ETSI (EU) | ICT accessibility across EU member states | Conforms |

## Creating an accessible webpage

When building or extending a Power Pages site, follow the [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/) for widget patterns, keyboard interaction, and ARIA usage.

### Customizing your site and accessibility

> **Important:** When you customize a Power Pages site, **you are responsible** for meeting the applicable accessibility standards (WCAG, Section 508, EN 301 549, or others mandated by your organization/jurisdiction). Platform conformance does not extend to custom code you add.

### Basic forms

A basic form renders a model-driven Power Apps form on a webpage. Basic forms typically don't require a developer to design or configure, though a developer may be useful to extend certain form features.

- More information: [How to create and modify Dataverse forms using the Data workspace](../configure/data-workspace-forms)

#### Basic form accessibility options

Controls in basic forms are built to follow WCAG 2.2. The following options help make forms more accessible:

| Name | Description |
| --- | --- |
| **ToolTips Enabled** | Set using the description of the attribute on the target table. Adds a `title` attribute, giving screen readers additional information. Default: `false`. |
| **Enable Validation Summary Links** | Boolean. When `true`, renders anchor links in the validation summary that scroll to the field containing an error. Default: `true`. |

- More information: [Add a form](../getting-started/add-form)

### Liquid templates and content snippets

When you add custom HTML and [Liquid](../configure/liquid-overview) content to a Power Pages site, accessibility must be explicitly considered. Whoever edits Liquid templates or [content snippets](../configure/content-snippets) is responsible for ensuring that content is accessible and adheres to the required policies (e.g., WCAG 2.2, US Section 508, ETSI EN 301 549).

- Reference: [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) — a searchable list of WCAG requirements with links to full descriptions.

### Power BI embeds

Power Pages lets you embed Power BI reports/dashboards as a [first-party component](../getting-started/add-power-bi). As the report/dashboard author, you're responsible for ensuring your Power BI content itself is accessible.

- More information: [Power BI accessibility guide](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-accessibility-creating-reports)

## Quick tips for accessible content

Practical checks to apply during development and QA:

- **Parity of experience** — a non-sighted or visually impaired person must be able to do everything a sighted user can do.
- **Reflow at 400% zoom** — verify text stays readable and pages/controls function as expected. See [WCAG 1.4.10 (Reflow)](https://www.w3.org/WAI/WCAG22/Understanding/reflow).
- **Color contrast** — use a color contrast checking tool. See [WCAG 1.4.3 (Contrast Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
- **Don't rely on color alone** — if color highlights meaning or state, also convey it through text or another visual cue. See [WCAG 1.4.1 (Use of Color)](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).
- **Alt text on every `<img>`** — use an empty `alt=""` to hide purely decorative images from screen readers (ideally define decorative images via CSS instead). See [WCAG C9](https://www.w3.org/WAI/WCAG22/Techniques/css/C9.html).
- **Automated scanning** — use [Accessibility Insights](https://accessibilityinsights.io/) for two types of scans:
  - [FastPass](https://accessibilityinsights.io/docs/web/getstarted/fastpass/) — automated check against dozens of common accessibility requirements.
  - [Assessment](https://accessibilityinsights.io/docs/web/getstarted/assessment/) — measures compliance against WCAG 2.2 Level AA success criteria.
- **Follow ARIA authoring patterns** — apply [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/) when designing page layout and custom widgets.
- **Test with real assistive tech**:
  - Screen reader: [Windows Narrator](https://support.microsoft.com/windows/chapter-1-introducing-narrator-7fe8fd72-541f-4536-7658-bfc37ddaf9c6#WindowsVersion=Windows_11).
  - [Immersive Reader](https://education.microsoft.com/resource/9b010288) in Microsoft Edge — confirm the site renders and reads correctly, adjusting as needed.

## Suggested review checklist

Use this as a pre-release gate for any Power Pages site with custom Liquid/HTML/CSS/JS or embedded components:

- [ ] All images have appropriate `alt` text (or empty `alt=""` for decorative images).
- [ ] Color contrast meets WCAG 2.2 AA (contrast ratio ≥ 4.5:1 for normal text, ≥ 3:1 for large text).
- [ ] No information is conveyed by color alone.
- [ ] Site is usable and readable at 400% zoom/reflow.
- [ ] Custom widgets follow WAI-ARIA Authoring Practices (roles, states, keyboard interaction).
- [ ] Forms use tooltips and validation summary links where helpful.
- [ ] Embedded Power BI reports/dashboards are independently verified for accessibility.
- [ ] Site passes an [Accessibility Insights](https://accessibilityinsights.io/) FastPass scan.
- [ ] Site has been spot-checked with a screen reader (e.g., Narrator) and Immersive Reader.

## Microsoft accessibility features

Microsoft accessibility features help organizations address accessibility requirements and conform to the standards described above.

- More information: [Accessibility features of Microsoft products](https://www.microsoft.com/en-us/accessibility)

## Related links

- [Microsoft Accessibility Conformance Reports](https://cloudblogs.microsoft.com/industry-blog/government/2018/09/11/accessibility-conformance-reports/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices/)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [Source: Microsoft Learn — Accessibility in Power Pages](https://learn.microsoft.com/en-us/power-pages/admin/accessibility)
