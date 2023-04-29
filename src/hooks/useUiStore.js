import { useDispatch, useSelector } from "react-redux";
import {
	onOpenCalendarModal,
	onCloseCalendarModal,
	onOpenKanbanModal,
	onCloseKanbanModal,
} from "../store";

export const useUiStore = () => {
	const dispatch = useDispatch();
	const { isCalendarModalOpen, isKanbanModalOpen } = useSelector(
		(state) => state.ui
	);

	const openCalendarModal = () => {
		dispatch(onOpenCalendarModal());
	};

	const closeCalendarModal = () => {
		dispatch(onCloseCalendarModal());
	};

	const openKanbanModal = () => {
		dispatch(onOpenKanbanModal());
	};

	const closeKanbanModal = () => {
		dispatch(onCloseKanbanModal());
	};

	return {
		//* Propiedades
		isCalendarModalOpen,
		isKanbanModalOpen,

		//* Métodos
		openCalendarModal,
		closeCalendarModal,
		openKanbanModal,
		closeKanbanModal,
	};
};
