## 2026-04-25 - Added missing ARIA labels to Navbar icon buttons
**Learning:** Found that a few standalone icon buttons without text inside `client/src/components/navbar.tsx` missed descriptive labels. Though minor visually, this drastically hurts screen reader accessibility.
**Action:** Applied `aria-label` to `Toggle theme`, `Open menu`, and `Close menu` buttons in the navbar component. It's a quick fix that adheres strictly to the existing component usage while fulfilling the micro-UX goal.
