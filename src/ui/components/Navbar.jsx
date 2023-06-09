import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../../hooks";

export const Navbar = () => {
	const { status, startLogout } = useAuthStore();

	const [isNavCollapsed, setIsNavCollapsed] = useState(true);

	const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

	return (
		<div
			className="navbar navbar-expand-sm navbar-dark bg-dark px-4"
			style={{ display: status === "authenticated" ? "" : "none" }}
		>
			<img src="/img/Logo.png" className="navbar-logo" alt="Logo app" />
			<button
				className="custom-toggler navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarFeatures"
				aria-controls="navbarFeatures"
				aria-expanded={!isNavCollapsed ? true : false}
				aria-label="Toggle navigation"
				onClick={handleNavCollapse}
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div
				className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
				id="navbarFeatures"
			>
				<div className="navbar-nav">
					<NavLink
						className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
						to="/calendar"
					>
						<i className="fa fa-calendar-alt"></i>
						&nbsp; Calendario
					</NavLink>

					<NavLink
						className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
						to="/notes"
					>
						<i className="fa fa-book"></i>
						&nbsp; Notas
					</NavLink>
					<NavLink
						className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
						to="/kanban"
					>
						<i className="fa fa-list-check"></i>
						&nbsp; Kanban
					</NavLink>
				</div>
				<button className="btn btn-outline-danger" onClick={startLogout}>
					<i className="fas fa-sign-out-alt"></i>
					&nbsp;
					<span>Salir</span>
				</button>
			</div>
		</div>
	);
};
