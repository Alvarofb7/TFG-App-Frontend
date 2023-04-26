import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useKanbanStore } from "../../hooks/useKanbanStore";

export const useDragAndDrop = () => {
  const { tasks } = useSelector((state) => state.kanban);
  const { updateTask } = useKanbanStore();

  useEffect(() => {
    setListItems(tasks);
  }, [tasks]);

  const [isDragging, setIsDragging] = useState(false);
  const [listItems, setListItems] = useState(tasks);

  const handleDragging = (dragging) => setIsDragging(dragging);

  const handleUpdateList = (_id, newStatus) => {
    const card = listItems.find((item) => item?._id === _id);

    if (card && card.status !== newStatus) {
      const updateCard = {
        ...card,
        status: newStatus,
      };
      updateTask(updateCard);
    }
  };

  return {
    //* Properties
    listItems,
    isDragging,

    //* Methods
    handleDragging,
    handleUpdateList,
  };
};
