## 2024-03-22 - Missing ARIA Labels on Navigation Icon Buttons
**Learning:** Icon-only buttons used for critical navigation (like theme toggles and mobile menus) often lack `aria-label` attributes, which makes them inaccessible to screen readers since they have no visible text.
**Action:** Always ensure that any `<Button size="icon">` or similar component containing only an icon (like Lucide icons) has an explicit, descriptive `aria-label` attribute added to it.
