import { useSelector } from "react-redux";
import { SideBarNote } from "./SideBarNote";
import { useEffect } from "react";
import { useNoteStore } from "../../hooks";

export const SideBar = ({ show }) => {

    const { notes, isLoadingNotes } = useSelector(state => state.notes);
    const { startLoadingNote, setActiveNote } = useNoteStore()

    useEffect(() => {
        startLoadingNote();
    }, [])

    const handleClick = () => {
        setActiveNote({
            title: "",
            description: "",
            date: new Date(),
            user: {}
        })
    }

    return (
        <nav className="nav-list-notes" id="list" style={ { display: show } }>
            <ul className="list-notes list-group">
                <button className="btn btn-light mb-2" type="button" onClick={ handleClick }>
                    Crear nota
                </button>
                {
                    (!isLoadingNotes)
                        ? (notes.length !== 0)
                            ?
                            notes.map(note => (
                                <SideBarNote key={ note.id } { ...note } />
                            ))
                            : (
                                <li className="list-group-item card text-center mb-2 animate__animated animate__bounceIn">
                                    <div className="card-body">
                                        <p className="card-subtitle mb-2 text-body-title">Cree una nota para empezar</p>
                                    </div>
                                </li>
                            )
                        : <li className="list-group-item">Cargando notas...</li>
                }
            </ul>
        </nav>
    );
};