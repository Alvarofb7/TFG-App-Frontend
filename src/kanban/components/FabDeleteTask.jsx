import Swal from "sweetalert2";
import { useKanbanStore } from "../../hooks/useKanbanStore";

export const FabDeleteTask = () => {
  const { hasTasksSelected, startDeleteTask } = useKanbanStore();

  const handleDelete = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
    }).then((result) => {
      if (result.isConfirmed) {
        startDeleteTask();
        Swal.fire(
          "Eliminado",
          "Tu tarea ha sido borrada correctamente.",
          "success"
        );
      }
    });
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-delete"
      onClick={handleDelete}
      style={{
        display: hasTasksSelected ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
