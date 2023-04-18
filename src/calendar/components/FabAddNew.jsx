import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClick = () => {
        setActiveEvent({
            title: "",
            notes: "",
            allDay: false,
            start: new Date(),
            end: addHours(new Date(), 2),
            user: {
                _id: "123",
                name: "Alvaro"
            }
        })
        openDateModal();
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
