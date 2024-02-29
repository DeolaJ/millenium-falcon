# Millenium Falcon

Build your team to protect the galaxy with 4 crew members and 6 passengers.

This project was done in 4 days as a challenge.

## Instructions

### Getting Started

    git clone https://github.com/DeolaJ/millenium-falcon.git
    cd millenium-falcon
    npm install

### Development

To run the local server,

    npm run dev

`Prettier`, `Typescript`, and `Eslint` libraries are used for formating and error checking. Install their corresponding vscode extensions to use with VSCode.

### Test

Some unit and integration tests were written using `Jest` and `React testing library`. These tests were not as extensive because of the timeframe.

To run these tests

    npm run test

Some end to end tests were written using `Cypress`. These tests were not as extensive because of the timeframe.

To run these tests

    npm run test-end

### Production

To generate build files for production,

    npm run build

## Key Decisions

- Chose React Query to handle server state because of caching. I should have used useInfiniteQuery instead of useQuery, but had some issues figuring it out on time to complete the project within 5 days.
- Opted not to use a CSS library or framework to build this to make the project lean, but this cost me time.
- Opted to attach images to the project using a name map which was generated from the API. However, I opted to save a local version for performance benefits.
- Chose to use context to manage all the saved selections to avoid passing this down from the Millenium falcon form to the Dropdown list items.
- Chose to disable selected characters to block duplicates
- Focused a lot on user experience of the application to make the overall experience great. The transitions, hover states, error states, animations, countdown, and the rocket launch animation.
- Covered some accessibility concerns around the components I built both with manual testing and unit testing.

## If I had more time

- I would have created a better theme based on spacing (margin, padding), colors, and sizes using CSS variables
- I would have tested the project more for accessibility standards
- I would have used a simpler animation for the rocket launch to avoid importing the lottie-player library
- I would have had time to optimize the performance of the project
- I would have cleaned up my types and classes
