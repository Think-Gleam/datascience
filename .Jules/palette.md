## 2024-04-04 - Initial Setup

## 2026-04-04 - Accessibility: Missing ARIA Labels on shadcn/ui Icon Buttons
**Learning:** The `shadcn/ui` `<Button size="icon">` component pattern does not automatically enforce or provide screen-reader text for icon-only buttons, making them completely opaque to assistive technologies.
**Action:** Always manually provide a descriptive `aria-label` attribute whenever using `<Button size="icon">` with only an SVG/Icon child in the repository, and routinely audit navigation and menu elements for compliance.
