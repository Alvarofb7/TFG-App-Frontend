import { render, fireEvent, screen } from "@testing-library/react";
import { LoginPage } from "../../../src/auth/pages/LoginPage";

jest.mock("../../../src/hooks/useAuthStore");
jest.mock("../../../src/hooks/useForm");

const mockStartLogin = jest.fn();
const mockStartRegister = jest.fn();

jest.mock("../../../src/hooks", () => ({
	useForm: () => ({
		loginEmail: "test@test.com",
		loginPassword: "password",
		registerName: "Test User",
		registerEmail: "test@test.com",
		registerPassword: "Password123!",
		registerPassword2: "Password123!",
		onLoginInputChange: jest.fn(),
		onRegisterInputChange: jest.fn(),
		onRegisterPasswordValidation: jest.fn(),
		registerLowerValidated: true,
		registerUpperValidated: true,
		registerLengthValidated: true,
		registerNumberValidated: true,
		registerSpecialCharValidated: true,
	}),
	useAuthStore: () => ({
		startLogin: mockStartLogin,
		startRegister: mockStartRegister,
	}),
}));

describe("LoginPage", () => {
	beforeEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test("Se deben renderizar correctamente los campos del formulario de inicio de sesión y registro", () => {
		render(<LoginPage />);

		const loginButton = screen.getByLabelText("btn-login");
		const registerButton = screen.getByLabelText("btn-create-account");

		expect(screen.getByPlaceholderText("Nombre")).toBeInTheDocument();
		expect(loginButton).toBeInTheDocument();
		expect(registerButton).toBeInTheDocument();
		expect(
			screen.getByPlaceholderText("Repita la contraseña")
		).toBeInTheDocument();
	});

	test("El botón de inicio de sesión debe activar la función de inicio de sesión al hacer clic", () => {
		render(<LoginPage />);

		const loginButton = screen.getByLabelText("btn-login");

		fireEvent.click(loginButton);
		expect(mockStartLogin).toHaveBeenCalled();
	});

	test("El botón de registro debe activar la función de registro al hacer clic", () => {
		render(<LoginPage />);

		const registerButton = screen.getByLabelText("btn-create-account");

		fireEvent.click(registerButton);
		expect(mockStartRegister).toHaveBeenCalled();
	});
});
