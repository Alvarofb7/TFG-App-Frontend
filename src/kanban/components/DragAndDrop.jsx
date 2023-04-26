import { useSelector } from "react-redux";
import { status } from "../interfaces/Status";
import { ContainerCards } from "./ContainerCards";
import { useDragAndDrop } from "../hooks";

export const DragAndDrop = () => {
  const { tasks } = useSelector((state) => state.kanban);

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
