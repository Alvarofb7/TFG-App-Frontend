import { useState } from "react";
import Swal from "sweetalert2";

import { useAuthStore, useForm } from "../../hooks";
import { HomePage } from "../layout/HomePage";

import "./LoginPage.css";
import { PasswordValidatorBox } from "../components/PasswordValidatorBox";

const loginFormFields = {
	loginEmail: "",
	loginPassword: "",
};

const registerFormFields = {
	registerName: "",
	registerEmail: "",
	registerPassword: "",
	registerPassword2: "",
};

export const LoginPage = () => {
	const {
		loginEmail,
		loginPassword,
		onInputChange: onLoginInputChange,
	} = useForm(loginFormFields);

	const {
		registerName,
		registerEmail,
		registerPassword,
		registerPassword2,
		onInputChange: onRegisterInputChange,
		onPasswordValidation: onRegisterPasswordValidation,
		lowerValidated: registerLowerValidated,
		upperValidated: registerUpperValidated,
		lengthValidated: registerLengthValidated,
		numberValidated: registerNumberValidated,
		specialCharValidated: registerSpecialCharValidated,
	} = useForm(registerFormFields);

	const { startLogin, startRegister } = useAuthStore();

	const loginSubmit = (event) => {
		event.preventDefault();
		startLogin({ email: loginEmail, password: loginPassword });
	};

	const registerSubmit = (event) => {
		event.preventDefault();

		if (registerPassword !== registerPassword2) {
			return Swal.fire(
				"Error en registro",
				"Contraseñas no son iguales",
				"error"
			);
		}
		startRegister({
			name: registerName,
			email: registerEmail,
			password: registerPassword,
		});
	};

	const [shownLogin, setShownLogin] = useState(false);
	const switchShownLogin = () => setShownLogin(!shownLogin);

	const [shownRegister, setShownRegister] = useState(false);
	const switchShownRegister = () => setShownRegister(!shownRegister);

	return (
		<HomePage>
			<div className="container login-container">
				<div className="row login-row">
					<div className="col-md-6 login-form-1">
						<h3>Ingreso</h3>
						<form onSubmit={loginSubmit}>
							<div className="form-group mb-2">
								<input
									type="text"
									className="form-control"
									placeholder="Correo"
									name="loginEmail"
									value={loginEmail}
									onChange={onLoginInputChange}
									required
								/>
							</div>
							<div className="form-group mb-2 password-input-login">
								<input
									type={shownLogin ? "text" : "password"}
									className="form-control"
									placeholder="Contraseña"
									name="loginPassword"
									value={loginPassword}
									onChange={onLoginInputChange}
									required
								/>
								<button
									type="button"
									className="btn btn-outline-primary btn-password-login"
									onClick={switchShownLogin}
								>
									{shownLogin ? (
										<i className="fa-regular fa-eye-slash"></i>
									) : (
										<i className="fa-regular fa-eye"></i>
									)}
								</button>
							</div>
							<div className="d-grid gap-2">
								<button
									className="btn btn-light btnSubmit"
									aria-label="btn-login"
									type="submit"
								>
									Login
								</button>
							</div>
						</form>
					</div>

					<div className="col-md-6 login-form-2">
						<h3>Registro</h3>
						<form onSubmit={registerSubmit}>
							<div className="form-group mb-2">
								<input
									type="text"
									className="form-control"
									placeholder="Nombre"
									name="registerName"
									value={registerName}
									onChange={onRegisterInputChange}
									required
								/>
							</div>
							<div className="form-group mb-2">
								<input
									type="email"
									className="form-control"
									placeholder="Correo"
									name="registerEmail"
									value={registerEmail}
									onChange={onRegisterInputChange}
									required
								/>
							</div>
							<div className="form-group mb-2 password-input-register">
								<div className="password-register">
									<input
										type={shownRegister ? "text" : "password"}
										className="form-control"
										placeholder="Contraseña"
										name="registerPassword"
										value={registerPassword}
										onChange={onRegisterPasswordValidation}
										required
									/>

									<button
										type="button"
										className="btn btn-outline-light btn-password-register"
										onClick={switchShownRegister}
									>
										{shownRegister ? (
											<i className="fa-regular fa-eye-slash"></i>
										) : (
											<i className="fa-regular fa-eye"></i>
										)}
									</button>
								</div>
								<PasswordValidatorBox
									lowerValid={registerLowerValidated}
									upperValid={registerUpperValidated}
									lengthValid={registerLengthValidated}
									numberValid={registerNumberValidated}
									specialCharValid={registerSpecialCharValidated}
									password={registerPassword}
								/>
							</div>
							<div className="form-group mb-2">
								<input
									type="password"
									className="form-control"
									placeholder="Repita la contraseña"
									name="registerPassword2"
									value={registerPassword2}
									onChange={onRegisterInputChange}
									required
								/>
							</div>

							<div className="d-grid gap-2">
								<button
									className="btn btn-light btnSubmit"
									aria-label="btn-create-account"
									type="submit"
								>
									Crear cuenta
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</HomePage>
	);
};
