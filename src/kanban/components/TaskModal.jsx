import { useState, useMemo, useEffect } from "react";
import Modal from "react-modal";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";

import Swal from "sweetalert2";

import { status } from "../interfaces/Status";
import { useUiStore, useKanbanStore } from "../../hooks";
import { getEnvVariables } from "../../helpers";

registerLocale("es", es);

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

if (getEnvVariables().VITE_MODE !== "test") {
	Modal.setAppElement("#root");
}

export const TaskModal = () => {
	const { isKanbanModalOpen, closeKanbanModal } = useUiStore();

	const { activeTask, startAddNewTask, quitActiveTask } = useKanbanStore();

	const [formSubmitted, setFormSubmitted] = useState(false);

	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
		status: status.toDo,
		finish: addHours(new Date(), 2),
		user: {},
	});

	useEffect(() => {
		if (activeTask) {
			setFormValues({
				...activeTask,
			});
		}
	}, [activeTask]);

	const titleClass = useMemo(() => {
		if (!formSubmitted) return "";

		return formValues.title.length <= 0 && "is-invalid";
	}, [formValues.title, formSubmitted]);

	const onInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const onDateChanged = (event, changing) => {
		setFormValues({
			...formValues,
			[changing]: event,
		});
	};

	const onSelectChanged = ({ target }) => {
		setFormValues({
			...formValues,
			status: target.value,
		});
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);

		if (!Object.values(status).includes(formValues.status)) {
			Swal.fire("Error", "Ese estado no está definido", "error");
		}
		const difference = differenceInSeconds(formValues.finish, new Date());
		if (isNaN(difference) || difference <= 0) {
			Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
			return;
		}
		if (formValues.title.length <= 0) return;
		// Guardar tarea
		startAddNewTask(formValues);
		// Cerrar modal
		closeKanbanModal();
		// Limpiamos errores
		setFormSubmitted(false);
	};

	const onCloseModal = () => {
		closeKanbanModal();
		quitActiveTask();
	};

	return (
		<Modal
			isOpen={isKanbanModalOpen}
			onRequestClose={onCloseModal}
			className="modal"
			style={customStyles}
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			{formValues?.id ? <h1>Editar Tarea</h1> : <h1>Nueva Tarea</h1>}

			<hr />
			<form className="container" aria-label="form-task" onSubmit={onSubmit}>
				<div className="form-group mb-2">
					<label>Estado</label>
					<select
						onChange={onSelectChanged}
						className="form-select form-select-sm"
						value={formValues.status}
						required
					>
						{Object.keys(status).map((keyStatus) => (
							<option key={keyStatus} value={status[keyStatus]}>
								{status[keyStatus]}
							</option>
						))}
					</select>
				</div>
				<hr />
				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker
						selected={formValues.finish}
						className="form-control"
						dateFormat="Pp"
						showTimeSelect
						locale="es"
						timeCaption="Hora"
						onChange={(event) => onDateChanged(event, "finish")}
						required
					/>
				</div>
				<hr />
				<div className="form-group mb-2">
					<label>Título</label>
					<input
						type="text"
						className={`form-control ${titleClass}`}
						placeholder="Título"
						name="title"
						autoComplete="false"
						value={formValues.title}
						onChange={onInputChange}
						aria-label="title"
						required
					/>
				</div>
				<div className="form-group mb-2">
					<label>Descripción tarea</label>
					<textarea
						type="text"
						className="form-control"
						placeholder="Descripción de la tarea"
						rows={4}
						maxLength={200}
						name="description"
						autoComplete="false"
						value={formValues.description}
						onChange={onInputChange}
					/>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block btn-submit-modal mt-2"
				>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
		</Modal>
	);
};
