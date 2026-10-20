# Millenium Falcon

Build your team to protect the galaxy with 4 crew members and 6 passengers.

Millenium Falcon is a small React app for Star Wars fans and anyone who wants a fun, polished team picker. You search the Star Wars characters from the [SWAPI](https://swapi.py4e.com) API, choose 4 crew members and 6 passengers, then watch your team launch with a countdown and rocket animation.

It started as a 4-day frontend challenge and is now a personal side project. See [ROADMAP.md](ROADMAP.md) for the work ahead.

## Features

- Searchable, paginated character dropdowns with keyboard support
- Duplicate protection: a character picked once is disabled everywhere else
- Character portraits mapped from the API and served locally for speed
- Transitions, hover and error states, a countdown and a launch animation
- Accessibility checks in the unit tests with `jest-axe`

## Built with

- [React 18](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev) for development and builds
- [TanStack React Query](https://tanstack.com/query) for server state and caching
- [Framer Motion](https://www.framer.com/motion/) and [Lottie](https://github.com/LottieFiles/lottie-react) for animation
- [Sass](https://sass-lang.com) for styles
- [Jest](https://jestjs.io), [React Testing Library](https://testing-library.com) and [Cypress](https://www.cypress.io) for tests
- ESLint and Prettier for linting and formatting

## Getting started

You need Node.js 18 or later.

    git clone https://github.com/DeolaJ/millenium-falcon.git
    cd millenium-falcon
    npm install
    cp .env.example .env

In `.env`, set `VITE_APP_SWAPI_API` to a SWAPI base URL, for example `https://swapi.py4e.com` or `https://swapi.dev`.

### Development

    npm run dev

Install the Prettier, TypeScript and ESLint extensions to get formatting and error checking in VS Code.

### Tests

Unit and integration tests use Jest and React Testing Library:

    npm run test

End-to-end tests use Cypress:

    npm run test-end

### Production build

    npm run build

## Key decisions

- Chose React Query to handle server state because of caching. `useInfiniteQuery` would suit the paginated list better than `useQuery`; that change is on the roadmap.
- Opted not to use a CSS library or framework to keep the project lean, at the cost of extra time.
- Character images are attached using a name map generated from the API, with a local copy saved for performance.
- React context holds the saved selections, so they don't have to be passed from the form down to every dropdown item.
- Selected characters are disabled to block duplicates.
- Focused on the user experience: transitions, hover states, error states, animations, the countdown and the rocket launch.
- Covered accessibility for the components with manual testing and unit tests.

## Roadmap

Planned work lives in [ROADMAP.md](ROADMAP.md).

## License

[MIT](LICENSE)
