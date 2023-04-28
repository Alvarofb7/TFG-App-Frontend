import { CardItem } from "./CardItem";
import { status } from "../interfaces";
import { useUiStore } from "../../hooks";
import { useKanbanStore } from "../../hooks/useKanbanStore";
import { addHours } from "date-fns";
import Swal from "sweetalert2";

export const ContainerCards = ({
	status: title,
	items = [],
	isDragging,
	handleDragging,
	handleUpdateList,
}) => {
	const { openKanbanModal } = useUiStore();
	const { setActiveTask, startDeleteAllTasksInDone } = useKanbanStore();

	const handleDragOver = (event) => event.preventDefault();

	const handleDrop = (event) => {
		event.preventDefault();
		const id = event.dataTransfer.getData("text");
		handleUpdateList(id, title);
		handleDragging(false);
	};

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
				console.log(resp);
				Swal.fire(
					"Eliminado",
					"Todas las tareas terminadas han sido borradas correctamente.",
					"success"
				);
			}
		});
	};

	return (
		<div
			className={`layout-cards ${isDragging ? "layout-dragging" : ""} `}
			onDragOver={handleDragOver}
			onDrop={handleDrop}
		>
			<div className="layout-cards-header">
				<p>{title}</p>
				{title === status.toDo ? (
					<button
						type="button"
						className="btn btn-primary"
						onClick={handleClick}
					>
						<i className="fa-solid fa-plus" />
					</button>
				) : title === status.done ? (
					<button
						type="button"
						className="btn btn-danger"
						onClick={handleDeleteAll}
					>
						<i className="fa-solid fa-xmark" />
					</button>
				) : (
					""
				)}
			</div>
			{items.map(
				(item) =>
					title === item?.status && (
						<CardItem
							data={item}
							key={item.id}
							handleDragging={handleDragging}
						/>
					)
			)}
		</div>
	);
};
