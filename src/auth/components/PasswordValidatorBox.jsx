export const PasswordValidatorBox = ({
	lowerValid,
	upperValid,
	lengthValid,
	numberValid,
	specialCharValid,
	password,
}) => {
	return (
		<main
			className="password-validation-box"
			aria-label="password-validation-box"
			style={{
				display:
					(lengthValid &&
						lowerValid &&
						upperValid &&
						numberValid &&
						specialCharValid) ||
					password === ""
						? "none"
						: "",
			}}
		>
			<div className={lengthValid ? "validated" : "not-validated"}>
				{lengthValid ? (
					<span className="list-icon green">
						<i className="fa-solid fa-check"></i>
					</span>
				) : (
					<span className="list-icon">
						<i className="fa-solid fa-xmark"></i>
					</span>
				)}
				Debe de contener entre 6 y 20 caracteres
			</div>
			<div className={lowerValid ? "validated" : "not-validated"}>
				{lowerValid ? (
					<span className="list-icon green">
						<i className="fa-solid fa-check"></i>
					</span>
				) : (
					<span className="list-icon">
						<i className="fa-solid fa-xmark"></i>
					</span>
				)}
				Al menos una letra minúscula
			</div>
			<div className={upperValid ? "validated" : "not-validated"}>
				{upperValid ? (
					<span className="list-icon green">
						<i className="fa-solid fa-check"></i>
					</span>
				) : (
					<span className="list-icon">
						<i className="fa-solid fa-xmark"></i>
					</span>
				)}
				Al menos una letra mayúscula
			</div>
			<div className={numberValid ? "validated" : "not-validated"}>
				{numberValid ? (
					<span className="list-icon green">
						<i className="fa-solid fa-check"></i>
					</span>
				) : (
					<span className="list-icon">
						<i className="fa-solid fa-xmark"></i>
					</span>
				)}
				Al menos un número
			</div>
			<div className={specialCharValid ? "validated" : "not-validated"}>
				{specialCharValid ? (
					<span className="list-icon green">
						<i className="fa-solid fa-check"></i>
					</span>
				) : (
					<span className="list-icon">
						<i className="fa-solid fa-xmark"></i>
					</span>
				)}
				Al menos un caracter especial
			</div>
		</main>
	);
};
