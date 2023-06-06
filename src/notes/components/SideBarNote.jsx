import { useMemo } from "react";

import { useNoteStore } from "../../hooks";

export const SideBarNote = ({
	title = "",
	id,
	description = "",
	date = new Date(),
	user = {},
}) => {
	const { activeNote, setActiveNote, setActiveNewNote } = useNoteStore();

	const setNote = () => {
		if (activeNote?.id === id) {
			setActiveNewNote();
		} else {
			setActiveNote({ id, title, description, date, user });
		}
	};

	const newTitle = useMemo(() => {
		return title.length > 15 ? title.substring(0, 15).concat("...") : title;
	}, [title]);

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return new Intl.DateTimeFormat("es-ES", { dateStyle: "medium" }).format(
			newDate
		);
	}, [date]);

	return (
		<li
			className="list-group-item mb-1 text-center"
			key={id}
			id={id}
			onClick={setNote}
      aria-label={`note-${id}`}
		>
			<div className="card-body">
				<p className="card-text">
					<b>{newTitle}</b> - {dateString}
				</p>
			</div>
		</li>
	);
};
