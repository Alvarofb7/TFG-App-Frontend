import { useMemo } from "react";

import Swal from "sweetalert2";

import { useForm, useNoteStore } from "../../hooks";

export const NoteView = () => {
	const { activeNote, startSavingNote, startDeletingNote } = useNoteStore();

	const { onInputChange, title, description, date, formState } =
		useForm(activeNote);

	const onSubmit = (event) => {
		event.preventDefault();
		if (title.length < 1) {
			return Swal.fire("Error", "No puedes dejar el título vacío", "error");
		}
		startSavingNote(formState);
	};

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return new Intl.DateTimeFormat("es-ES", { dateStyle: "full" }).format(
			newDate
		);
	}, [date]);

	const deleteNote = () => {
		startDeletingNote();
	};

	return (
		<div className="container note">
			<div className="row mb-3">
				<h3>{dateString}</h3>
			</div>
			<div className="row">
				<form className="container" aria-label="form-note" onSubmit={onSubmit}>
					<div className="form-group mb-3">
						<input
							type="text"
							className="form-control"
							id="note-title"
							placeholder="Título"
							name="title"
							value={title}
							onChange={onInputChange}
							required
							aria-label="input-title-note"
						/>
					</div>
					<div className="form-group mb-3">
						<textarea
							className="form-control"
							id="note-description"
							rows="8"
							maxLength={500}
							placeholder="Descripción"
							name="description"
							value={description}
							onChange={onInputChange}
						></textarea>
					</div>
					<div className="buttons-notes">
						<button
							type="submit"
							className="btn btn-primary btn-block btn-submit-addNote"
						>
							<i className="far fa-save"></i>
							<span> Guardar</span>
						</button>
						{activeNote?.id && (
							<button
								type="button"
								onClick={deleteNote}
								className="btn btn-danger btn-block btn-submit-deleteNote"
							>
								<i className="fa fa-trash"></i>
								<span> Eliminar</span>
							</button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};
