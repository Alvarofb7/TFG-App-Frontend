import { DragAndDrop, FabAddNewTask, FabDeleteTask } from "../components";
import { TaskModal } from "../components/TaskModal";

export const KanbanPage = () => {
  return (
    <div className="container-main flex">
      <DragAndDrop />
      <TaskModal />
      <FabAddNewTask />
      <FabDeleteTask />
    </div>
  );
};
