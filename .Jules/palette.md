
## 2026-04-02 - Accessible Icon-Only Buttons
**Learning:** Icon-only buttons (specifically `size="icon"` using `lucide-react` icons) often miss an accessible name, making them unreadable to screen readers.
**Action:** Whenever using an icon-only button without visible text, always ensure an `aria-label` is applied describing its action (e.g., `aria-label="Toggle theme"`).
