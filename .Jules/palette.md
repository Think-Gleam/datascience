## 2024-03-22 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found that multiple icon-only buttons (theme toggle, mobile menu toggle, close menu button) across the design system were missing `aria-label` attributes, which creates a poor experience for screen reader users as they hear "button" without context.
**Action:** Always ensure that any button containing only an icon (or where text is hidden visually) includes a descriptive `aria-label` attribute, following the `<button aria-label="Description"><Icon /></button>` pattern.
