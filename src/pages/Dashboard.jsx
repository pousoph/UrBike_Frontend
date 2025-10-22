import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/dashboard.css";
import logo from "../assets/logo.svg";
import { getAllEstaciones } from "../services/stationService.js";
import {
    Bike,
    MapPin,
    Wallet,
    LogOut,
    CreditCard,
    RefreshCcw,
} from "lucide-react";

// 🔹 Color de icono según capacidad
const getIconColor = (capacidad) => {
    if (capacidad > 20) return "#2ecc71"; // verde
    if (capacidad > 10) return "#f1c40f"; // amarillo
    return "#e74c3c"; // rojo
};

// 🔹 Crear ícono dinámico de bicicleta
const createBikeIcon = (capacidad, isActive = false) => {
    const color = getIconColor(capacidad);
    const shadow = isActive ? `0 0 20px ${color}` : `0 0 12px ${color}`;
    const scale = isActive ? 1.2 : 1;

    return new L.DivIcon({
        html: `
      <div style="
          background-color: white;
          border: 3px solid ${color};
          border-radius: 50%;
          box-shadow: ${shadow};
          width: ${46 * scale}px;
          height: ${46 * scale}px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
      ">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          alt="bike"
          width="${24 * scale}"
          height="${24 * scale}"
          style="filter: drop-shadow(0 0 3px rgba(0,0,0,0.3));"
        />
      </div>
    `,
        className: "",
        iconSize: [46, 46],
        iconAnchor: [23, 46],
        popupAnchor: [0, -40],
    });
};

export const Dashboard = () => {
    const nombre = localStorage.getItem("nombre") || "Usuario";
    const saldo = localStorage.getItem("saldo") || "0";
    const [estaciones, setEstaciones] = useState([]);
    const [activeStation, setActiveStation] = useState(null);
    const mapRef = useRef(null);

    useEffect(() => {
        const fetchEstaciones = async () => {
            try {
                const data = await getAllEstaciones();
                setEstaciones(data);
            } catch (error) {
                console.error("Error al cargar estaciones:", error);
            }
        };
        fetchEstaciones();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/";
    };

    const focusStation = (est) => {
        if (mapRef.current) {
            mapRef.current.setView([est.latitud, est.longitud], 15, { animate: true });
            setActiveStation(est.idEstacion);
            // Resalta la estación por 2 segundos
            setTimeout(() => setActiveStation(null), 2000);
        }
    };

    return (
        <main className="dashboard">
            {/* NAVBAR */}
            <header className="dashboard-nav">
                <div className="nav-left">
                    <img src={logo} alt="UrBike" className="nav-logo" />
                    <span className="brand">UrBike</span>
                </div>
                <nav className="nav-menu">
                    <button className="nav-item active">
                        <Bike size={16} /> Inicio
                    </button>
                    <button className="nav-item">
                        <CreditCard size={16} /> Pagos
                    </button>
                    <button className="nav-item">
                        <MapPin size={16} /> Perfil
                    </button>
                </nav>
                <button className="logout-btn" onClick={handleLogout}>
                    <LogOut size={18} />
                </button>
            </header>

            {/* SALUDO */}
            <section className="dashboard-greeting">
                <h1>
                    ¡Hola, <span className="highlight">@{nombre}</span>!
                </h1>
            </section>

            {/* TARJETAS DE INFORMACIÓN */}
            <section className="info-section">
                <div className="info-card">
                    <div>
                        <h4>Saldo Disponible</h4>
                        <h2>${saldo}</h2>
                    </div>
                    <button className="btn-primary-outline">
                        <RefreshCcw size={14} /> Recargar
                    </button>
                </div>

                <div className="info-card">
                    <div>
                        <h4>Plan Activo</h4>
                        <h3>Pago por Uso</h3>
                    </div>
                    <button className="btn-primary-outline">
                        <Wallet size={14} /> Ver Plan
                    </button>
                </div>
            </section>

            {/* MAPA INTERACTIVO */}
            <section className="map-section">
                <MapContainer
                    center={[4.6097, -74.0817]}
                    zoom={13}
                    className="map"
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {estaciones.map((est) => (
                        <Marker
                            key={est.idEstacion}
                            position={[est.latitud, est.longitud]}
                            icon={createBikeIcon(est.capacidad, activeStation === est.idEstacion)}
                        >
                            <Tooltip direction="top" offset={[0, -20]} opacity={0.9}>
                                <strong>{est.nombre}</strong>
                            </Tooltip>
                            <Popup>
                                <h3>{est.nombre}</h3>
                                <p>
                                    <strong>Categoría:</strong> {est.categoria}
                                </p>
                                <p>
                                    <strong>Capacidad:</strong> {est.capacidad}
                                </p>
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        alert(`🚴 Reserva confirmada en ${est.nombre}`)
                                    }
                                >
                                    Reservar
                                </button>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </section>

            {/* ESTACIONES CERCANAS */}
            <section className="stations-section">
                <h3>
                    <MapPin size={18} /> Estaciones Cercanas
                </h3>

                <div className="stations-list">
                    {estaciones.map((est) => (
                        <div className="station-item" key={est.idEstacion}>
                            <div className="station-info">
                                <h4>{est.nombre}</h4>
                                <p>
                                    <MapPin size={12} /> Capacidad: {est.capacidad} | {est.categoria}
                                </p>
                            </div>
                            <div className="station-actions">
                                <button
                                    className="btn-outline"
                                    onClick={() => focusStation(est)}
                                >
                                    Ver en mapa
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={() =>
                                        alert(`Reserva realizada en ${est.nombre}`)
                                    }
                                >
                                    Reservar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};
