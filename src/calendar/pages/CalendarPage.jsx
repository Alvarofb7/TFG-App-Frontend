import { useEffect, useState } from "react";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { CalendarEvent, CalendarModal, FabAddNew, FabDelete, Navbar } from "../";

import { getMessagesES, localizer } from "../../helpers";
import { useCalendarStore, useUiStore } from "../../hooks";

export const CalendarPage = () => {

    const { openDateModal } = useUiStore();
    const { events, setActiveEvent, startLoadingEvents, quitActiveEvent } = useCalendarStore();
    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "week");
    const [selectedEventId, setSelectedEventId] = useState(null);

    const eventStyleGetter = (event) => {
        let style = {}
        if (lastView !== "agenda") {
            style = {
                backgroundColor: (event._id === selectedEventId) ? "#9FCAF1" : "#357EC7",
                borderRadius: "0px",
                opacity: 0.8,
                color: "white",
            }
        } else {
            style = {
                backgroundColor: (event._id === selectedEventId) && "#9FCAF1"
            }
        }
        return {
            style
        }
    }

    useEffect(() => {
        startLoadingEvents();
    }, [])

    const onDoubleClick = () => {
        openDateModal();
    }

    const onSelect = (event) => {
        setActiveEvent(event);
        setSelectedEventId(event.id);
    }

    const onSelectEmptySlot = () => {
        quitActiveEvent();
        setSelectedEventId  (null);
    }

    const onViewChanged = (event) => {
        localStorage.setItem("lastView", event);
        setLastView(event);
    }

    return (
        <>
            <Navbar />

            <Calendar
                selectable
                dayLayoutAlgorithm="no-overlap" // Evitamos que se solapen los eventos
                culture="es" // Calendario en español
                localizer={ localizer } // Usamos datefns
                events={ events } // Eventos
                defaultView={ lastView } // Vista por defecto
                startAccessor="start"
                endAccessor="end"
                style={ { height: "calc(100vh - 80px)" } } // Estilo del calendario
                messages={ getMessagesES() } // Colocamos los mensajes a español
                eventPropGetter={ eventStyleGetter } // Estilo eventos
                components={ {
                    event: CalendarEvent,
                } }
                onDoubleClickEvent={ onDoubleClick } // Acción al hacer dobleclick al evento
                onSelectEvent={ onSelect } // Acción al hacer click al evento
                onSelectSlot={ onSelectEmptySlot }
                onView={ onViewChanged } // Establece la última pestaña vista
                popup // Aplica "Ver más"
            />

            <CalendarModal />

            <FabAddNew />

            <FabDelete />

        </>
    )
}
