export const CalendarEvent = ({ event }) => {
	const { title, notes } = event;

	return (
		<span>
			<strong>{title}</strong> {notes && <span>- {notes}</span>}{" "}
		</span>
	);
};
