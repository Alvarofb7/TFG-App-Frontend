import { useNoteStore } from "../../hooks";

export const FabAddNew = () => {

    const { setActiveNote } = useNoteStore();

    const handleClick = () => {
        setActiveNote({
            title: "",
            description: "",
            date: new Date(),   
            user: {}
        })
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={ handleClick }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
