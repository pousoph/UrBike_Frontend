import React from "react";
import "../styles/dashboard.css";

export const Dashboard = () => {
    const nombre = localStorage.getItem("nombre");
    const saldo = localStorage.getItem("saldo");

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/"; // redirige al inicio
    };

    return (
        <main className="dashboard">
            <header className="dashboard-header">
                <h2>👋 Bienvenido, {nombre}</h2>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </header>

            <section className="dashboard-body">
                <div className="card">
                    <h3>Tu saldo actual</h3>
                    <p>${saldo}</p>
                </div>

                <div className="card">
                    <h3>Tus viajes recientes</h3>
                    <p>🚴‍♂️ 12 recorridos este mes</p>
                </div>

                <div className="card">
                    <h3>Impacto ambiental</h3>
                    <p>🌿 Has ahorrado 22kg de CO₂</p>
                </div>
            </section>
        </main>
    );
};
