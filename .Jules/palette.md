## 2024-03-15 - ARIA Labels on Icon Buttons
**Learning:** Found several icon-only buttons (like theme toggle, mobile menu, and action buttons in admin/course-player) missing `aria-label` attributes, which makes them inaccessible to screen readers.
**Action:** Always add `aria-label` or `<span className="sr-only">Text</span>` to buttons that only contain icons and no text.
