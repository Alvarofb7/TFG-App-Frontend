import { act, renderHook } from "@testing-library/react";
import { useForm } from "../../src/hooks/useForm";

describe("Pruebas en el hook useForm", () => {
	let initialForm;

	beforeEach(() => {
		initialForm = { name: "", password: "" };
	});

	test("Debe de cambiar el estado cuando se llama onInputChange ", () => {
		const { result } = renderHook(() => useForm(initialForm));
		act(() => {
			result.current.onInputChange({
				target: { name: "name", value: "Test Name" },
			});
		});
		expect(result.current.formState.name).toBe("Test Name");
	});

	test("Debe de validar la contraseña cuando se llama a onPasswordValidation ", () => {
		const { result } = renderHook(() => useForm(initialForm));
		act(() => {
			result.current.onPasswordValidation({
				target: { name: "password", value: "Password123!" },
			});
		});
		expect(result.current.lowerValidated).toBe(true);
		expect(result.current.upperValidated).toBe(true);
		expect(result.current.lengthValidated).toBe(true);
		expect(result.current.numberValidated).toBe(true);
		expect(result.current.specialCharValidated).toBe(true);
	});
});
