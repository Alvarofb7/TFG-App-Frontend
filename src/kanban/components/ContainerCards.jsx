import { Droppable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import { addHours } from "date-fns";

import { CardItem } from "./CardItem";
import { status } from "../interfaces";
import { useUiStore } from "../../hooks";
import { useKanbanStore } from "../../hooks/useKanbanStore";

export const ContainerCards = ({ status: title, items = [] }) => {
	const { openKanbanModal } = useUiStore();
	const { setActiveTask, startDeleteAllTasksInDone } = useKanbanStore();

	const handleClick = () => {
		setActiveTask({
			title: "",
			description: "",
			status: status.toDo,
			finish: addHours(new Date(), 2),
			user: {},
		});
		openKanbanModal();
	};

	const handleDeleteAll = () => {
		Swal.fire({
			title: "¿Estás seguro?",
			text: "No podrás revertir esta acción",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirmar",
		}).then((result) => {
			if (result.isConfirmed) {
				startDeleteAllTasksInDone();
				Swal.fire(
					"Eliminado",
					"Todas las tareas terminadas han sido borradas correctamente.",
					"success"
				);
			}
		});
	};

	const renderButton = () => {
		if (title === status.toDo) {
			return (
				<button
					type="button"
					className="btn btn-primary"
					aria-label="btn-add-task"
					onClick={handleClick}
				>
					<i className="fa-solid fa-plus" />
				</button>
			);
		} else if (title === status.done) {
			return (
				<button
					type="button"
					className="btn btn-danger"
					onClick={handleDeleteAll}
					aria-label="btn-delete-all-task-done"
				>
					<i className="fa-solid fa-xmark" />
				</button>
			);
		} else {
			return null;
		}
	};

	return (
		<Droppable droppableId={title}>
			{(provided) => (
				<div
					className="layout-cards"
					layout-cards="layout-cards"
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className="layout-cards-header">
						<p>{title}</p>
						{renderButton()}
					</div>
					{items.map(
						(item, index) =>
							title === item?.status && (
								<CardItem data={item} key={item.id} index={index} />
							)
					)}
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};
