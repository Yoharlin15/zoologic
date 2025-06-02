import React from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import { TabView, TabPanel } from 'primereact/tabview';
import { Avatar } from 'primereact/avatar';
import { Badge } from 'primereact/badge';
import { useNavigate } from 'react-router-dom';
import { Routes } from '#core';

const ZoologicVisitorLanding = () => {
    const navigate = useNavigate();
    // Datos para el dropdown de membresías
    const memberships = [
        { name: 'Visita Individual', code: 'individual' },
        { name: 'Membresía Familiar', code: 'family' },
        { name: 'Membresía Premium', code: 'premium' },
        { name: 'Visita Escolar', code: 'school' }
    ];

    // Datos de testimonios
    const testimonials = [
        {
            name: 'Familia Martínez',
            content: '"Nuestros hijos aman el zoológico, especialmente la nueva app que les permite aprender sobre los animales antes de visitarlos."',
            avatar: 'https://randomuser.me/api/portraits/women/45.jpg'
        },
        {
            name: 'Prof. Juan Sánchez',
            content: '"La visita educativa con mis estudiantes fue increíble. La app de realidad aumentada hizo que el aprendizaje fuera interactivo y divertido."',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            name: 'Ana López',
            content: '"Con la membresía premium tenemos acceso a eventos exclusivos. ¡Vale cada peso!"',
            avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
        }
    ];

    // Datos de características para visitantes
    const features = [
        { icon: 'pi pi-mobile', title: 'App del Zoológico', description: 'Descarga nuestra app para planificar tu visita, ver mapas interactivos y aprender sobre los animales.' },
        { icon: 'pi pi-ticket', title: 'Entradas Digitales', description: 'Compra tus entradas online sin filas y recibe descuentos exclusivos.' },
        { icon: 'pi pi-calendar', title: 'Eventos Especiales', description: 'Acceso a alimentación de animales, noches de safari y eventos temáticos.' },
        { icon: 'pi pi-users', title: 'Visitas Guiadas', description: 'Reserva tours guiados por expertos para una experiencia más enriquecedora.' },
        { icon: 'pi pi-gift', title: 'Membresías', description: 'Ahorra con membresías anuales que incluyen beneficios exclusivos.' },
        { icon: 'pi pi-camera', title: 'Experiencias AR', description: 'Usa realidad aumentada para interactuar virtualmente con los animales.' }
    ];

    // Datos de precios para visitantes
    const pricingPlans = [
        {
            name: 'Individual',
            price: 'RD$500',
            period: '/persona',
            features: [
                'Acceso general por un día',
                'Mapa interactivo digital',
                '10% descuento en tienda',
                'App del zoológico incluida'
            ],
            featured: false
        },
        {
            name: 'Familiar',
            price: 'RD$1,500',
            period: '/año',
            features: [
                'Acceso ilimitado para 4 personas',
                '20% descuento en tienda y comida',
                '2 visitas guiadas gratis al año',
                'Acceso prioritario',
                'Invitaciones a eventos especiales'
            ],
            featured: true
        },
        {
            name: 'Premium',
            price: 'RD$3,000',
            period: '/año',
            features: [
                'Acceso ilimitado para 6 personas',
                '30% descuento en tienda y comida',
                '4 visitas guiadas gratis al año',
                'Acceso VIP a eventos',
                'Estacionamiento preferencial',
                'Encuentros exclusivos con animales'
            ],
            featured: false
        }
    ];

    // Animales destacados
    const featuredAnimals = [
        {
            name: 'León Africano',
            description: 'Conoce a Simba y su manada en nuestro hábitat de sabana africana.',
            image: 'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Jirafa Masai',
            description: 'Las jirafas más altas de África en un espacio diseñado para su comodidad.',
            image: 'https://images.unsplash.com/photo-1516406765405-efcd6e1f1f80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
            name: 'Flamenco Caribeño',
            description: 'Nuestro vibrante grupo de flamencos en su laguna especial.',
            image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        }
    ];

    const handleLoginClick = () => {
        navigate(Routes.login_ROUTE, { replace: true });
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
                
                .section-title {
                    text-align: center;
                    margin-bottom: 2rem;
                }
                
                .section-title h3 {
                    font-size: 2.5rem;
                    color: #1e3f34;
                    margin-bottom: 0.5rem;
                }
                
                .section-title p {
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto;
                }
                
                .features-grid, .testimonials-grid, .pricing-grid, .animals-grid {
                    display: grid;
                    gap: 2rem;
                    margin: 2rem 0;
                }
                
                .features-grid {
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                
                .testimonials-grid, .animals-grid {
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                
                .pricing-grid {
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                }
                
                .feature-card, .testimonial-card, .animal-card {
                    transition: transform 0.3s, box-shadow 0.3s;
                }
                
                .feature-card:hover, .animal-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }
                
                .feature-icon {
                    font-size: 2.5rem;
                    color: #2a7f62;
                    margin-bottom: 1rem;
                }
                
                .pricing-card {
                    transition: transform 0.3s;
                }
                
                .pricing-card:hover {
                    transform: scale(1.05);
                }
                
                .featured-card {
                    position: relative;
                    background-color: #2a7f62 !important;
                    color: white !important;
                }
                
                .featured-badge {
                    position: absolute;
                    top: -15px;
                    right: 20px;
                    background-color: #f9a825;
                    color: white;
                    padding: 5px 15px;
                    border-radius: 20px;
                    font-size: 0.875rem;
                    font-weight: 500;
                }
                
                .contact-container {
                    display: grid;
                    gap: 3rem;
                    margin: 2rem 0;
                }
                
                .footer-container {
                    display: grid;
                    gap: 2rem;
                    margin-bottom: 2rem;
                }
                
                .animal-image {
                    height: 200px;
                    object-fit: cover;
                    width: 100%;
                    border-radius: 3px 3px 0 0;
                }
                
                @media (min-width: 768px) {
                    .contact-container, .footer-container {
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
                
                .hours-table {
                    width: 100%;
                }
                
                .hours-table tr td {
                    padding: 5px 0;
                }
                
                .hours-table tr td:last-child {
                    text-align: right;
                }
            `}</style>

            {/* Header */}
            <header className="surface-0 shadow-2 p-3">
                <div className="flex justify-content-between align-items-center container">
                    <div className="flex align-items-center">
                        <i className="pi pi-paw text-4xl text-primary-500 mr-2"></i>
                        <h1 className="text-primary-500 font-bold m-0">Zoológico SD</h1>
                    </div>
                    <div className="flex gap-5">
                        <a href="#animals" className="text-700 hover:text-primary-500">Animales</a>
                        <a href="#experiences" className="text-700 hover:text-primary-500">Experiencias</a>
                        <a href="#pricing" className="text-700 hover:text-primary-500">Entradas</a>
                        <a href="#visit" className="text-700 hover:text-primary-500">Planifica tu Visita</a>
                    </div>
                    <div className="flex gap-3">
                        <Button 
                        label="Iniciar Sesión" 
                        className="p-button-text p-button-secondary" 
                        onClick={handleLoginClick}/>

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
                        <Button label="Ver Animales" className="p-button-outlined p-button-secondary" />
                    </div>
                </div>
            </section>

            {/* Animals Section */}
            <section id="animals" className="surface-0 py-6">
                <div className="container">
                    <div className="section-title">
                        <h3>Nuestros Animales Estrella</h3>
                        <p>Conoce algunas de las fascinantes especies que podrás encontrar en nuestro zoológico</p>
                    </div>
                    <div className="animals-grid">
                        {featuredAnimals.map((animal, index) => (
                            <Card key={index} className="surface-card shadow-1 p-0">
                                <img src={animal.image} alt={animal.name} className="animal-image" />
                                <div className="p-4">
                                    <h4 className="text-xl font-bold mb-2">{animal.name}</h4>
                                    <p className="text-600 mb-3">{animal.description}</p>
                                    <Button label="Conocer Más" className="p-button-text p-button-primary" />
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <Button label="Ver Todos los Animales" className="p-button-outlined" />
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="experiences" className="surface-50 py-6">
                <div className="container">
                    <div className="section-title">
                        <h3>Experiencias Únicas</h3>
                        <p>Haz de tu visita al zoológico una experiencia inolvidable</p>
                    </div>
                    <div className="features-grid">
                        {features.map((feature, index) => (
                            <Card key={index} className="surface-card shadow-1">
                                <div className="text-center">
                                    <i className={`${feature.icon} feature-icon`}></i>
                                    <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                                    <p className="text-600">{feature.description}</p>
                                    {index % 2 === 0 && (
                                        <Badge value="Nuevo" severity="success" className="mt-3"></Badge>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="surface-0 py-6">
                <div className="container">
                    <div className="section-title">
                        <h3>Entradas y Membresías</h3>
                        <p>Elige la opción que mejor se adapte a tu familia</p>
                    </div>
                    <div className="pricing-grid">
                        {pricingPlans.map((plan, index) => (
                            <Card key={index} className={`surface-card shadow-1 ${plan.featured ? 'featured-card' : ''}`}>
                                {plan.featured && <Badge value="Más Popular" severity="warning" className="featured-badge"></Badge>}
                                <div className="text-center">
                                    <h4 className="text-2xl font-bold mb-3">{plan.name}</h4>
                                    <div className="text-4xl font-bold mb-3">
                                        {plan.price}<span className="text-xl">{plan.period}</span>
                                    </div>
                                    <ul className="list-none p-0 m-0 mb-4">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="py-2 border-bottom-1 surface-border">{feature}</li>
                                        ))}
                                    </ul>
                                    <Button
                                        label="Comprar Ahora"
                                        className={plan.featured ? 'p-button-warning' : 'p-button-primary'}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="surface-50 py-6">
                <div className="container">
                    <div className="section-title">
                        <h3>Lo que dicen nuestros visitantes</h3>
                        <p>Experiencias reales de familias que han disfrutado de nuestro zoológico</p>
                    </div>
                    <div className="testimonials-grid">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="surface-card shadow-1">
                                <p className="italic text-600 mb-3">"{testimonial.content}"</p>
                                <div className="flex align-items-center">
                                    <Avatar image={testimonial.avatar} size="large" shape="circle" className="mr-3" />
                                    <div>
                                        <h5 className="m-0 text-900">{testimonial.name}</h5>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visit Planning Section */}
            <section id="visit" className="surface-0 py-6">
                <div className="container">
                    <div className="section-title">
                        <h3>Planifica tu Visita</h3>
                        <p>Toda la información que necesitas para disfrutar al máximo tu día en el zoológico</p>
                    </div>
                    <div className="grid">
                        <div className="col-12 md:col-6">
                            <Card className="surface-card shadow-1 h-full">
                                <h4 className="text-2xl font-bold mb-3">Horario</h4>
                                <table className="hours-table">
                                    <tbody>
                                        <tr>
                                            <td>Lunes - Viernes</td>
                                            <td>9:00 AM - 5:00 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Sábados</td>
                                            <td>8:30 AM - 6:00 PM</td>
                                        </tr>
                                        <tr>
                                            <td>Domingos y Feriados</td>
                                            <td>8:30 AM - 6:30 PM</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Divider />
                                <h4 className="text-xl font-bold mb-3">Ubicación</h4>
                                <p className="mb-3">Av. Mirador Sur, Santo Domingo, República Dominicana</p>
                                <Button label="Ver en Mapa" icon="pi pi-map-marker" className="p-button-outlined p-button-secondary" />
                            </Card>
                        </div>
                        <div className="col-12 md:col-6">
                            <Card className="surface-card shadow-1 h-full">
                                <h4 className="text-2xl font-bold mb-3">Servicios</h4>
                                <ul className="list-none p-0 m-0">
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-primary-500 mr-2"></i>
                                        <span>Estacionamiento gratuito</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-primary-500 mr-2"></i>
                                        <span>Zonas de comida y picnic</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-primary-500 mr-2"></i>
                                        <span>Accesibilidad para sillas de ruedas</span>
                                    </li>
                                    <li className="flex align-items-center mb-3">
                                        <i className="pi pi-check-circle text-primary-500 mr-2"></i>
                                        <span>Tienda de souvenirs</span>
                                    </li>
                                    <li className="flex align-items-center">
                                        <i className="pi pi-check-circle text-primary-500 mr-2"></i>
                                        <span>Áreas de descanso y bebederos</span>
                                    </li>
                                </ul>
                                <Divider />
                                <h4 className="text-xl font-bold mb-3">Consejos para tu Visita</h4>
                                <p>Recomendamos llevar protector solar, agua y calzado cómodo. La mejor hora para ver a los animales activos es por la mañana temprano.</p>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="surface-50 py-6">
                <div className="container">
                    <div className="section-title">
                        <h3>¿Preguntas?</h3>
                        <p>Contáctanos para más información sobre tu visita</p>
                    </div>
                    <div className="contact-container">
                        <Card className="surface-card shadow-1">
                            <h4 className="text-2xl font-bold mb-3">Información de Contacto</h4>
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-map-marker text-primary-500 text-xl mr-3"></i>
                                <span>Av. Mirador Sur, Santo Domingo, República Dominicana</span>
                            </div>
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-phone text-primary-500 text-xl mr-3"></i>
                                <span>(809) 555-1234</span>
                            </div>
                            <div className="flex align-items-center mb-3">
                                <i className="pi pi-envelope text-primary-500 text-xl mr-3"></i>
                                <span>visitas@zoosd.com</span>
                            </div>
                            <div className="flex align-items-center">
                                <i className="pi pi-clock text-primary-500 text-xl mr-3"></i>
                                <span>Atención al cliente: 8:00 AM - 6:00 PM</span>
                            </div>
                            <Divider />
                            <h4 className="text-xl font-bold mb-3">Descarga Nuestra App</h4>
                            <div className="flex gap-2">
                                <Button label="App Store" icon="pi pi-apple" className="p-button-outlined" />
                                <Button label="Google Play" icon="pi pi-google" className="p-button-outlined" />
                            </div>
                        </Card>
                        <Card className="surface-card shadow-1">
                            <form>
                                <div className="field mb-4">
                                    <label htmlFor="name" className="block mb-2">Nombre Completo</label>
                                    <InputText id="name" className="w-full" required />
                                </div>
                                <div className="field mb-4">
                                    <label htmlFor="email" className="block mb-2">Correo Electrónico</label>
                                    <InputText id="email" type="email" className="w-full" required />
                                </div>
                                <div className="field mb-4">
                                    <label htmlFor="membership" className="block mb-2">Tipo de Consulta</label>
                                    <Dropdown
                                        id="membership"
                                        options={memberships}
                                        optionLabel="name"
                                        placeholder="Selecciona una opción"
                                        className="w-full"
                                    />
                                </div>
                                <div className="field mb-4">
                                    <label htmlFor="message" className="block mb-2">Mensaje</label>
                                    <InputText id="message" className="w-full" required />
                                </div>
                                <Button type="submit" label="Enviar Consulta" className="p-button-primary w-full" />
                            </form>
                        </Card>
                    </div>
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
                                <li className="mb-2"><a href="#animals" className="text-300 hover:text-primary-300 no-underline">Animales</a></li>
                                <li className="mb-2"><a href="#experiences" className="text-300 hover:text-primary-300 no-underline">Experiencias</a></li>
                                <li className="mb-2"><a href="#pricing" className="text-300 hover:text-primary-300 no-underline">Entradas</a></li>
                                <li className="mb-2"><a href="#visit" className="text-300 hover:text-primary-300 no-underline">Planificar Visita</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Eventos Especiales</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5>Educación</h5>
                            <ul className="list-none p-0">
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Visitas Escolares</a></li>
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Programas Educativos</a></li>
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Campamentos</a></li>
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Recursos para Maestros</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Conservación</a></li>
                            </ul>
                        </div>
                        <div>
                            <h5>Información</h5>
                            <ul className="list-none p-0">
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Preguntas Frecuentes</a></li>
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Accesibilidad</a></li>
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Políticas</a></li>
                                <li className="mb-2"><a href="#" className="text-300 hover:text-primary-300 no-underline">Trabaja con Nosotros</a></li>
                                <li><a href="#" className="text-300 hover:text-primary-300 no-underline">Donaciones</a></li>
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