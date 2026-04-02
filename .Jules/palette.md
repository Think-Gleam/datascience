## 2024-04-02 - Icon-Only Button Accessible Names
**Learning:** React components (like the `Button` with `size="icon"`) used exclusively with Lucide icons (e.g. `<Sun />`, `<Menu />`, `<X />`) do not automatically inherit text alternatives from their children, resulting in an empty accessible name which causes screen readers to announce generic labels like "button" rather than their function.
**Action:** Always provide explicit `aria-label` attributes on icon-only interactive elements in the UI library to ensure they have a descriptive accessible name for assistive technologies.
