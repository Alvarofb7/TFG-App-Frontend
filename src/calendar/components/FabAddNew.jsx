import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks";

export const FabAddNew = () => {
	const { openCalendarModal } = useUiStore();
	const { setActiveEvent } = useCalendarStore();

	const handleClick = () => {
		setActiveEvent({
			title: "",
			notes: "",
			allDay: false,
			start: new Date(),
			end: addHours(new Date(), 2),
			user: {},
		});
		openCalendarModal();
	};

	return (
		<button
			type="button"
			className="btn btn-primary fab"
			aria-label="btn-add-event"
			onClick={handleClick}
		>
			<i className="fas fa-plus"></i>
		</button>
	);
};
