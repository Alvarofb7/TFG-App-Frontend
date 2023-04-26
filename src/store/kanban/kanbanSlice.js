import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { status } from "../../kanban/interfaces/Status";

const tempTask = {
  _id: new Date().getTime(),
  title: "Prueba titulo",
  description: "Prueba descripcion",
  status: status.inPogress,
  finish: addHours(new Date(), 2),
  user: {
    _id: "ABC",
    name: "Alvaro",
  },
};

export const kanbanSlice = createSlice({
  name: "kanban",
  initialState: {
    activeTask: null,
    isLoadingTasks: true,
    tasks: [tempTask],
  },
  reducers: {
    onSetTaks: (state, { payload }) => {
      state.tasks = payload;
      state.isLoadingTasks = false;
    },
    onSetActiveTask: (state, { payload }) => {
      state.activeTask = payload;
    },
    onQuitActiveTask: (state) => {
      state.activeTask = null;
    },
    onAddNewTask: (state, { payload }) => {
      state.tasks.push(payload);
    },
    onUpdateTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task._id === payload._id) {
          return payload;
        }
        return task;
      });
    },
    onDeleteTask: (state) => {
      if (state.activeTask) {
        state.tasks = state.tasks.map((task) => {
          if (task._id !== state.activeTask._id) {
            return task;
          }
        });
      }
    },
  },
});

export const {
  onAddNewTask,
  onDeleteTask,
  onQuitActiveTask,
  onSetActiveTask,
  onSetTaks,
  onUpdateTask,
} = kanbanSlice.actions;
