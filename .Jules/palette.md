## 2024-05-17 - Added missing ARIA labels to icon-only buttons
**Learning:** Found multiple instances where `size="icon"` buttons (like Theme Toggle, Mobile Menu, Edit/Delete Actions) lacked accessible labels, making them invisible to screen reader users despite having clear visual affordances (icons).
**Action:** When adding or reviewing icon-only buttons (`<Button size="icon">`), ensure `aria-label` is always explicitly provided.
