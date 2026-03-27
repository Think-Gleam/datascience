## 2024-03-27 - Added ARIA labels to icon-only buttons
**Learning:** Found that while icon-only buttons look clean, they frequently lack ARIA labels, creating accessibility gaps for screen reader users. The `aria-label` attribute is the cleanest way to fix this without altering the visual design.
**Action:** When adding `size="icon"` buttons using shadcn/ui or any other library, always pair it with an `aria-label` to ensure keyboard/screen reader accessibility.
