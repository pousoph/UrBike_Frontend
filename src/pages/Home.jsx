import React from "react";
import {FaArrowRight, FaCheckCircle, FaLeaf, FaStar} from "react-icons/fa";
import "../styles/home.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export const Home = () => {
    const navigate = useNavigate();
    return (
        <main className="home">
            <header className="home-header">
                <div className="logo">
                    <img src={logo} alt="UrBike logo" className="logo-img"/>
                    <span className="logo-text">UrBike</span>
                </div>

                <button className="btn-login" onClick={() => navigate("/login")}>
                    Iniciar Sesión
                </button>
            </header>
            <section className="hero">
                <div className="hero-text">
          <span className="tag">
            <FaLeaf className="icon-leaf"/> Movilidad Sostenible
          </span>
                    <h1>
                        Muévete por la ciudad de forma{" "}
                        <span className="highlight">Inteligente</span>
                    </h1>

                    <p>
                        Descubre la nueva forma de transporte urbano con UrBike. Rápido,
                        ecológico y siempre disponible cuando lo necesites.
                    </p>

                    <button className="btn-primary"onClick={() => navigate("/login")}>
                        Comenzar Ahora <FaArrowRight className="icon-arrow"/>
                    </button>

                    <div className="hero-stats">
                        <div><strong>50+</strong><p>Estaciones</p></div>
                        <div><strong>300+</strong><p>Bicicletas</p></div>
                        <div><strong>24/7</strong><p>Disponibles</p></div>
                        <div><strong>45min</strong><p>Tiempo Promedio</p></div>
                    </div>
                </div>

                <div className="hero-image">
                    <img
                        src="https://bogota.gov.co/sites/default/files/2023-09/abrir1subir1_0.jpeg"
                        alt="Movilidad sostenible en Bogotá"
                    />
                </div>
            </section>
            <section className="why-urbike">
                <h2>¿Por qué elegir UrBike?</h2>
                <p>La solución de movilidad urbana más completa y fácil de usar</p>

                <div className="why-cards">
                    <div className="card">
                        <i className="icon"><i className="fa-solid fa-bolt"></i></i>
                        <h3>Rápido y eficiente</h3>
                        <p>Desplázate por la ciudad sin tráfico ni demoras, ahorrando tiempo cada día.</p>
                    </div>

                    <div className="card">
                        <i className="icon"><i className="fa-solid fa-leaf"></i></i>
                        <h3>Sostenible</h3>
                        <p>Contribuye a un aire más limpio reduciendo tu huella de carbono.</p>
                    </div>

                    <div className="card">
                        <i className="icon"><i className="fa-solid fa-wallet"></i></i>
                        <h3>Económico</h3>
                        <p>Muévete con planes accesibles y transparentes sin costos ocultos.</p>
                    </div>

                    <div className="card">
                        <i className="icon"><i className="fa-solid fa-clock"></i></i>
                        <h3>Disponible 24/7</h3>
                        <p>Accede a tu bicicleta en cualquier momento del día, sin restricciones.</p>
                    </div>
                </div>
            </section>
            <section className="easy-use">
                <h3>Fácil de Usar</h3>

                <div className="easy-content">
                    <ul>
                        <li>
                            <div className="step-number">1</div>
                            <div className="step-text">
                                <strong>Regístrate y configura tu pago</strong>
                                <p>
                                    Crea tu cuenta, verifica tu email y agrega tu método de pago preferido.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="step-number">2</div>
                            <div className="step-text">
                                <strong>Encuentra y reserva</strong>
                                <p>
                                    Localiza estaciones cercanas y reserva tu bicicleta preferida.
                                </p>
                            </div>
                        </li>

                        <li>
                            <div className="step-number">3</div>
                            <div className="step-text">
                                <strong>Pedalea y disfruta</strong>
                                <p>
                                    Desbloquea tu bici y empieza tu viaje. Devuélvela en cualquier estación.
                                </p>
                            </div>
                        </li>
                    </ul>

                    <div className="easy-image">
                        <img
                            src="https://www.pasajero7.com/wp-content/uploads/2023/08/bicis-compartidas.jpg"
                            alt="Persona usando bicicleta compartida"
                        />
                    </div>
                </div>
            </section>
            <section className="benefits">
                <div className="benefits-content">
                    <div className="benefits-image">
                        <img
                            src="https://th.bing.com/th/id/R.889d9319318f1114ee96c4a03ab1b4d1?rik=05vqR8057EtbGw&riu=http%3a%2f%2frevistadc.com%2fwp-content%2fuploads%2f2023%2f09%2f374570933_689211589899673_348913780038764312_n.jpg&ehk=eE4xTN6djyMsBeS9%2bl2kYufqy9RYddXHNN3AD3lBWOI%3d&risl=&pid=ImgRaw&r=0"
                            alt="Movilidad sostenible en Bogotá"
                        />
                    </div>

                    <div className="benefits-text">
                        <h3>Beneficios para ti y tu ciudad</h3>
                        <p>
                            Cada viaje en <strong>UrBike</strong> contribuye a un futuro más limpio,
                            rápido y saludable 🌱
                        </p>

                        <ul>
                            <li>
                                <FaCheckCircle className="icon-check" />
                                <span>Ahorra tiempo en desplazamientos urbanos</span>
                            </li>
                            <li>
                                <FaCheckCircle className="icon-check" />
                                <span>Reduce tu huella de carbono</span>
                            </li>
                            <li>
                                <FaCheckCircle className="icon-check" />
                                <span>Evita el tráfico y el estrés</span>
                            </li>
                        </ul>

                        <div className="plan-card">
                            <div className="plan-icon">
                                <FaStar className="icon-star" />
                            </div>
                            <div>
                                <strong>Plan Mensual</strong>
                                <p>50 viajes por <b>$150,000</b> — ¡Ahorra hasta 60%!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};
