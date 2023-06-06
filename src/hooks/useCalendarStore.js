import { useDispatch, useSelector } from "react-redux";
import {
	onAddNewEvent,
	onClearActiveEvent,
	onDeleteEvent,
	onSetActiveEvent,
	onUpdateEvent,
	onLoadEvents,
} from "../store";
import Swal from "sweetalert2";
import { api } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
	const dispatch = useDispatch();
	const { events, activeEvent } = useSelector((state) => state.calendar);
	const { user } = useSelector((state) => state.auth);

	const handleApiError = (error, messageTitle, messageBody) => {
		console.log(error);
		Swal.fire(messageTitle, messageBody, "error");
	};

	const startLoadingEvents = async () => {
		try {
			const { data } = await api.get("/calendar");
			const events = convertEventsToDateEvents(data.eventos);
			dispatch(onLoadEvents(events));
		} catch (error) {
			handleApiError(
				error,
				"Error al cargar los eventos",
				"No se han podido cargar los elementos"
			);
		}
	};

	const startSavingEvent = async (calendarEvent) => {
		try {
			if (calendarEvent.id) {
				//Actualizando
				await api.put(`/calendar/${calendarEvent.id}`, calendarEvent);

				dispatch(onUpdateEvent({ ...calendarEvent }));
			} else {
				// Creando
				const { data } = await api.post("/calendar", calendarEvent);
				dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id, user }));
			}
		} catch (error) {
			handleApiError(
				error,
				"Error al guardar",
				error.response?.data?.msg ||
					"No se ha podido crear/actualizar el evento"
			);
		}
	};

	const startDeletingEvent = async () => {
		try {
			await api.delete(`/calendar/${activeEvent?.id}`);

			dispatch(onDeleteEvent());
		} catch (error) {
			handleApiError(
				error,
				"Error al eliminar",
				error.response?.data?.msg || "No se ha podido eliminar el evento"
			);
		}
	};

	const setActiveEvent = (calendarEvent) => {
		dispatch(onSetActiveEvent(calendarEvent));
	};

	const quitActiveEvent = () => {
		dispatch(onClearActiveEvent());
	};

	return {
		//* Propiedades
		activeEvent,
		events,

		//* Métodos
		quitActiveEvent,
		startDeletingEvent,
		setActiveEvent,
		startLoadingEvents,
		startSavingEvent,
	};
};
