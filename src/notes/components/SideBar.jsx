import { useEffect } from "react";
import { useSelector } from "react-redux";

import { SideBarNote } from "./SideBarNote";
import { useNoteStore } from "../../hooks";

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
		<nav className="nav-list-notes" id="list" style={{ display: show }}>
			<div className="list-note-button">
				<button
					className="btn btn-create-note"
					type="button"
					onClick={handleClick}
				>
					Crear nota
				</button>
			</div>
			<ul className="list-notes list-group">
				{!isLoadingNotes ? (
					notes.length !== 0 ? (
						notes.map((note) => <SideBarNote key={note.id} {...note} />)
					) : (
						<li className="list-group-item mb-1 text-center">
							<div className="card-body">
								<p className="card-text">Cree una nota para empezar</p>
							</div>
						</li>
					)
				) : (
					<li className="list-group-item">Cargando notas...</li>
				)}
			</ul>
		</nav>
	);
};
