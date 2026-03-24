## 2026-03-24 - Missing ARIA Labels on Icon Buttons

**Learning:** Icon-only buttons using `size="icon"` frequently omit `aria-label`s in this app, making them completely inaccessible to screen readers as they lack visible text.
**Action:** Whenever implementing or reviewing an icon-only button (especially those with `size="icon"`), always ensure a descriptive `aria-label` attribute is included.
