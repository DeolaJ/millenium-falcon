// eslint-disable-next-line no-undef
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleDirectories: ["node_modules"],
    moduleNameMapper: {
        "^.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$": "jest-transform-stub",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};
