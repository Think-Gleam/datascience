## 2024-04-05 - Missing ARIA Labels on Icon-only Buttons
**Learning:** Icon-only buttons (like `<Button size="icon">` with Lucide React icons) often lack descriptive text, making them inaccessible to screen readers in this application's components.
**Action:** Always ensure `aria-label` attributes are applied to `<Button size="icon">` to clearly describe the action to assistive technologies.
