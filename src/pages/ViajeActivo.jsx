import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { finalizarViaje } from "../services/viajeService";
import "../styles/viajeActivo.css";
import { Loader2, Clock, Bike, CheckCircle2, XCircle, LogOut } from "lucide-react";

export const ViajeActivo = () => {
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);
    const [tiempo, setTiempo] = useState(0);
    const navigate = useNavigate();

    const idViaje = localStorage.getItem("id_viaje");
    const numeroSerie = localStorage.getItem("numero_serie");

    useEffect(() => {
        const inicioGuardado = localStorage.getItem("inicio_viaje");
        const inicio = inicioGuardado ? parseInt(inicioGuardado) : Date.now();
        if (!inicioGuardado) localStorage.setItem("inicio_viaje", inicio.toString());

        const intervalo = setInterval(() => {
            setTiempo(Math.floor((Date.now() - inicio) / 1000));
        }, 1000);

        return () => clearInterval(intervalo);
    }, []);

    const formatoTiempo = (segundos) => {
        const horas = Math.floor(segundos / 3600);
        const minutos = Math.floor((segundos % 3600) / 60);
        const seg = segundos % 60;
        return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}:${String(seg).padStart(2, "0")}`;
    };

    const handleFin = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("token");
            const factura = await finalizarViaje(token, parseInt(idViaje));

            setMensaje("Viaje finalizado correctamente ✅");


            setTimeout(() => navigate("/fin-viaje", { state: { factura } }), 1500);
        } catch (error) {
            console.error(error);
            setMensaje("No se pudo finalizar el viaje. Verifica tu ubicación.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="viaje-activo-wrapper">
            <header className="viaje-header">
                <button className="logout" onClick={() => navigate("/")}>
                    <LogOut size={18} /> Salir
                </button>
            </header>

            <section className="viaje-card">
                <h1 className="titulo">
                    <Bike size={28} color="var(--color-primary)" />
                    Viaje en curso
                </h1>

                <div className="info">
                    <p><strong>ID del viaje:</strong> {idViaje}</p>
                    <p><strong>Bicicleta:</strong> {numeroSerie}</p>
                </div>

                <div className="timer">
                    <Clock size={22} />
                    <span>{formatoTiempo(tiempo)}</span>
                </div>

                <button
                    className="btn-finalizar"
                    onClick={handleFin}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="spin" /> Finalizando...
                        </>
                    ) : (
                        "Finalizar viaje"
                    )}
                </button>

                {mensaje && (
                    <div
                        className={`mensaje ${
                            mensaje.includes("✅") ? "success" : "error"
                        }`}
                    >
                        {mensaje.includes("✅") ? (
                            <CheckCircle2 color="var(--color-success)" size={28} />
                        ) : (
                            <XCircle color="var(--color-error)" size={28} />
                        )}
                        <p>{mensaje}</p>
                    </div>
                )}
            </section>
        </main>
    );
};
