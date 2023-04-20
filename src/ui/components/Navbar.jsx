import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../hooks";

export const Navbar = () => {

    const { user, startLogout } = useAuthStore()

    return (
        <div className="navbar navbar-expand-md navbar-dark bg-dark mb-4 px-4">
            <span className="navbar-brand">
                { user.name || "Sin nombre definido" }
            </span>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        className={ ({ isActive }) => `nav-link ${isActive ? "active" : ""}` }
                        to="/calendar"
                    >
                        <i className="fa fa-calendar-alt"></i>
                        &nbsp;
                        Calendario
                    </NavLink>

                    <NavLink
                        className={ ({ isActive }) => `nav-link ${isActive ? "active" : ""}` }
                        to="/notes"
                    >
                        <i className="fa fa-book"></i>
                        &nbsp;
                        Notas
                    </NavLink>
                    <NavLink
                        className={ ({ isActive }) => `nav-link ${isActive ? "active" : ""}` }
                        to="/kanban"
                    >
                        <i className="fa fa-list-check"></i>
                        &nbsp;
                        Kanban
                    </NavLink>
                </div>
            </div>

            <button
                className="btn btn-outline-danger"
                onClick={ startLogout }
            >
                <i className="fas fa-sign-out-alt"></i>
                &nbsp;
                <span>Salir</span>
            </button>

        </div>
    )
}
