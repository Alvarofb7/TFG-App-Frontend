import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onClearActiveEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent, onLoadEvents } from "../store";
import Swal from "sweetalert2";

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async (calendarEvent) => {
        try {
            if (calendarEvent._id) {
                //Actualizando
                dispatch(onUpdateEvent({ ...calendarEvent }));

            } else {
                // Creando
                dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime(), user }));
            }

        } catch (error) {
            console.log(error);
            Swal.fire("Error al guardar", "No se ha podido crear/actualizar el evento", "error");
        }
        
    };
    
    const startDeletingEvent = async () => {

        try {            
            dispatch(onDeleteEvent());
        } catch(error) {
            console.log(error);
            Swal.fire("Error al eliminar", "No se ha podido eliminar el evento", "error");
        }
    };

    const quitActiveEvent = () => {
        dispatch(onClearActiveEvent());
    }

    const startLoadingEvents = async () => {
        try {
            dispatch(onLoadEvents());

        } catch (error) {
            console.log(error);
            Swal.fire("Error al cargar los eventos", "No se han podido cargar los elementos", "error");
        }
    }

    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent?._id,

        //* Métodos
        quitActiveEvent,
        startDeletingEvent,
        setActiveEvent,
        startLoadingEvents,
        startSavingEvent,
    }
}


