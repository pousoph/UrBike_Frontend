import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/finViaje.css";
import { CheckCircle2, Bike, Wallet, CreditCard } from "lucide-react";

export const FinViaje = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const factura = state?.factura;

    if (!factura) {
        return (
            <main className="fin-viaje">
                <h2>No hay información de factura</h2>
                <button onClick={() => navigate("/dashboard")}>Volver</button>
            </main>
        );
    }

    const duracion = factura.minutosExtra
        ? factura.minutosExtra + (factura.tarifaBase === 17500 ? 45 : 75)
        : factura.tarifaBase === 17500
            ? 45
            : 75;

    return (
        <main className="fin-viaje">
            <section className="fin-card">
                <div className="icono-exito">
                    <CheckCircle2 size={70} strokeWidth={2} />
                </div>

                <h1>¡Viaje Completado!</h1>
                <p className="agradecimiento">
                    Gracias por usar <strong>UrBike</strong> 🚴‍♀️
                </p>

                <div className="factura-detalle">
                    <div className="detalle-item">
                        <Bike size={20} color="var(--color-primary)" />
                        <p>
                            <strong>Bicicleta:</strong> {factura.numeroSerie}
                        </p>
                    </div>
                    <p>
                        <strong>Origen:</strong> {factura.estacionInicio}
                    </p>
                    <p>
                        <strong>Destino:</strong> {factura.estacionFinal}
                    </p>
                    <p>
                        <strong>Duración:</strong> {duracion} min
                    </p>
                    <hr />
                    <p className="total">
                        <strong>Total:</strong> ${factura.total.toLocaleString()}
                    </p>
                </div>

                <div className="opciones-pago">
                    <button
                        className="btn-pago-saldo"
                        onClick={() => navigate("/pago-saldo", { state: { factura } })}
                    >
                        <Wallet size={18} /> Pagar con Saldo
                    </button>

                    <button
                        className="btn-pago-tarjeta"
                        onClick={() => navigate("/pago-tarjeta", { state: { factura } })}
                    >
                        <CreditCard size={18} /> Pagar con Tarjeta
                    </button>
                </div>
            </section>
        </main>
    );
};
