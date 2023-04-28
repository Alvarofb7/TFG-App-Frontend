import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, FabAddNew } from "../";
import { getMessagesES, localizer } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {
	const { openCalendarModal } = useUiStore();
	const { events, setActiveEvent, startLoadingEvents, quitActiveEvent } =
		useCalendarStore();
	const [lastView, setLastView] = useState(
		localStorage.getItem("lastView") || "week"
	);

	const eventStyleGetter = (event) => {
		let style = {};
		if (lastView !== "agenda") {
			style = {
				backgroundColor: "#357EC7",
				borderRadius: "0px",
				opacity: 0.8,
				color: "white",
			};
		} else {
			style = {
				color: "black",
				backgroundColor: "white",
			};
		}
		return {
			style,
		};
	};

	useEffect(() => {
		startLoadingEvents();
	}, []);

	const onSelect = (event) => {
		setActiveEvent(event);
		// setSelectedEventId(event.id);
		openCalendarModal();
	};

	const onSelectEmptySlot = () => {
		quitActiveEvent();
		// setSelectedEventId(null);
	};

	const onViewChanged = (event) => {
		localStorage.setItem("lastView", event);
		setLastView(event);
	};

	return (
		<>
			<Calendar
				selectable
				dayLayoutAlgorithm="no-overlap" // Evitamos que se solapen los eventos
				culture="es" // Calendario en español
				localizer={localizer} // Usamos datefns
				events={events} // Eventos
				defaultView={lastView} // Vista por defecto
				startAccessor="start"
				endAccessor="end"
				style={{ height: "calc(100vh - 70px)", marginTop: "10px" }} // Estilo del calendario
				messages={getMessagesES()} // Colocamos los mensajes a español
				eventPropGetter={eventStyleGetter} // Estilo eventos
				components={{
					event: CalendarEvent,
				}}
				onSelectEvent={onSelect} // Acción al hacer click al evento
				onSelectSlot={onSelectEmptySlot}
				onView={onViewChanged} // Establece la última pestaña vista
				popup // Aplica "Ver más"
			/>

			<CalendarModal />

			<FabAddNew />
		</>
	);
};
