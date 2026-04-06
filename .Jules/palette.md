## 2024-04-06 - Missing ARIA Labels on Icon Buttons
**Learning:** Found a common pattern where `<Button size="icon">` using `lucide-react` icons (like Theme Toggle, Mobile Menu, Close Menu) lack accessible names, rendering them silent or confusing for screen reader users.
**Action:** Always ensure any `<Button size="icon">` or purely visual icon button explicitly defines a descriptive `aria-label` to maintain accessibility.
