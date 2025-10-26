import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/pagoForm.css";
import { createCharge } from "../services/pagoService.js";
import { CreditCard, CheckCircle2 } from "lucide-react";

export const PagoViaje = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { state } = useLocation();
    const factura = state?.factura;

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [cardComplete, setCardComplete] = useState(false);

    if (!factura) {
        return (
            <main className="payment-container">
                <h2>No hay información de factura</h2>
                <button onClick={() => navigate("/dashboard")}>Volver</button>
            </main>
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        if (!cardComplete) {
            setError("Por favor completa los datos de la tarjeta.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess(false);

        const { token, error: stripeError } = await stripe.createToken(
            elements.getElement(CardElement)
        );

        if (stripeError) {
            setError(`${stripeError.message}`);
            setLoading(false);
            return;
        }

        const payload = {
            "id-usuario": factura.idUsuario,
            "id-viaje": localStorage.getItem("id_viaje"),
            description: `Pago UrBike - Viaje ${localStorage.getItem("id_viaje")}`,
            amount: factura.total,
            currency: "COP",
            stripeEmail: localStorage.getItem("correo_usuario"),
            stripeToken: token.id,
        };

        try {
            await createCharge(payload);
            setSuccess(true);
            setLoading(false);

            localStorage.removeItem("id_viaje");
            localStorage.removeItem("numero_serie");
            localStorage.removeItem("inicio_viaje");
        } catch (err) {
            console.error("Error al crear el cargo:", err);
            setError("No se pudo procesar el pago. Intenta nuevamente.");
            setLoading(false);
        }
    };

    return (
        <main className="payment-bg">
            <section className="payment-card">
                <div className="factura-info">
                    <h2>Detalle del Viaje</h2>
                    <p><strong>Bicicleta:</strong> {factura.numeroSerie}</p>
                    <p><strong>Origen:</strong> {factura.estacionInicio}</p>
                    <p><strong>Destino:</strong> {factura.estacionFinal}</p>
                    <p><strong>Tarifa base:</strong> ${factura.tarifaBase?.toLocaleString() ?? 0} COP</p>
                    <p><strong>Minutos extra:</strong> {factura.minutosExtra ?? 0}</p>
                    <p><strong>Costo extra:</strong> ${factura.costoExtra?.toLocaleString() ?? 0} COP</p>
                    <hr />
                    <h3>Total a pagar:</h3>
                    <p className="factura-total">${factura.total.toLocaleString()} COP</p>
                </div>

                <div className="payment-form-side">
                    {success ? (
                        <div className="payment-success">
                            <CheckCircle2 size={70} color="var(--color-success)" />
                            <h3>¡Pago exitoso!</h3>
                            <p>Gracias por tu pago. Tu transacción fue procesada correctamente.</p>
                            <button onClick={() => navigate("/dashboard")} className="btn btn-primary">
                                Volver al inicio
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="payment-form">
                            <h2><CreditCard size={22} /> Datos de la Tarjeta</h2>
                            <div className="card-element-wrapper">
                                <CardElement
                                    options={{
                                        hidePostalCode: true,
                                        style: {
                                            base: {
                                                fontSize: "16px",
                                                color: "#333",
                                                "::placeholder": { color: "#a0aec0" },
                                                fontFamily: "Instrument Sans, sans-serif",
                                            },
                                            invalid: { color: "var(--color-error)" },
                                        },
                                    }}
                                    onChange={(e) => setCardComplete(e.complete)}
                                />
                            </div>

                            {error && <p className="error-message">{error}</p>}

                            <button
                                type="submit"
                                disabled={!stripe || loading}
                                className={`btn ${loading ? "btn-loading" : "btn-primary"}`}
                            >
                                {loading ? (
                                    <div className="loading-animation">
                                        <div className="dot dot1"></div>
                                        <div className="dot dot2"></div>
                                        <div className="dot dot3"></div>
                                    </div>
                                ) : (
                                    "Pagar ahora"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </section>
        </main>
    );
};
