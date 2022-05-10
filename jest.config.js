/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    transform: {
        "^.+\\.(js|ts|tsx)$": "ts-jest",
    },
    testPathIgnorePatterns: ["/node_modules/", "/out/"],
    transformIgnorePatterns: ["/node_modules/(?!(syllable)/)"],
    globals: {
        "ts-jest": {
            useESM: false,
        },
    },
};
