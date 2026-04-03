## 2024-04-03 - Missing ARIA Labels on Icon-Only Buttons
**Learning:** Found a recurring accessibility pattern across the application (`navbar`, `admin`, `course-player`) where icon-only buttons (`<Button size="icon">` with Lucide React icons) lacked descriptive `aria-label`s. This makes the UI less friendly for screen reader users as they receive no context about the button's purpose.
**Action:** Always ensure that any `<Button size="icon">` component implementation includes an appropriate and descriptive `aria-label` attribute.
