import { useEffect, useRef } from "react";
import "./HomePage.css";

export const HomePage = ({ children }) => {
	const linksContainerRef = useRef(null);
	const linksRef = useRef(null);

	useEffect(() => {
		// Scroll
		const handleScroll = () => {
			const navbar = document.getElementById("nav");
			const topLink = document.querySelector(".top-link");

			// Scroll
			const scrollHeight = window.scrollY;
			// Tamaño navbar
			const navHeight = navbar.getBoundingClientRect().height;

			if (scrollHeight > navHeight) {
				navbar.classList.add("fixed-nav");
			} else {
				navbar.classList.remove("fixed-nav");
			}

			if (scrollHeight > 500) {
				topLink.classList.add("show-link");
			} else {
				topLink.classList.remove("show-link");
			}
		};

		window.addEventListener("scroll", handleScroll);

		// Cleanup
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	// Toggle
	const toggle = () => {
		const linksContainer = linksContainerRef.current;
		const links = linksRef.current;

		const linksHeight = links?.getBoundingClientRect().height;
		const containerHeight = linksContainer?.getBoundingClientRect().height;
		if (containerHeight === 0) {
			linksContainer.style.height = `${linksHeight}px`;
		} else {
			linksContainer.style.height = 0;
		}
	};

	// Slider
	const slides = document.querySelectorAll(".slide");
	const nextBtn = document.querySelector(".nextBtn");
	const prevBtn = document.querySelector(".prevBtn");

	slides.forEach(function (slide, index) {
		slide.style.left = `${index * 100}%`;
	});

	let counter = 0;

	const nextBtnClick = () => {
		counter++;
		carousel();
	};

	const prevBtnClick = () => {
		counter--;
		carousel();
	};

	function carousel() {
		if (counter < slides.length - 1) {
			nextBtn.style.display = "block";
		} else {
			nextBtn.style.display = "none";
		}
		if (counter > 0) {
			prevBtn.style.display = "block";
		} else {
			prevBtn.style.display = "none";
		}
		slides.forEach(function (slide) {
			slide.style.transform = `translateX(-${counter * 100}%)`;
		});
	}

	// About
	const btns = document.querySelectorAll(".tab-btn");
	const articles = document.querySelectorAll(".content");
	const aboutTitle = (e) => {
		const id = e.target.dataset.id;
		if (id) {
			btns.forEach(function (btn) {
				btn.classList.remove("active");
			});
			e.target.classList.add("active");
			articles.forEach(function (article) {
				article.classList.remove("active");
			});
			const element = document.getElementById(id);
			element.classList.add("active");
		}
	};

	return (
		<div className="homePage" id="home">
			<header>
				<nav id="nav" className="nav">
					<div className="nav-center">
						<div className="nav-header">
							<img src="/img/Logo.png" className="logo" alt="Logo app" />
							<button className="nav-toggle" onClick={toggle}>
								<i className="fas fa-bars"></i>
							</button>
						</div>

						<div className="links-container" ref={linksContainerRef}>
							<ul className="links" ref={linksRef}>
								<li>
									<a href="#home" className="scroll-link">
										Home
									</a>
								</li>
								<li>
									<a href="#features" className="scroll-link">
										Funcionalidades
									</a>
								</li>
								<li>
									<a href="#about" className="scroll-link">
										¿Quién soy?
									</a>
								</li>
								<li>
									<a href="#authentication" className="scroll-link">
										Autenticación
									</a>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className="banner">
					<div className="container-banner">
						<h1>TFG App</h1>
						<h4>
							La mejor aplicación para organizar tu tiempo y aumentar tu
							productividad.
						</h4>
					</div>
				</div>
			</header>
			{/* Funcionalidades */}
			<section id="features" className="section">
				<div className="home-title">
					<h2>¿Qué ofrecemos?</h2>
				</div>
				<div className="features-slider">
					<div className="slider-container">
						<div className="slide">
							<img
								src="/img/Calendario.jpg"
								className="slide-img"
								alt="Imagen calendario"
							/>
						</div>
						<div className="slide">
							<img
								src="/img/Notas.jpg"
								className="slide-img"
								alt="Imagen notas"
							/>
						</div>
						<div className="slide">
							<img
								src="/img/Kanban.jpg"
								className="slide-img"
								alt="Imagen kanban"
							/>
						</div>
					</div>
					<div className="btn-container">
						<button type="button" className="prevBtn" onClick={prevBtnClick}>
							<i className="fa-solid fa-arrow-left"></i>
						</button>
						<button type="button" className="nextBtn" onClick={nextBtnClick}>
							<i className="fa-solid fa-arrow-right"></i>
						</button>
					</div>
				</div>
			</section>
			{/* Quien soy */}
			<section id="about" className="section-about">
				<div className="home-title">
					<h2>¿Quién soy?</h2>
				</div>
				<div className="about-center section-center">
					<article className="about-img">
						<img src="/img/ImagenPerfil.jpg" alt="Imagen perfil" />
					</article>
					<article className="about">
						<div className="btn-container-about">
							<button
								className="tab-btn active"
								data-id="personal"
								onClick={aboutTitle}
							>
								Personal
							</button>
							<button className="tab-btn" data-id="tfg" onClick={aboutTitle}>
								Trabajo de fin de grado
							</button>
						</div>
						<div className="about-content">
							<div className="content active" id="personal">
								<p>
									Estudiante del último curso de Ingeniería del Software en
									Sevilla a falta de la realización del trabajo de fin de grado
									para completarlo.
									<br />
									<br />
									Trabajando desde el 1 de diciembre de 2020 como desarrollador
									Backend. Realizando tareas de mantenimiento, de desarrollo y
									análisis tanto funcional como técnico.
									<br />
									<br />
									Competitivo y con muchas ganas de seguir aprendiendo para ser
									mejor.
								</p>
							</div>
							<div className="content" id="tfg">
								<p>
									Realizando este trabajo de fin de grado cuyo tema a tratar es
									el aprendizaje desde cero de la librería React. Para ello se
									ha necesitado un aprendizaje previo de JavaScript, dado que mi
									conocimiento era nulo, y luego un aprendizaje de React.
									Además, he utilizado el stack tecnológico MERN, compuesto de
									MongoDB, Express, React y Node.js.
									<br />
									<br />
									Tras todo este aprendizaje, he desarrollado una aplicación con
									un sistema de autenticación robusto y 3 funcionalidades:
									calendario, notas y Kanban.
								</p>
							</div>
						</div>
					</article>
				</div>
			</section>
			{/* Autenticacion */}
			<section id="authentication" className="section">
				<div className="home-title">
					<h2>Autenticacion</h2>
				</div>
				<div className="authenticacion-form">{children}</div>
			</section>
			<footer className="footer">
				<p>Derechos reservados TFG App © 2023</p>
			</footer>
			<a className="scroll-link top-link" href="#home">
				<i className="fas fa-arrow-up"></i>
			</a>
		</div>
	);
};
