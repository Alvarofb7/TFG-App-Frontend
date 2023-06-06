import { useEffect, useState } from "react";

export const useForm = (initialForm = {}) => {
	const [formState, setFormState] = useState(initialForm);

	useEffect(() => {
		setFormState(initialForm);
	}, [initialForm]);

	const onInputChange = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});
	};

	const [lowerValidated, setLowerValidated] = useState(false);
	const [upperValidated, setUpperValidated] = useState(false);
	const [lengthValidated, setLengthValidated] = useState(false);
	const [numberValidated, setNumberValidated] = useState(false);
	const [specialCharValidated, setSpecialCharValidated] = useState(false);

	const onPasswordValidation = ({ target }) => {
		const { name, value } = target;
		setFormState({
			...formState,
			[name]: value,
		});

		const lower = /[a-z]/;
		const upper = /[A-Z]/;
		const length = /(?=^.{6,20}$)/;
		const number = /\d/;
		const special = /[$!%*?-_&]/;

		setLowerValidated(false);
		setUpperValidated(false);
		setLengthValidated(false);
		setNumberValidated(false);
		setSpecialCharValidated(false);

		if (lower.test(value)) {
			setLowerValidated(true);
		}
		if (upper.test(value)) {
			setUpperValidated(true);
		}
		if (length.test(value)) {
			setLengthValidated(true);
		}
		if (number.test(value)) {
			setNumberValidated(true);
		}
		if (special.test(value)) {
			setSpecialCharValidated(true);
		}
	};

	return {
		//* Variables
		...formState,
		formState,
		lowerValidated,
		upperValidated,
		lengthValidated,
		numberValidated,
		specialCharValidated,

		//* Methos
		onInputChange,
		onPasswordValidation,
	};
};
