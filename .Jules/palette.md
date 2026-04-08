## 2024-11-20 - Global Navigation Icon Accessibility
**Learning:** Icon-only buttons used for critical navigation (like theme toggles and mobile menus) often lack descriptive `aria-label`s, which makes them inaccessible to screen readers.
**Action:** Always add `aria-label` attributes to `<Button size="icon">` components, especially in high-visibility global components like navbars and sidebars.
