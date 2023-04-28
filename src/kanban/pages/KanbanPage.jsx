import { DragAndDrop } from "../components";
import { TaskModal } from "../components/TaskModal";

export const KanbanPage = () => {
	return (
		<div className="container-main">
			<DragAndDrop />
			<TaskModal />
		</div>
	);
};
