import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {

    const { openDateCalendarModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClick = () => {
        setActiveEvent({
            title: "",
            notes: "",
            allDay: false,
            start: new Date(),
            end: addHours(new Date(), 2),
            user: {}
        })
        openDateCalendarModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClick }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
