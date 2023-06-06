import { testUserCredentials } from "./testUser";

export const calendarInitialState = {
	isLoadingEvents: true,
	events: [],
	activeEvent: null,
};

export const calendarWithEventsState = {
	isLoadingEvents: false,
	events: [
		{
			id: "1",
			title: "Titulo1",
			notes: "",
			start: new Date(2023, 10, 1, 11, 0),
			end: new Date(2023, 10, 1, 14, 0),
			user: testUserCredentials,
			allDay: false,
		},
		{
			id: "2",
			title: "Titulo2",
			notes: "",
			start: new Date(2023, 10, 1, 12, 0),
			end: new Date(2023, 10, 1, 15, 0),
			user: testUserCredentials,
			allDay: false,
		},
	],
	activeEvent: null,
};

export const eventUpdated = {
	id: "1",
	title: "Titulo actualizado",
	notes: "",
	start: new Date(2023, 10, 1, 9, 0),
	end: new Date(2023, 10, 1, 10, 0),
	user: testUserCredentials,
	allDay: false,
};

export const calendarWithEventsUpdatedState = {
	isLoadingEvents: false,
	events: [
		eventUpdated,
		{
			id: "2",
			title: "Titulo2",
			notes: "",
			start: new Date(2023, 10, 1, 12, 0),
			end: new Date(2023, 10, 1, 15, 0),
			user: testUserCredentials,
			allDay: false,
		},
	],
	activeEvent: null,
};

export const eventInsert = {
	title: "Titulo nota insertada",
	notes: "",
	start: new Date(2023, 10, 1, 10, 0).toISOString(),
	end: new Date(2023, 10, 1, 13, 0).toISOString(),
	user: testUserCredentials,
	allDay: false,
};

export const eventExample = {
	id: "1",
	title: "Titulo",
	notes: "",
	start: new Date(2023, 10, 1, 9, 0),
	end: new Date(2023, 10, 1, 10, 0),
	user: testUserCredentials,
	allDay: false,
};

export const eventExample2 = {
	id: "1",
	title: "Titulo",
	notes: "Descripcion",
	start: new Date(2023, 10, 1, 9, 0),
	end: new Date(2023, 10, 1, 10, 0),
	user: testUserCredentials,
	allDay: false,
};

export const calendarWithActiveEventState = {
	isLoadingEvents: false,
	events: [
		{
			id: "1",
			title: "Titulo",
			notes: "",
			start: new Date(2023, 10, 1, 9, 0),
			end: new Date(2023, 10, 1, 10, 0),
			user: testUserCredentials,
			allDay: false,
		},
	],
	activeEvent: {
		id: "1",
		title: "Titulo",
		notes: "",
		start: new Date(2023, 10, 1, 9, 0),
		end: new Date(2023, 10, 1, 10, 0),
		user: testUserCredentials,
		allDay: false,
	},
};

export const calendarWithoutActiveEventState = {
	isLoadingEvents: false,
	events: [
		{
			id: "1",
			title: "Titulo",
			notes: "",
			start: new Date(2023, 10, 1, 9, 0),
			end: new Date(2023, 10, 1, 10, 0),
			user: testUserCredentials,
			allDay: false,
		},
	],
	activeEvent: null,
};

export const calendarLoadEventsState = {
	isLoadingEvents: false,
	events: [
		{
			id: "1",
			title: "Titulo1",
			notes: "",
			start: "2023-11-01T10:00:00.000Z",
			end: "2023-11-01T13:00:00.000Z",
			user: testUserCredentials,
			allDay: false,
		},
		{
			id: "2",
			title: "Titulo2",
			notes: "",
			start: "2023-11-01T11:00:00.000Z",
			end: "2023-11-01T14:00:00.000Z",
			user: testUserCredentials,
			allDay: false,
		},
	],
	activeEvent: null,
};


