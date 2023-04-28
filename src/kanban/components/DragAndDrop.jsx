import { useSelector } from "react-redux";
import { status } from "../interfaces/Status";
import { ContainerCards } from "./ContainerCards";
import { useDragAndDrop } from "../hooks";
import { useEffect } from "react";
import { useKanbanStore } from "../../hooks/useKanbanStore";

export const DragAndDrop = () => {
	const { startLoadingTasks } = useKanbanStore();
	const { tasks } = useSelector((state) => state.kanban);

	useEffect(() => {
		startLoadingTasks();
	}, []);

	const { listItems, isDragging, handleDragging, handleUpdateList } =
		useDragAndDrop(tasks);

	return (
		<div className="grid">
			{Object.keys(status).map((containerKey) => (
				<ContainerCards
					status={status[containerKey]}
					items={listItems}
					key={containerKey}
					isDragging={isDragging}
					handleDragging={handleDragging}
					handleUpdateList={handleUpdateList}
				/>
			))}
		</div>
	);
};
