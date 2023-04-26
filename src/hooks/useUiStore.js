import { useDispatch, useSelector } from "react-redux";
import {
  onCloseDateCalendarModal,
  onCloseDateKanbanModal,
  onOpenDateCalendarModal,
  onOpenDateKanbanModal,
} from "../store";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateCalendarModalOpen, isKanbanModalOpen } = useSelector(
    (state) => state.ui
  );

  const openDateCalendarModal = () => {
    dispatch(onOpenDateCalendarModal());
  };

  const closeDateCalendarModal = () => {
    dispatch(onCloseDateCalendarModal());
  };

  const openKanbanModal = () => {
    dispatch(onOpenDateKanbanModal());
  };

  const closeKanbanModal = () => {
    dispatch(onCloseDateKanbanModal());
  };

  return {
    //* Propiedades
    isDateCalendarModalOpen,
    isKanbanModalOpen,

    //* Métodos
    openDateCalendarModal,
    closeDateCalendarModal,
    openKanbanModal,
    closeKanbanModal,
  };
};
