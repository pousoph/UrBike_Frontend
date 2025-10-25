import React, { useState } from "react";
import "../styles/inicioViaje.css";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { LogOut, Bike, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { iniciarViaje } from "../services/viajeService.js";

export const InicioViaje = () => {
    const [numeroSerie, setNumeroSerie] = useState("");
    const [loading, setLoading] = useState(false);
    const [resultado, setResultado] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleIniciarViaje = async () => {
        if (!numeroSerie.trim()) {
            alert("Por favor ingresa el número de serie de la bicicleta.");
            return;
        }

        setLoading(true);
        try {
            const idViaje = await iniciarViaje(token, numeroSerie);

            if (idViaje === -1) {
                setResultado({
                    success: false,
                    message: "Tu reserva ha expirado. Realiza una nueva reserva.",
                });
            } else {
                setResultado({
                    success: true,
                    message: `Viaje iniciado correctamente (ID: ${idViaje})`,
                });
                localStorage.setItem("id_viaje", idViaje);
                localStorage.setItem("numero_serie", numeroSerie);

                setTimeout(() => navigate("/viaje-activo"), 1500);
            }
        } catch (error) {
            console.error("Error al iniciar el viaje:", error);
            setResultado({
                success: false,
                message: "Error al iniciar el viaje. Verifica el número de serie.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="inicio-container">
            <header className="inicio-header">
                <img src={logo} alt="UrBike" className="logo" />
                <button className="logout-btn" onClick={() => navigate("/")}>
                    <LogOut size={18} /> Salir
                </button>
            </header>

            <section className="inicio-box">
                <h1>
                    <Bike size={32} color="var(--color-primary)" /> Inicio de Viaje
                </h1>
                <p>Ingresa el número de serie de tu bicicleta para comenzar tu viaje.</p>

                <input
                    type="text"
                    placeholder="Ejemplo: BICI-123"
                    value={numeroSerie}
                    onChange={(e) => setNumeroSerie(e.target.value)}
                    className="input-serial"
                />

                <button
                    className="btn-iniciar"
                    onClick={handleIniciarViaje}
                    disabled={loading}
                >
                    {loading ? <Loader2 className="spin" /> : "Iniciar Viaje"}
                </button>

                {resultado && (
                    <div
                        className={`mensaje ${resultado.success ? "success" : "error"} animate`}
                    >
                        {resultado.success ? (
                            <CheckCircle2 color="var(--color-success)" size={40} />
                        ) : (
                            <XCircle color="var(--color-error)" size={40} />
                        )}
                        <p>{resultado.message}</p>
                    </div>
                )}
            </section>
        </main>
    );
};
