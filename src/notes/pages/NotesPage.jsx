import { useSelector } from "react-redux";
import { NotesLayout } from "../layout/NotesLayout";
import { NoteView } from "../views/NoteView";
import { NotSelectedNoteView } from "../views/NotSelectedNoteView";
import { FabAddNew } from "../components/FabAddNew";

export const NotesPage = () => {

    const { activeNote } = useSelector(state => state.notes);

    return (
        <NotesLayout>
            {
                (!!activeNote)
                    ? <NoteView />
                    : <NotSelectedNoteView />
            }
            <FabAddNew />

        </NotesLayout>
    )
}
