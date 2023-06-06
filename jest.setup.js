import "@testing-library/jest-dom/extend-expect";

require("dotenv").config({
	path: ".env.test",
});

jest.mock("./src/helpers/getEnvVariables", () => ({
	getEnvVariables: () => ({ ...process.env }),
}));
