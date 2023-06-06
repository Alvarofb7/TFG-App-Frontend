module.exports = {
	testEnvironment: "jest-environment-jsdom",
	// setupFiles: ["./jest.setup.js"],
	transformIgnorePatterns: [],
	setupFilesAfterEnv: ["./jest.setup.js"],

	moduleNameMapper: {
		"\\.(css|less)$": "<rootDir>/tests/mocks/styleMock.js",
	},
};
