import { useSelector } from "react-redux";
import { SideBarNote } from "./SideBarNote";
import { useEffect } from "react";
import { useNoteStore } from "../../hooks";

export const SideBar = () => {

    const { notes, isLoadingNotes } = useSelector(state => state.notes);
    const { startLoadingNote } = useNoteStore()

    useEffect(() => {
        startLoadingNote();
    }, [])


    return (
        <div className="row sidebar">
            <ul className="list-notes list-group">
                {
                    (!isLoadingNotes)
                        ? notes.map(note => (
                            <SideBarNote key={ note.id } { ...note } />

                        ))
                        : <li className="list-group-item">Cargando notas...</li>
                }
            </ul>
        </div>
    );
};