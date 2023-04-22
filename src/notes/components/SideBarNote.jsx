import { useEffect, useMemo, useState } from "react"
import { useNoteStore } from "../../hooks";

export const SideBarNote = ({ title = "", id, description = "", date, user = {} }) => {

    const { activeNote, setActiveNote, clearActiveNote } = useNoteStore();

    const newTitle = useMemo(() => {
        return title.length > 15
            ? title.substring(0, 15).concat("...")
            : title
    }, [title]);

    const newDescription = useMemo(() => {
        return description.length > 15
            ? description.substring(0, 15).concat("...")
            : description
    }, [description]);

    const setNote = () => {
        if (activeNote?.id === id) {
            clearActiveNote()
        } else {
            setActiveNote({ id, title, description, date, user });
        }
    };

    return (
        <li className="list-group-item card text-center mb-2" key={ id } id={ id } onClick={ setNote }>
            <div className="card-header">
                <p className="card-title">{ newTitle }</p>
            </div>
            <div className="card-body">
                <p className="card-subtitle mb-2 text-body-secondary">{ newDescription }</p>
            </div>
        </li>
    )
}
