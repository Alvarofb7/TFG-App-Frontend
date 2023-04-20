import { useMemo } from "react"
import { useNoteStore } from "../../hooks";

export const SideBarNote = ({ title = "", _id, description = "", date, user = {} }) => {

    const { setActiveNote } = useNoteStore();

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

        setActiveNote({ _id, title, description, date, user });
    };

    return (
        <li className="card text-center mb-2" key={ _id } onClick={ setNote }>
            <div className="card-header">
                <p className="card-title">{ newTitle }</p>
            </div>
            <div className="card-body">
                <p className="card-subtitle mb-2 text-body-secondary">{ newDescription }</p>
            </div>
        </li>
    )
}
