export const initialState = {
	status: "not-authenticated", //"authenticated", "not-authenticated", "checking"
	user: {},
	errorMessage: undefined,
};

export const authenticatedState = {
	status: "authenticated", //"authenticated", "not-authenticated", "checking"
	user: {
		uid: "ABC",
		name: "Test",
	},
	errorMessage: undefined,
};

export const notAuthenticatedState = {
	status: "not-authenticated", //"authenticated", "not-authenticated", "checking"
	user: {},
	errorMessage: undefined,
};
