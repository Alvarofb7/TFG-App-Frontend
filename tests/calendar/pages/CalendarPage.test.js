import { render, screen } from "@testing-library/react";
import { useUiStore, useCalendarStore } from "../../../src/hooks";
import { CalendarPage } from "../../../src/calendar";

jest.mock("../../../src/hooks", () => ({
	useUiStore: jest.fn(),
	useCalendarStore: jest.fn(),
}));

describe("Pruebas de CalendarPage", () => {
	beforeEach(() => {
		useUiStore.mockImplementation(() => ({
			openCalendarModal: jest.fn(),
		}));
		useCalendarStore.mockImplementation(() => ({
			events: [],
			setActiveEvent: jest.fn(),
			startLoadingEvents: jest.fn(),
			quitActiveEvent: jest.fn(),
		}));
	});

	test("CalendarPage muestra Calendar Y CalendarModal", () => {
		render(<CalendarPage />);

		expect(screen.getByText("Mes")).toBeInTheDocument();
		expect(screen.getByText("Semana")).toBeInTheDocument();
		expect(screen.getByText("Día")).toBeInTheDocument();
		expect(screen.getByText("Agenda")).toBeInTheDocument();
	});
});
