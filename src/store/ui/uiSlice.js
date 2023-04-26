import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isDateCalendarModalOpen: false,
    isKanbanModalOpen: false,
  },
  reducers: {
    onOpenDateCalendarModal: (state) => {
      state.isDateCalendarModalOpen = true;
    },
    onCloseDateCalendarModal: (state) => {
      state.isDateCalendarModalOpen = false;
    },
    onOpenDateKanbanModal: (state) => {
      state.isKanbanModalOpen = true;
    },
    onCloseDateKanbanModal: (state) => {
      state.isKanbanModalOpen = false;
    },
  },
});

export const {
  onOpenDateKanbanModal,
  onCloseDateKanbanModal,
  onOpenDateCalendarModal,
  onCloseDateCalendarModal,
} = uiSlice.actions;
