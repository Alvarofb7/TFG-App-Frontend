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
		openCalendarModal();
	};

	const onViewChanged = (event) => {
		localStorage.setItem("lastView", event);
		setLastView(event);
	};

	return (
		<>
			<Calendar
				selectable
				dayLayoutAlgorithm="no-overlap"
				culture="es"
				localizer={localizer}
				events={events}
				defaultView={lastView}
				startAccessor="start"
				endAccessor="end"
				style={{
					height: "calc(100vh - 70px)",
					marginTop: "10px",
					fontFamily: "Montserrat",
				}}
				messages={getMessagesES()}
				eventPropGetter={eventStyleGetter}
				components={{
					event: CalendarEvent,
				}}
				onSelectEvent={onSelect}
				onView={onViewChanged}
				popup
			/>

			<CalendarModal />

			<FabAddNew />
		</>
	);
};
