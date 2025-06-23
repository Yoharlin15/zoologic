import React from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';
import { Divider } from 'primereact/divider';
import { Carousel } from 'primereact/carousel';

const ZoologicVisitorLanding = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(Routes.login_ROUTE);
    };

    return (
        <div className="landing-page">
            {/* Estilos */}
            <style>{`
                .landing-page {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    color: #333;
                    line-height: 1.6;
                }
                
                .hero-section {
                    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                                url('https://images.unsplash.com/photo-1552410260-0fd9b577afa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80') no-repeat center center/cover;
                    padding: 150px 0 100px;
                    text-align: center;
                    color: white;
                }

                .footer-container {
                    display: grid;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }

                @media (min-width: 768px) {
                    .footer-container {
                        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    }
                }

                .footer-col h5 {
                    position: relative;
                    padding-bottom: 10px;
                    margin-bottom: 1rem;
                }

                .footer-col h5::after {
                    content: '';
                    position: absolute;
                    left: 0;
                    bottom: 0;
                    width: 50px;
                    height: 2px;
                    background-color: #f9a825;
                }
            `}</style>

            {/* Header */}
            <header className="surface-0 shadow-2 p-3">
                <div className="flex justify-content-between align-items-center container">
                    <div className="flex align-items-center">
                        <i className="pi pi-paw text-4xl text-primary-500 mr-2"></i>
                        <h1 className="text-primary-500 font-bold m-0">zoologic</h1>
                    </div>
                    <div className="flex gap-5">
                        <a href="#" className="text-700 hover:text-primary-500">Inicio</a>
                    </div>
                    <div className="flex gap-3">
                        <Button
                            label="Iniciar Sesión"
                            className="p-button-text p-button-secondary"
                            onClick={handleLoginClick}
                        />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <h2 className="text-6xl font-bold mb-3 text-white">Descubre el Mundo Salvaje en Santo Domingo</h2>
                    <p className="text-xl mb-5 text-white line-height-3" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        Más de 500 animales de 100 especies diferentes te esperan en el corazón de la ciudad. Una experiencia educativa y divertida para toda la familia.
                    </p>
                    <div className="flex justify-content-center gap-3">
                        <Button label="Comprar Entradas" className="p-button-warning" />
                        <Button label="Ver Información" className="p-button-outlined p-button-secondary" />
                    </div>
                </div>
            </section>

            <section className="py-8 bg-white">
                <div className="container mx-auto">
                    <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">Especies</h3>
                    {/* Prepare carousel data and item template for PrimeReact Carousel */}
                    {(() => {
                        const animals = [
                            {
                                src: "https://upload.wikimedia.org/wikipedia/commons/7/73/Lion_waiting_in_Namibia.jpg",
                                alt: "León africano",
                                legend: "León Africano"
                            },
                            {
                                src: "https://upload.wikimedia.org/wikipedia/commons/5/56/Tiger.50.jpg",
                                alt: "Tigre de Bengala",
                                legend: "Tigre de Bengala"
                            },
                            {
                                src: "https://th.bing.com/th/id/OIP.5J98wbt0q2LItsFwk_4E0gHaE7?rs=1&pid=ImgDetMain",
                                alt: "Flamenco rosado",
                                legend: "Flamenco Rosado"
                            },
                            {
                                src: "https://theobjective.com/wp-content/uploads/2017/04/chimpance-cecilia-argentina.jpg",
                                alt: "Chimpancé",
                                legend: "Chimpancé"
                            }
                        ];


                        const animalTemplate = (animal: { src: string; alt: string; legend: string }) => (
                            <div className="flex flex-column align-items-center">
                                <img src={animal.src} alt={animal.alt} style={{ width: '100%', maxHeight: 350, objectFit: 'cover' }} />
                                <p className="legend">{animal.legend}</p>
                            </div>
                        );

                        return (
                            <Carousel
                                value={animals}
                                itemTemplate={animalTemplate}
                                numVisible={1}
                                numScroll={1}
                                circular
                                autoplayInterval={4000}
                                className="max-w-4xl mx-auto"
                            />
                        );
                    })()}
                </div>
            </section>


            {/* Footer */}
            <footer className="surface-900 text-0 py-6">
                <div className="container">
                    <div className="footer-container">
                        <div>
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-paw text-primary-500 text-4xl mr-2"></i>
                                <h5 className="text-0 m-0">Zoológico SD</h5>
                            </div>
                            <p className="text-300 mb-4">
                                El zoológico más grande y moderno del Caribe, comprometido con la conservación, educación y recreación familiar.
                            </p>
                            <div className="flex gap-3">
                                <Button icon="pi pi-facebook" className="p-button-rounded p-button-secondary p-button-outlined" />
                                <Button icon="pi pi-twitter" className="p-button-rounded p-button-secondary p-button-outlined" />
                                <Button icon="pi pi-instagram" className="p-button-rounded p-button-secondary p-button-outlined" />
                                <Button icon="pi pi-youtube" className="p-button-rounded p-button-secondary p-button-outlined" />
                            </div>
                        </div>
                        <div>
                            <h5>Explorar</h5>
                            <ul className="list-none p-0">
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Inicio</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5>Educación</h5>
                            <ul className="list-none p-0">
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Visitas Escolares</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Campamentos</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Recursos para Maestros</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5>Información</h5>
                            <ul className="list-none p-0">
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Accesibilidad</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Políticas</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Trabaja con Nosotros</a></li>
                            </ul>
                        </div>
                    </div>
                    <Divider className="my-4 bg-gray-700" />
                    <p className="text-center text-300 m-0">
                        &copy; 2023 Zoológico de Santo Domingo. Todos los derechos reservados. Un espacio para la conservación y educación ambiental.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ZoologicVisitorLanding;
