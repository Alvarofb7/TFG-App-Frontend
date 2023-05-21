import { useSelector } from "react-redux";
import { SideBarNote } from "./SideBarNote";
import { useEffect } from "react";
import { useNoteStore } from "../../hooks";

export const SideBar = ({ show }) => {
	const { notes, isLoadingNotes } = useSelector((state) => state.notes);
	const { startLoadingNote, setActiveNote } = useNoteStore();

	useEffect(() => {
		startLoadingNote();
	}, []);

	const handleClick = () => {
		setActiveNote({
			title: "",
			description: "",
			date: new Date(),
			user: {},
		});
	};

	return (
		<nav className="nav-list-notes" id="list" style={{ display: show }}>
			<ul className="list-notes list-group">
				<button
					className="btn btn-light mb-2"
					type="button"
					onClick={handleClick}
				>
					Crear nota
				</button>
				{!isLoadingNotes ? (
					notes.map((note) => <SideBarNote key={note.id} {...note} />)
				) : (
					<li className="list-group-item">Cargando notas...</li>
				)}
			</ul>
		</nav>
	);
};
