import { useMemo } from "react";
import { Draggable } from "react-beautiful-dnd";
import { differenceInSeconds } from "date-fns";

import { useUiStore } from "../../hooks";
import { useKanbanStore } from "../../hooks/useKanbanStore";
import { status } from "../interfaces/Status";

export const CardItem = ({ data = {}, index }) => {
	const { setActiveTask, startDeleteTask } = useKanbanStore();
	const { openKanbanModal } = useUiStore();

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
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					className={`${
						differenceInSeconds(data.finish, new Date()) < 0
							? "card-container-expired"
							: "card-container"
					}`}
					onClick={actionOpenKanbanModal}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
				>
					<div
						className={`card-title ${data.status === status.done && "done"}`}
					>
						<h5>{newTitle}</h5>
						<button
							type="button"
							className="btn btn-danger"
              aria-label="btn-delete-task"
							onClick={handleDeleteTask}
						>
							<i className="fa-solid fa-xmark" />
						</button>
					</div>
					{differenceInSeconds(data.finish, new Date()) < 0 && (
						<p>Esta tarea ha expirado</p>
					)}
				</div>
			)}
		</Draggable>
	);
};
