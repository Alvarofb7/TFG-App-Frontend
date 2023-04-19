import "./HomePage.css";

export const HomePage = ({ children }) => {
    return (
        <div>
            <header>
                <h1 className="title mb-1">ProductiveApp</h1>
                <p className="description">La mejor aplicación para organizar tu tiempo y aumentar tu productividad.</p>
            </header>
            <main>
                <section className="features mb-2">
                    <h2>Funcionalidades</h2>
                    <ul>
                        <li>Calendario</li>
                        <li>Apartado de notas</li>
                        <li>Kanban para productividad</li>
                    </ul>
                </section>
                <section className="images mb-1">
                    <h2>Imágenes</h2>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <img src="/img/image1.jpg" alt="Imagen 1" />
                                <p>Descripción de la imagen 1.</p>
                            </div>
                            <div className="col">
                                <img src="/img/image2.jpg" alt="Imagen 2" />
                                <p>Descripción de la imagen 2.</p>
                            </div>
                            <div className="col">
                                <img src="/img/image3.jpg" alt="Imagen 3" />
                                <p>Descripción de la imagen 3.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="auth mb-2">
                    <h2>Login y Registro</h2>
                    { children }
                </section>
            </main>
            <footer>
                <p>Derechos reservados ProductiveApp © 2021</p>
            </footer>
        </div>
    );
};

