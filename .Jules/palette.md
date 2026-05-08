## 2024-05-09 - Missing aria-label for Icon-only buttons
**Learning:** Found several icon-only buttons (`<Button size="icon">`) lacking an `aria-label` attribute in both `course-player.tsx` and `admin.tsx`. Icon-only buttons without accessible names are invisible or unhelpful to screen reader users.
**Action:** When creating icon-only buttons, I must always include a descriptive `aria-label` to ensure accessibility for assistive technology users.
