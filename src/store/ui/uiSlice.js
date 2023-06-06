import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
	name: "ui",
	initialState: {
		isCalendarModalOpen: false,
		isKanbanModalOpen: false,
	},
	reducers: {
		onOpenCalendarModal: (state) => {
			state.isCalendarModalOpen = true;
		},
		onCloseCalendarModal: (state) => {
			state.isCalendarModalOpen = false;
		},
		onOpenKanbanModal: (state) => {
			state.isKanbanModalOpen = true;
		},
		onCloseKanbanModal: (state) => {
			state.isKanbanModalOpen = false;
		},
		onLogoutUi: (state) => {
			state.isCalendarModalOpen = false;
			state.isKanbanModalOpen = false;
		},
	},
});

export const {
	onCloseCalendarModal,
	onCloseKanbanModal,
	onLogoutUi,
	onOpenCalendarModal,
	onOpenKanbanModal,
} = uiSlice.actions;
