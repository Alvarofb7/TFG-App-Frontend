import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store";

export const useAuthStore = () => {

    const dispatch = useDispatch();
    const { status, user, errorMessage } = useSelector(state => state.auth);


    const startLogin = async ({ email, password }) => {
        dispatch(onChecking());
        try {
            dispatch(onLogin ({ email, password}));
        } catch (error) {
            dispatch(onLogout("Credenciales incorrectas"));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startRegister = async ({ name, email, password }) => {
        dispatch(onChecking());
        try {

            dispatch(onLogin({ name, email, password }));
        } catch (error) {
            dispatch(onLogout("Error en la creación de la cuenta"));

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }
    }

    const startLogout = () => {
        localStorage.clear();
        dispatch(onLogout());
    }


    return {
        //* Propiedades
        errorMessage,
        status,
        user,

        //* Métodos
        startLogin,
        startLogout,
        startRegister,
    }
}