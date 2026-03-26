## 2024-05-24 - Icon Buttons Require Explicit ARIA Labels
**Learning:** Found multiple instances (`admin.tsx`, `navbar.tsx`, `course-player.tsx`) where icon-only buttons (using `size="icon"`) were missing accessible labels. These buttons, when read by a screen reader, provide no context about their function since they contain no text.
**Action:** Always verify that buttons lacking descriptive inner text include an `aria-label` or `aria-labelledby` attribute. When using `size="icon"` from the shadcn/ui components library, this check should be automatic.
