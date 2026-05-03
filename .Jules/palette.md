## 2024-05-03 - [Dynamic ARIA labels for repeatable UI elements]
**Learning:** Using dynamic data in `aria-label`s for repeatable elements in lists or tables (e.g. `aria-label={"Edit course " + course.title}` instead of just `"Edit"`) significantly improves context for screen reader users, who often navigate by interactive elements.
**Action:** When adding labels to elements rendered within a map or loop, always check if contextual dynamic data can be appended to the label to make it unique and descriptive.
