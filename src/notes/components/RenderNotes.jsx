import { SideBarNote } from "./SideBarNote";

export const RenderNotes = ({ notes = [] }) => {
	return notes.length !== 0 ? (
		notes.map((note) => <SideBarNote key={note.id} {...note} />)
	) : (
		<li className="list-group-item mb-1 text-center">
			<div className="card-body">
				<p className="card-text">Cree una nota para empezar</p>
			</div>
		</li>
	);
};
