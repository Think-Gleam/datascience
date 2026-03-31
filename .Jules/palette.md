## 2024-05-15 - Missing Accessible Names on Icon-Only Buttons
**Learning:** `Button size="icon"` components in the UI library often lack visible text and rely entirely on icons (e.g., Lucide React icons) to convey meaning. When these are implemented without accessible names, screen readers cannot announce their purpose, creating a critical accessibility barrier for navigation elements like mobile menus and theme toggles.
**Action:** Always verify that `<Button size="icon">` usages have a descriptive `aria-label` attribute if they do not contain visually hidden text.
