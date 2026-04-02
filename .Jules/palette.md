## 2024-05-18 - Added ARIA Labels to Navigation Buttons
**Learning:** Icon-only buttons used for critical app navigation (like theme toggling or opening/closing mobile menus) in this application often lack descriptive ARIA labels, creating accessibility barriers for screen reader users.
**Action:** When adding or reviewing icon-only buttons (`<Button size="icon">`), ensure they have a descriptive `aria-label` attribute, especially if their state is dynamic (e.g., changing the label based on the active theme).
