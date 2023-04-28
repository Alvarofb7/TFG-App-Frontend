import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext } from "react-beautiful-dnd";

import { status } from "../interfaces/Status";
import { ContainerCards } from "./ContainerCards";
import { useKanbanStore } from "../../hooks/useKanbanStore";

export const DragAndDrop = () => {
	const { startLoadingTasks, updateTask } = useKanbanStore();

	const { tasks } = useSelector((state) => state.kanban);

	useEffect(() => {
		startLoadingTasks();
	}, []);

	const handleOnDragEnd = async (result) => {
		if (!result.destination) return;
		const task = tasks.find((task) => task.id === result.draggableId);
		if (!task) return;
		const updatedTask = {
			...task,
			status: result.destination.droppableId,
		};
		await updateTask(updatedTask);
	};

	return (
		<div className="grid">
			<DragDropContext onDragEnd={handleOnDragEnd}>
				{Object.keys(status).map((containerKey) => (
					<ContainerCards
						status={status[containerKey]}
						items={tasks}
						key={containerKey}
					/>
				))}
			</DragDropContext>
		</div>
	);
};
