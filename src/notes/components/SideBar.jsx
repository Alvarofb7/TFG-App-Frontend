import { useSelector } from "react-redux";
import { SideBarNote } from "./SideBarNote";

export const SideBar = () => {

    const { notes } = useSelector(state => state.notes);

    return (
        <div className="row sidebar">
            <ul className="list-notes">
                {
                    notes.map(note => (
                        <SideBarNote key={ note._id } { ...note } />

                    ))
                }
            </ul>
        </div>
    );
};