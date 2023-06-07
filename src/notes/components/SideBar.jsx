import { useEffect } from "react";
import { useSelector } from "react-redux";

import { useNoteStore } from "../../hooks";
import { RenderNotes } from "./RenderNotes";

export const SideBar = ({ show }) => {
	const { notes, isLoadingNotes } = useSelector((state) => state.notes);
	const { startLoadingNote, setActiveNewNote } = useNoteStore();

	useEffect(() => {
		startLoadingNote();
	}, []);

	const handleClick = () => {
		setActiveNewNote();
	};

	return (
		<nav
			className="nav-list-notes"
			id="list"
			style={{ display: show }}
			aria-label="sideBar"
		>
			<div className="list-note-button">
				<button
					className="btn btn-create-note"
					type="button"
					onClick={handleClick}
					aria-label="btn-add-new-note"
				>
					Crear nota
				</button>
			</div>
			<ul className="list-notes list-group">
				{!isLoadingNotes ? (
					<RenderNotes notes={notes} />
				) : (
					<li className="list-group-item">Cargando notas...</li>
				)}
			</ul>
		</nav>
	);
};
