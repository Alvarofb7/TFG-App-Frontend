import { useMemo } from "react";
import { useForm, useNoteStore } from "../../hooks"

export const NoteView = () => {

    const { activeNote, startSavingNote, startDeletingNote } = useNoteStore();
    const { onInputChange, _id, title, description, date, user } = useForm(activeNote);

    const onSubmit = (event) => {
        event.preventDefault();
        startSavingNote({ _id, title, description, date, user });
    }

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(newDate);
    }, [date]);

    const deleteNote = () => {
        startDeletingNote()
    }

    return (
        <div className="container note">
            <div className="row mb-3">
                <h3>{ dateString }</h3>
            </div>
            <div className="row">
                <form className="container" onSubmit={ onSubmit }>
                    <div className="form-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="note-title"
                            placeholder="Título"
                            name="title"
                            value={ title }
                            onChange={ onInputChange }
                        />
                    </div>
                    <div className="form-group mb-3">
                        <textarea
                            className="form-control"
                            id="note-description"
                            rows="8"
                            placeholder="Descripción"
                            name="description"
                            value={ description }
                            onChange={ onInputChange }
                        >
                        </textarea>
                    </div>
                    <div className="buttons">
                        <button
                            type="submit"
                            className="btn btn-outline-primary btn-block btn-submit-addNote"
                        >
                            <i className="far fa-save"></i>
                            <span> Guardar</span>
                        </button>
                        <button
                            type="button"
                            onClick={deleteNote}
                            className="btn btn-outline-danger btn-block btn-submit-deleteNote"
                        >
                            <i className="fa fa-trash"></i>
                            <span> Eliminar</span>
                        </button>
                    </div>
                </form>
            </div>


        </div>
    )
}
