import React from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';

interface CarouselItem {
    id: number;
    src: string;
    alt: string;
}

const LandingPage = () => {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate(Routes.login_ROUTE);
    };
    const carouselImages: CarouselItem[] = [
        {
            id: 1,
            src: 'https://res.cloudinary.com/dlbb3qssp/image/upload/v1750949133/Leon_a8hrfk.jpg',
            alt: 'Leon'
        },
        {
            id: 2,
            src: 'https://res.cloudinary.com/dlbb3qssp/image/upload/v1750949169/flamencos_vei48x.jpg',
            alt: 'Flamenco rosa'
        },
        {
            id: 3,
            src: 'https://res.cloudinary.com/dlbb3qssp/image/upload/v1750949178/iguana_hwoqhy.jpg',
            alt: 'Iguana'
        }
    ];

    const carouselTemplate = (item: CarouselItem) => {
        return (
            <div className="relative mx-auto" style={{ maxWidth: '700px' }}>
                <img
                    src={item.src}
                    alt={item.alt}
                    className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white">
                    <h3 className="text-xl font-bold">{item.alt}</h3>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header modificado */}
            <div className="bg-white shadow-md py-4 px-6 w-full">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo a la izquierda */}
                    <div className="text-2xl font-bold text-indigo-600">zoologic</div>

                    {/* Botón a la derecha */}
                    <Button
                        label="Iniciar Sesión"
                        icon="pi pi-user"
                        className="p-button-rounded p-button-outlined ml-auto"
                        onClick={handleLoginClick}
                    />
                </div>
            </div>

            {/* Banner Principal */}
            <div className="relative h-96 w-full overflow-hidden">
                <img
                    src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1750950278/Captura_de_pantalla_2025-06-26_110405_zn44lh.png"
                    alt="Banner Principal"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Carrusel de Eventos - Tamaño reducido */}
            <section className="py-12 px-6 max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-3 text-gray-800">Especies</h2>
                <div className="px-4">
                    <Carousel
                        value={carouselImages}
                        numVisible={1}
                        numScroll={1}
                        itemTemplate={carouselTemplate}
                        className="custom-carousel"
                        circular
                        autoplayInterval={3000}
                    />
                </div>
            </section>

            {/* Sección de Boletas con imagen al lado */}
            <section className="py-12 px-6 bg-indigo-50">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
                    {/* Imagen al lado izquierdo */}
                    <div className="flex-1">
                        <img
                            src="https://res.cloudinary.com/dlbb3qssp/image/upload/v1750957578/Ecommerce_web_page-bro_x5jps9.svg"
                            alt="Boletas"
                            className="w-full h-auto rounded-lg shadow-md"
                        />
                    </div>

                    {/* Texto y botón al lado derecho */}
                    <div className="flex-1 text-center md:text-left">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">No te quedes sin tu entrada</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Evita las molestias y el tiempo perdido en largas filas. Adquiere tus boletas en línea de forma rápida, segura y desde la comodidad de tu hogar..
                        </p>
                        <Button
                            label="Comprar Boletas"
                            icon="pi pi-ticket"
                            className="p-button-rounded p-button-lg bg-indigo-600 border-indigo-600 hover:bg-indigo-700"
                        />
                    </div>
                </div>
            </section>


            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 px-6">
                <div className="max-w-6xl mx-auto text-center">
                    <p>© 2025 zoologic. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;