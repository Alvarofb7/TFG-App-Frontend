import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HomePage } from "../../../src/auth/layout/HomePage";

describe("Pruebas de HomePage", () => {
	test("renders HomePage", () => {
		render(<HomePage />);

		const logoElement = screen.getByAltText(/Logo app/i);
		expect(logoElement).toBeInTheDocument();

		const homeLinkElement = screen.getByRole("link", { name: /Home/i });
		expect(homeLinkElement).toBeInTheDocument();

		const featuresLinkElement = screen.getByRole("link", {
			name: /Funcionalidades/i,
		});
		expect(featuresLinkElement).toBeInTheDocument();

		const aboutLinkElement = screen.getByRole("link", { name: /¿Quién soy?/i });
		expect(aboutLinkElement).toBeInTheDocument();

		const authLinkElement = screen.getByRole("link", {
			name: /Autenticación/i,
		});
		expect(authLinkElement).toBeInTheDocument();
	});
});
