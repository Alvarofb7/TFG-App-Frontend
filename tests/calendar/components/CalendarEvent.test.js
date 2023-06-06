import { render, screen } from "@testing-library/react";
import { CalendarEvent } from "../../../src/calendar/components/CalendarEvent";
import { eventExample2 } from "../../fixtures/calendarStates";

describe("Pruebas en el componente CalendarEvent", () => {
	test("Debe de visualizarse el evento correctamente", () => {
		render(<CalendarEvent event={eventExample2} />);

		const { title, notes } = eventExample2;

		const textTitle = screen.queryByText(title);
		const textNotes = screen.queryByText(`- ${notes}`);

		expect(textTitle).toBeInTheDocument();
		expect(textNotes).toBeInTheDocument();
	});
});
