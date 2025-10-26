import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";
import logo from "../assets/logo.svg";
import { loginUser } from "../services/UserService.js";

export const Login = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [mensaje, setMensaje] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensaje("");

        try {
            const data = await loginUser(correo, contrasena);


            localStorage.setItem("token", data.token);
            localStorage.setItem("id_usuario", data.idUsuario || data.id);
            localStorage.setItem("nombre", data.nombre);
            localStorage.setItem("saldo", data.saldo);
            localStorage.setItem("correo_usuario", data.correo);

            setMensaje(`Bienvenido, ${data.nombre}! 🚴‍♂️`);

            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            console.error("Error de login:", error);
            setMensaje("Error al iniciar sesión. Verifica tus credenciales.");
        }
    };

    return (
        <main className="login">
            <section className="login-container">
                <div className="login-header">
                    <img src={logo} alt="UrBike logo" className="login-logo" />
                    <h2>
                        Bienvenido a <span>UrBike</span>
                    </h2>
                    <p>Inicia sesión para continuar tu viaje sostenible 🌿</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
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
                        Iniciar Sesión
                    </button>

                    {mensaje && <p className="login-message">{mensaje}</p>}

                    <p className="register-text">
                        ¿No tienes cuenta?{" "}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                navigate("/register");
                            }}
                        >
                            Regístrate aquí
                        </a>
                    </p>
                </form>
            </section>
        </main>
    );
};
