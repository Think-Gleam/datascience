## 2026-05-07 - Icon-only buttons require ARIA labels
**Learning:** Icon-only buttons (like those using `lucide-react` icons without visible text) inherently lack context for screen readers, leading to poor accessibility since the purpose of the button is obscured.
**Action:** Always verify icon-only buttons in the codebase have a descriptive `aria-label` applied, particularly for critical actions like editing, deleting, or navigating back.
