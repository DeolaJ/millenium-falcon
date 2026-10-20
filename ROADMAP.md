# Roadmap

A rough plan for the work ahead. Estimates are approximate.

## Bugs and cleanup (about 4 hours)

- [ ] `npm run build` fails because `tsc` type-checks the test files without the Jest types; split a test tsconfig or exclude `src/tests` from the app build
- [ ] `usePeopleImages` reads `VITE_SOME_KEY` instead of `VITE_APP_SWAPI_API`, so the live image map never loads and the app always falls back to the bundled map
- [ ] Clean up types and class names left over from the original 4-day build
- [ ] Remove the React Query devtools from production builds

## Data fetching (about 4 hours)

- [ ] Switch the people list to `useInfiniteQuery` for smoother pagination
- [ ] Prefetch the next page while the user browses
- [ ] Clearer empty, error and retry states when SWAPI is slow or down

## Design and theming (about 5 hours)

- [ ] Build a small theme with CSS variables for spacing, colours and sizes
- [ ] Light and dark mode
- [ ] Review layouts at phone widths

## Performance (about 4 hours)

- [ ] Replace the Lottie rocket launch with a lighter CSS or Framer Motion animation to drop `lottie-player` from the bundle
- [ ] Serve the character portraits as WebP at the sizes actually shown
- [ ] Measure with Lighthouse and fix the biggest wins

## Accessibility (about 3 hours)

- [ ] Full keyboard and screen reader pass on the dropdowns and the launch sequence
- [ ] Respect `prefers-reduced-motion` for the countdown and launch
- [ ] Expand the `jest-axe` checks to every component

## Testing and CI (about 4 hours)

- [ ] Unit tests for the hooks and the selection context
- [ ] Mock SWAPI in Cypress so end-to-end tests don't depend on the live API
- [ ] GitHub Actions workflow for lint, typecheck, unit tests and build

## Features (about 6 hours)

- [ ] Shareable team link that restores a saved team
- [ ] Show each character's details (homeworld, films) on the card
- [ ] Deploy a public demo
