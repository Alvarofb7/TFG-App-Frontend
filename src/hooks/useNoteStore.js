import { useDispatch, useSelector } from "react-redux"
import { onAddNewNote, onDeleteNote, onSetActiveNote, onUpdateNote } from "../store";

export const useNoteStore = () => {

    const dispatch = useDispatch();
    const { isLoadingNotes, notes, activeNote } = useSelector(state => state.notes);

    const setActiveNote = (note) => {
        dispatch(onSetActiveNote(note));
    }

    const startSavingNote = (note) => {
        if (note._id) {
            note.date = new Date();
            dispatch(onUpdateNote(note));
        } else {
            note._id = new Date();
            note.date = new Date();
            dispatch(onAddNewNote(note));
        }
    }

    const startDeletingNote = () => {
        dispatch(onDeleteNote());
    }

    return {
        //* Properties
        activeNote,
        isLoadingNotes,
        notes,

        //* Methods
        setActiveNote,
        startDeletingNote,
        startSavingNote,

    }

}
