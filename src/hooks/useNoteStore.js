import { useDispatch, useSelector } from "react-redux"
import { onAddNewNote, onDeleteNote, onSetActiveNote, onSetNotes, onUpdateNote } from "../store";
import { api } from "../api";
import { convertNotesToDateNotes } from "../helpers";
import Swal from "sweetalert2";

export const useNoteStore = () => {

    const dispatch = useDispatch();
    const { isLoadingNotes, notes, activeNote } = useSelector(state => state.notes);
    const { user } = useSelector(state => state.auth);

    const setActiveNote = (note) => {
        dispatch(onSetActiveNote(note));
    }

    const startLoadingNote = async () => {
        try {
            const { data } = await api.get("/notes");
            const notes = convertNotesToDateNotes(data.notes);

            dispatch(onSetNotes(notes));

        } catch (error) {
            console.log(error);
            Swal.fire("Error al cargar las notas", "No se han podido cargar los elementos", "error");
        }
    }

    const startSavingNote = async (note) => {
        try {
            if (note.id) {
                // Actualizamos la fecha con la última modificación
                note.date = new Date();

                // Actualizando
                await api.put(`/notes/${note.id}`, note);

                dispatch(onUpdateNote({ ...note }));
            } else {
                // Creando
                const { data } = await api.post("/notes", note);

                dispatch(onAddNewNote({ ...note, id: data.note.id, user }));
            }
        } catch (error) {
            console.log(error);
            Swal.fire("Error al guardar", error.response?.data?.msg || "No se ha podido crear/actualizar la nota", "error");
        }
    }

    const startDeletingNote = async () => {
        try {
            await api.delete(`/notes/${activeNote.id}`);

            dispatch(onDeleteNote());
        } catch (error) {
            console.log(error);
            Swal.fire("Error al eliminar", error.response.data?.msg || "No se ha podido eliminar la nota", "error");
        }
    }

    return {
        //* Properties
        activeNote,
        isLoadingNotes,
        notes,

        //* Methods
        setActiveNote,
        startDeletingNote,
        startLoadingNote,
        startSavingNote,

    }

}
