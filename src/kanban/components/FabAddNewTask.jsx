import { addHours } from "date-fns";
import { useUiStore } from "../../hooks";
import { useKanbanStore } from "../../hooks/useKanbanStore";
import { status } from "../interfaces/Status";

export const FabAddNewTask = () => {
  const { openKanbanModal } = useUiStore();
  const { setActiveTask } = useKanbanStore();

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

  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
