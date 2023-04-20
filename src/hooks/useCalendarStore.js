import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onClearActiveEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import Swal from "sweetalert2";
import { api } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const startLoadingEvents = async () => {
        try {
            const { data } = await api.get("/calendar");

            const events = convertEventsToDateEvents(data.eventos);
            dispatch(onLoadEvents(events));
        } catch (error) {
            console.log(error);
            Swal.fire("Error al cargar los eventos", "No se han podido cargar los elementos", "error");
        }
    }

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
            console.log(error);
            Swal.fire("Error al guardar", error.response?.data?.msg || "No se ha podido crear/actualizar el evento", "error");
        }
    };

    const startDeletingEvent = async () => {
        try {
            await api.delete(`/calendar/${activeEvent.id}`);

            dispatch(onDeleteEvent());
        } catch (error) {
            console.log(error);
            Swal.fire("Error al eliminar", error.response.data?.msg || "No se ha podido eliminar el evento", "error");
        }
    };

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const quitActiveEvent = () => {
        dispatch(onClearActiveEvent());
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent?.id,

        //* Métodos
        quitActiveEvent,
        startDeletingEvent,
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}


