import React from 'react';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';
import ZooBanner from './banner';
import MapaInteractivo from './mapa';

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
        },
        {
            id: 4,
            src: 'https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2019/06/25182827/RINOCERONTES-ZOODOM.jpg',
            alt: 'Rinoceronte'
        },
        {
            id: 5,
            src: 'https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2018/01/18152007/JAGUAR-ZOODOM5.jpg',
            alt: 'Tigre'
        },

        {
            id: 6,
            src: 'https://s3.amazonaws.com/cdn.conectate-new.com/wp-content/uploads/2018/01/18152007/JAGUAR-ZOODOM5.jpg',
            alt: 'Tigre'
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
            <div className="bg-green-800 shadow-md py-4 px-6 w-full">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo a la izquierda */}
                    <div className="text-4xl font-bold text-white">zoologic</div>

                    <Button
                        label="Catálogo"
                        icon="pi pi-book"
                        className="p-button-rounded p-button-outlined ml-auto text-white border-white"
                        onClick={() => navigate(Routes.CATALOGO_ROUE)}
                    />

                    {/* Botón a la derecha */}
                    <Button
                        label="Iniciar Sesión"
                        icon="pi pi-user"
                        className="p-button-rounded p-button-outlined ml-auto text-white border-white"
                        onClick={handleLoginClick}
                    />
                </div>
            </div>


            {/* Banner Principal */}

            <ZooBanner />
            {/* Otros componentes */}


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

            <MapaInteractivo />

            {/* Sección de Boletas con imagen al lado */}
            <section className="py-12 px-6 bg-indigo-50 mt-8">
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