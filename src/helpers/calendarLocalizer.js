import { dateFnsLocalizer } from "react-big-calendar";
import { parse, startOfWeek, getDay, format } from "date-fns";
import enUS from "date-fns/locale/en-US";
import esEs from "date-fns/locale/es";

const locales = {
	"en-US": enUS,
	es: esEs,
};

export const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});
