import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Navbar } from "../../../src/ui/components/Navbar";
import { useAuthStore } from "../../../src/hooks";

// Mock del hook useAuthStore
jest.mock("../../../src/hooks", () => ({
	useAuthStore: jest.fn(),
}));

describe("Pruebas en el componente Navbar", () => {
	beforeEach(() => {
		// Simulamos la respuesta del hook useAuthStore
		useAuthStore.mockImplementation(() => ({
			status: "authenticated",
			startLogout: jest.fn(),
		}));
	});

	test("Se visualizan todos los links en el componente", () => {
		render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);

		expect(screen.getByText(/Calendario/i)).toBeInTheDocument();
		expect(screen.getByText(/Notas/i)).toBeInTheDocument();
		expect(screen.getByText(/Kanban/i)).toBeInTheDocument();
		expect(screen.getByText(/Salir/i)).toBeInTheDocument();
	});

	test("Navbar se colpasa al hacer click en el botón", () => {
		const { container } = render(
			<BrowserRouter>
				<Navbar />
			</BrowserRouter>
		);

		const navbarDiv = container.querySelector(".navbar-collapse");
		expect(navbarDiv).toHaveClass("collapse");

		const button = screen.getByLabelText(/Toggle navigation/i);
		fireEvent.click(button);

		expect(navbarDiv).not.toHaveClass("collapse");
	});
});
