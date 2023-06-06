import { api } from "../../src/api";

describe("Pruebas en api", () => {
	test("Debe de tener la configuración por defecto", () => {
		expect(api.defaults.baseURL).toBe(process.env.VITE_API_URL);
	});

	test("Debe de tener el x-token en el header de todas las peticiones", async () => {
		const token = "ABC-123-XYZ";
		localStorage.setItem("token", token);
		const res = await api.get("/auth");

		expect(res.config.headers["x-token"]).toBe(token);
	});
});
