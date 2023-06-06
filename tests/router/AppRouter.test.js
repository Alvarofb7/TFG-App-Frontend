import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "../../src/router/AppRouter";
import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";

jest.mock("../../src/hooks/useAuthStore");

jest.mock("../../src/calendar", () => ({
	CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Pruebas de AppRouter", () => {
	const mockCheckAuthToken = jest.fn();

	beforeEach(() => jest.clearAllMocks());

	test("Debe de mostrar la página de home en caso de no estar autenticados", () => {
		useAuthStore.mockReturnValue({
			status: "not-authenticated",
			checkAuthToken: mockCheckAuthToken,
		});

		const { container } = render(
			<MemoryRouter initialEntries={["/home"]}>
				<AppRouter />
			</MemoryRouter>
		);

		expect(screen.getByText("Ingreso")).toBeTruthy();
		expect(container).toMatchSnapshot();
	});

	test("Debe de mostrar el calendario en caso de estar autenticados", () => {
		useAuthStore.mockReturnValue({
			status: "authenticated",
			checkAuthToken: mockCheckAuthToken,
		});

		const { container } = render(
			<MemoryRouter>
				<AppRouter />
			</MemoryRouter>
		);

		expect(screen.getByText("CalendarPage")).toBeTruthy();
		expect(container).toMatchSnapshot();
	});
});
