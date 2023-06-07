import { useEffect } from "react";
import { useAuthStore } from "../hooks";
import { Navbar } from "../ui/components/Navbar";

export const MainLayout = ({ children }) => {
	const { checkAuthToken } = useAuthStore();

	useEffect(() => {
		checkAuthToken();
	}, []);

	return (
		<>
			<Navbar />
			{children}
		</>
	);
};
