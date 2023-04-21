import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";
import { api } from "../api";
import Swal from "sweetalert2";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);

     const saveTokenToLocalStorage = async (token) => {
        localStorage.setItem("token", token);
        localStorage.setItem("token-init-date", new Date().getTime());
    }

    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await api.post("/auth", { email, password });

            await saveTokenToLocalStorage(data.token);

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response?.data?.msg || "Credenciales incorrectas"));
            Swal.fire("Error en registro", error.response?.data?.msg || "Credenciales incorrectas", "error");
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {
            const { data } = await api.post("/auth/new", { name, email, password });

            await saveTokenToLocalStorage(data.token);

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            dispatch(onLogout(error.response?.data?.msg || "Error en la creación de la cuenta"));
            Swal.fire("Error en registro", error.response?.data?.msg || "Error en la creación de la cuenta", "error");
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem("token");

        if (!token) return dispatch(onLogout());

        try {
            const { data } = await api.get("/auth/renew");

            await saveTokenToLocalStorage(data.token);

            dispatch(onLogin({ name: data.name, uid: data.uid }));
        } catch (error) {
            localStorage.clear();
            dispatch(onLogout());
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogoutCalendar());
        dispatch(onLogout());
    }

    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        checkAuthToken,
        startLogin,
        startLogout,
        startRegister,
    }
}