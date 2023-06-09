import { useMemo, useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { addHours, differenceInSeconds } from "date-fns";
import es from "date-fns/locale/es";

import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import { useCalendarStore, useUiStore } from "../../hooks";
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

export const CalendarModal = () => {
	const { quitActiveEvent, activeEvent, startSavingEvent, startDeletingEvent } =
		useCalendarStore();
	const { isCalendarModalOpen, closeCalendarModal } = useUiStore();

	const [checked, setChecked] = useState(false);
	const [formSubmitted, setFormSubmitted] = useState(false);

	const [formValues, setFormValues] = useState({
		title: "",
		notes: "",
		start: new Date(),
		end: addHours(new Date(), 2),
	});

	const titleClass = useMemo(() => {
		if (!formSubmitted) return "";

		return formValues.title.length <= 0 && "is-invalid";
	}, [formValues.title, formSubmitted]);

	useEffect(() => {
		if (activeEvent) {
			setFormValues({ ...activeEvent });
			setChecked(activeEvent.allDay);
		}
	}, [activeEvent]);

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

	const onCheckChange = () => {
		setChecked(!checked);
	};

	const onCloseModal = () => {
		closeCalendarModal();
		quitActiveEvent();
	};

	const handleDelete = () => {
		// Borramos nota
		startDeletingEvent();
		// Cerramos modal
		closeCalendarModal();
		// Limpiamos errores
		setFormSubmitted(false);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmitted(true);

		const difference = differenceInSeconds(formValues.end, formValues.start);
		if (isNaN(difference) || difference <= 0) {
			Swal.fire("Fechas incorrectas", "Revisar las fechas ingresadas", "error");
			return;
		}

		if (formValues.title.length <= 0) return;

		formValues.allDay = checked;
		// Guardar nota
		startSavingEvent(formValues);
		// Cerramos modal
		closeCalendarModal();
		// Limpiamos errores
		setFormSubmitted(false);
	};

	return (
		<Modal
			isOpen={isCalendarModalOpen}
			onRequestClose={onCloseModal}
			style={customStyles}
			className="modal"
			overlayClassName="modal-fondo"
			closeTimeoutMS={200}
		>
			{formValues?.id ? <h1>Editar Evento</h1> : <h1>Nuevo Evento</h1>}
			<hr />
			<form className="container" aria-label="form-event" onSubmit={onSubmit}>
				<div className="form-group mb-2">
					<label>Fecha y hora inicio</label>
					<DatePicker
						selected={formValues.start}
						className="form-control"
						onChange={(event) => onDateChanged(event, "start")}
						dateFormat="Pp"
						showTimeSelect
						disabled={checked}
						locale="es"
						timeCaption="Hora"
						required
					/>
				</div>

				<div className="form-group mb-2">
					<label>Fecha y hora fin</label>
					<DatePicker
						minDate={formValues.start}
						selected={formValues.end}
						className="form-control"
						onChange={(event) => onDateChanged(event, "end")}
						dateFormat="Pp"
						showTimeSelect
						disabled={checked}
						locale="es"
						timeCaption="Hora"
						required
					/>
				</div>

				<hr />
				<div className="form-group mb-2">
					<label>Titulo y notas</label>
					<input
						type="text"
						className={`form-control ${titleClass}`}
						placeholder="Título del evento"
						name="title"
						autoComplete="off"
						value={formValues.title}
						onChange={onInputChange}
						required
						aria-label="title"
					/>
				</div>

				<div className="form-group mb-2">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notas"
						rows="5"
						name="notes"
						maxLength={100}
						value={formValues.notes}
						onChange={onInputChange}
					></textarea>
				</div>

				<div className="form-check mb-3">
					<label className="form-check-label">¿Todo el día?</label>
					<input
						type="checkbox"
						className="form-check-input"
						checked={checked}
						onChange={onCheckChange}
					/>
				</div>
				<div className="action-button">
					<button
						type="submit"
						className="btn btn-outline-primary btn-block btn-submit-modal"
					>
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
					{activeEvent?.id && (
						<button
							type="button"
							className="btn btn-outline-danger btn-block btn-submit-modal"
							onClick={handleDelete}
							aria-label="btn-delete-event"
						>
							<i className="fa fa-trash"></i>
							<span> Eliminar</span>
						</button>
					)}
				</div>
			</form>
		</Modal>
	);
};
