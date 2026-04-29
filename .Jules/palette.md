## 2024-05-18 - ARIA Labels for Icon-Only Buttons
**Learning:** Found multiple instances where the `<Button size="icon">` component from shadcn/ui was used without any `aria-label`. This makes these essential controls (like the theme toggle and mobile menu toggle) completely invisible to screen readers, violating WCAG standards.
**Action:** Always verify that `<Button size="icon">` implementations include a descriptive `aria-label` attribute if they do not contain visible text content.
