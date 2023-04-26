import { differenceInSeconds } from "date-fns";
import { useUiStore } from "../../hooks";
import { useKanbanStore } from "../../hooks/useKanbanStore";
import { status } from "../interfaces/Status";

export const CardItem = ({ data = {}, handleDragging }) => {
  const { setActiveTask } = useKanbanStore();
  const { openKanbanModal } = useUiStore();

  const handleDragEnd = () => handleDragging(false);

  const handleDragStart = (event) => {
    event.dataTransfer.setData("text", `${data._id}`);
    handleDragging(true);
  };

  const setActive = () => {
    setActiveTask(data);
  };

  const actionOpenKanbanModal = () => {
    openKanbanModal();
  };

  return (
    <div
      className={`${
        differenceInSeconds(data.finish, new Date()) < 0
          ? "card-container-expired"
          : "card-container"
      } ${data.status === status.done && "done"}`}
      draggable
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onClick={setActive}
      onDoubleClick={actionOpenKanbanModal}
    >
      <h5>{data.title}</h5>
      {differenceInSeconds(data.finish, new Date()) < 0 && (
        <p>Esta tarea ha expirado</p>
      )}
    </div>
  );
};
