import { fireEvent, render, screen } from "@testing-library/react";
import { useCalendarStore, useUiStore } from "../../../src/hooks";
import { eventExample } from "../../fixtures/calendarStates";
import { CalendarModal } from "../../../src/calendar/components/CalendarModal";

jest.mock("../../../src/hooks/useUiStore");
jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en el componente CalendarModal", () => {
	const mockCloseCalendarModal = jest.fn();
	const mockQuitActiveEvent = jest.fn();
	const mockStartSavingEvent = jest.fn();
	const mockStartDeletingEvent = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Debe de mostrar el componente correctamente y el título 'Editar evento' si el evento tiene id", () => {
		useCalendarStore.mockReturnValue({
			activeEvent: eventExample,
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);
		const titleModal = screen.getByText("Editar Evento");
		const form = screen.getByLabelText("form-event");
		const titleInput = screen.getByRole("textbox", { name: "title" });

		expect(titleModal).toBeInTheDocument();;
		expect(form).toBeInTheDocument();;
		expect(titleInput).toBeInTheDocument();;
	});

	test("Debe de mostrar el componente correctamente y el título 'Nuevo evento' si el evento no tiene id", () => {
		useCalendarStore.mockReturnValue({
			activeEvent: null,
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const titleModal = screen.getByText("Nuevo Evento");
		const form = screen.getByLabelText("form-event");
		const titleInput = screen.getByRole("textbox", { name: "title" });

		expect(titleModal).toBeInTheDocument();;
		expect(form).toBeInTheDocument();;
		expect(titleInput).toBeInTheDocument();;
	});

	test("No debe de mostrar el componente", () => {
		useCalendarStore.mockReturnValue({
			activeEvent: null,
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: false,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const form = screen.queryByText("form-event");

		expect(form).toBeNull();
	});

	test("Debe llamar a la función startSavingEvent al hacer clic en el botón 'Guardar' si se cumplen las condiciones", () => {
		useCalendarStore.mockReturnValue({
			activeEvent: null,
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const titleExample = "Titulo";

		const titleInput = screen.getByRole("textbox", { name: "title" });
		fireEvent.change(titleInput, {
			target: { name: "title", value: titleExample },
		});

		const saveButton = screen.getByText("Guardar");
		fireEvent.click(saveButton);

		expect(mockStartSavingEvent).toHaveBeenCalledTimes(1);
		expect(mockCloseCalendarModal).toHaveBeenCalledTimes(1);
	});

	test("Debe mostrarse el botón de eliminar si el evento tiene id", () => {
		const mockStartSavingEvent = jest.fn();

		useCalendarStore.mockReturnValue({
			activeEvent: { id: "1" },
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const deleteBtn = screen.getByLabelText("btn-delete-event");
		expect(deleteBtn).toBeInTheDocument();
	});

	test("No debe mostrarse el botón de eliminar si el evento no tiene id", () => {
		useCalendarStore.mockReturnValue({
			activeEvent: null,
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const deleteButton = screen.queryByText("Eliminar");
		expect(deleteButton).toBeNull();
	});

	test("No debe llamar a la función startSavingEvent al hacer clic en el botón 'Guardar' si no se cumplen las condiciones", () => {
		const mockStartSavingEvent = jest.fn();

		useCalendarStore.mockReturnValue({
			activeEvent: null,
			quitActiveEvent: mockQuitActiveEvent,
			startSavingEvent: mockStartSavingEvent,
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const saveButton = screen.getByText("Guardar");
		fireEvent.click(saveButton);

		expect(mockStartSavingEvent).toHaveBeenCalledTimes(0);
	});

	test("Debe llamar a las funciones startDeletingEvent y closeCalendarModal al hacer clic en el botón 'Eliminar'", () => {
		useCalendarStore.mockReturnValue({
			activeEvent: { id: "1" },
			quitActiveEvent: jest.fn(),
			startSavingEvent: jest.fn(),
			startDeletingEvent: mockStartDeletingEvent,
		});

		useUiStore.mockReturnValue({
			isCalendarModalOpen: true,
			closeCalendarModal: mockCloseCalendarModal,
		});

		render(<CalendarModal />);

		const deleteBtn = screen.getByLabelText("btn-delete-event");
		fireEvent.click(deleteBtn);

		expect(mockStartDeletingEvent).toHaveBeenCalledTimes(1);
		expect(mockCloseCalendarModal).toHaveBeenCalledTimes(1);
	});
});
