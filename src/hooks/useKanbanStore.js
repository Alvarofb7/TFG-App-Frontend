import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewTask,
  onDeleteTask,
  onQuitActiveTask,
  onSetActiveTask,
  onUpdateTask,
} from "../store";

export const useKanbanStore = () => {
  const dispatch = useDispatch();
  const { activeTask, isLoadingTasks, tasks } = useSelector(
    (state) => state.kanban
  );

  const setActiveTask = (task) => {
    dispatch(onSetActiveTask(task));
  };

  const quitActiveTask = () => {
    dispatch(onQuitActiveTask());
  };

  const startAddNewTask = (task) => {
    if (task._id) {
      dispatch(onUpdateTask(task));
    } else {
      task._id = new Date().getTime();
      dispatch(onAddNewTask(task));
    }
  };

  const updateTask = (task) => {
    dispatch(onUpdateTask(task));
  };

  const startDeleteTask = () => {
    dispatch(onDeleteTask());
  };

  return {
    //* Properties
    activeTask,
    isLoadingTasks,
    tasks,
    hasTasksSelected: !!activeTask?._id,

    //* Methods
    quitActiveTask,
    setActiveTask,
    startAddNewTask,
    startDeleteTask,
    updateTask,
  };
};
