import { differenceInSeconds } from "date-fns";
import { useUiStore } from "../../hooks";
import { useKanbanStore } from "../../hooks/useKanbanStore";
import { status } from "../interfaces/Status";
import { useMemo } from "react";

export const CardItem = ({ data = {}, handleDragging }) => {
	const { setActiveTask, startDeleteTask } = useKanbanStore();
	const { openKanbanModal } = useUiStore();

	const handleDragEnd = () => handleDragging(false);

	const handleDragStart = (event) => {
		event.dataTransfer.setData("text", `${data.id}`);
		handleDragging(true);
	};

	const actionOpenKanbanModal = () => {
		setActiveTask(data);
		openKanbanModal();
	};

	const handleDeleteTask = (event) => {
		event.stopPropagation();
		startDeleteTask(data.id);
	};

	const newTitle = useMemo(() => {
		return data.title.length > 20
			? data.title.substring(0, 20).concat("...")
			: data.title;
	}, [data.title]);

	return (
		<div
			className={`${
				differenceInSeconds(data.finish, new Date()) < 0
					? "card-container-expired"
					: "card-container"
			}`}
			draggable
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			onClick={actionOpenKanbanModal}
		>
			<div className={`card-title ${data.status === status.done && "done"}`}>
				<h5>{newTitle}</h5>
				<button
					type="button"
					className="btn btn-danger"
					onClick={handleDeleteTask}
				>
					<i className="fa-solid fa-xmark" />
				</button>
			</div>
			{differenceInSeconds(data.finish, new Date()) < 0 && (
				<p>Esta tarea ha expirado</p>
			)}
		</div>
	);
};
