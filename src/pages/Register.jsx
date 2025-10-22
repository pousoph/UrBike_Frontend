import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/logo.svg";
import { registerUser } from "../services/UserService.js";

export const Register = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await registerUser(nombre, correo, contrasena);

            localStorage.setItem("token", data.token);
            localStorage.setItem("nombre", data.nombre);
            localStorage.setItem("saldo", data.saldo);

            setMensaje(`✅ Bienvenido ${data.nombre}, registro exitoso.`);

            setTimeout(() => navigate("/dashboard"), 1000);
        } catch {
            setMensaje("❌ Error al registrarse. Intenta nuevamente.");
        }
    };

    return (
        <main className="login">
            <section className="login-container">
                <div className="login-header">
                    <img src={logo} alt="UrBike logo" className="login-logo" />
                    <h2>
                        Crea tu cuenta en <span>UrBike</span>
                    </h2>
                    <p>Únete a la movilidad sostenible 🌿</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Nombre Completo</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu nombre completo"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="ejemplo@correo.com"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Registrarse
                    </button>

                    {mensaje && <p className="login-message">{mensaje}</p>}

                    <p className="register-text">
                        ¿Ya tienes cuenta?{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/login");
                            }}
                        >
                            Inicia sesión aquí
                        </a>
                    </p>
                </form>
            </section>
        </main>
    );
};
