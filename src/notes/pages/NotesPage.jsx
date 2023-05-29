import { NotesLayout } from "../layout/NotesLayout";
import { NoteView } from "../views/NoteView";

export const NotesPage = () => {
	return (
		<NotesLayout>
			{/* {!!activeNote ? <NoteView /> : <NotSelectedNoteView />} */}
			<NoteView />
		</NotesLayout>
	);
};
