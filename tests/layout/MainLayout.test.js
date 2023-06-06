import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { MainLayout } from "../../src/layout/MainLayout";

jest.mock("../../src/hooks/useAuthStore")

jest.mock("../../src/ui/components/Navbar", () => ({
	Navbar: () => <div>Navbar</div>,
}));

describe("Pruebas en el layout MainLayout", () => {
	test("renders Navbar and children", () => {
		useAuthStore.mockImplementation(() => ({
			checkAuthToken: jest.fn(),
		}));

		const children = <div>Children</div>;

		render(<MainLayout>{children}</MainLayout>);

		expect(screen.getByText("Navbar")).toBeInTheDocument();
		expect(screen.getByText("Children")).toBeInTheDocument();
	});
});
