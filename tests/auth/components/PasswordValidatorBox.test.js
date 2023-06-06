import { render, screen } from "@testing-library/react";
import { PasswordValidatorBox } from "../../../src/auth/components/PasswordValidatorBox";

describe("Pruebas en el componente PasswordValidatorBox", () => {
	test("Debería de renderizar todos los elementos de validación cuando no están validados", () => {
		const { container } = render(
			<PasswordValidatorBox
				lowerValid={false}
				upperValid={false}
				lengthValid={false}
				numberValid={false}
				specialCharValid={false}
				password="invalid"
			/>
		);

		const elements = container.getElementsByClassName("not-validated");
		expect(elements.length).toBe(5);
	});

	test("Debería de renderizar todos los elementos de validación cuando están validados", () => {
		const { container } = render(
			<PasswordValidatorBox
				lowerValid={true}
				upperValid={true}
				lengthValid={true}
				numberValid={true}
				specialCharValid={true}
				password="valid"
			/>
		);

		const elements = container.getElementsByClassName("validated");
		expect(elements.length).toBe(5);
	});

	test("Debería de ocultar los elementos de validación si la contraseña está vacía", () => {
		render(
			<PasswordValidatorBox
				lowerValid={false}
				upperValid={false}
				lengthValid={false}
				numberValid={false}
				specialCharValid={false}
				password=""
			/>
		);

		const box = screen.getByLabelText("password-validation-box");
		expect(box.style.display).toBe("none");
	});
});
