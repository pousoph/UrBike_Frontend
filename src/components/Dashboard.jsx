import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/dashboard.css";
import logo from "../assets/logo.svg";
import { getAllEstaciones } from "../services/stationService.js";
import { obtenerBicicletasPorEstacion } from "../services/bicicletaService.js";
import { crearReserva } from "../services/reservaService.js";
import {
    Bike,
    MapPin,
    LogOut,
    Wallet,
    RefreshCcw,
    ChevronRight,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- ICONO DE LAS ESTACIONES ---
const getIconColor = (capacidad) => {
    if (capacidad > 20) return "#2ecc71";
    if (capacidad > 10) return "#f1c40f";
    return "#e74c3c";
};

const createBikeIcon = (capacidad) => {
    const color = getIconColor(capacidad);
    return new L.DivIcon({
        html: `
      <div style="
          background-color: white;
          border: 3px solid ${color};
          border-radius: 50%;
          box-shadow: 0 0 10px ${color};
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
      ">
        <img 
          src="https://cdn-icons-png.flaticon.com/512/2972/2972185.png"
          alt="bike"
          width="24"
          height="24"
        />
      </div>
    `,
        iconSize: [44, 44],
        iconAnchor: [22, 44],
    });
};

// --- COMPONENTE PRINCIPAL ---
export const Dashboard = () => {
    const nombre = localStorage.getItem("nombre") || "Usuario";
    const saldo = localStorage.getItem("saldo") || "0";
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [estaciones, setEstaciones] = useState([]);
    const [drawer, setDrawer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [destino, setDestino] = useState("");
    const [resumen, setResumen] = useState(null);
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

    const iniciarReserva = async (estacionInicio) => {
        try {
            const bicicletas = await obtenerBicicletasPorEstacion(estacionInicio.nombre);
            if (bicicletas.length === 0) {
                alert("No hay bicicletas disponibles en esta estación.");
                return;
            }
            const randomBike = bicicletas[Math.floor(Math.random() * bicicletas.length)];
            setDrawer({
                visible: true,
                estacionInicio,
                bicicleta: randomBike,
            });
        } catch (error) {
            console.error("Error al iniciar reserva:", error);
        }
    };

    const confirmarReserva = async () => {
        if (!destino) {
            alert("Selecciona una estación de destino antes de confirmar.");
            return;
        }

        setLoading(true);
        try {
            const { estacionInicio, bicicleta } = drawer;
            const estacionDestino = estaciones.find(
                (e) => e.idEstacion === parseInt(destino)
            );

            const reservaData = {
                id_estacion_inicio: estacionInicio.idEstacion,
                id_estacion_final: estacionDestino.idEstacion,
                id_bicicleta: bicicleta.idBicicleta,
            };

            const response = await crearReserva(token, reservaData);
            navigate("/inicio-viaje", { state: { reserva: response } });
        } catch (error) {
            console.error("Error al crear reserva:", error);
            alert("Error al crear la reserva. Inténtalo nuevamente.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="dashboard">
            {/* NAVBAR SUPERIOR */}
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
                        <MapPin size={16} /> Estaciones
                    </button>
                </nav>
                <div className="nav-user">
                    <span>@{nombre}</span>
                    <button className="logout-btn" onClick={() => localStorage.clear()}>
                        <LogOut size={18} />
                    </button>
                </div>
            </header>

            {/* ENCABEZADO AMIGABLE */}
            <section className="dashboard-header">
                <div>
                    <h1>¡Hola, <span>{nombre}</span>!</h1>
                    <p>Tu movilidad sostenible comienza hoy 🌱</p>
                </div>
            </section>

            {/* CONTENIDO PRINCIPAL */}
            <section className="dashboard-body">
                {/* PANEL IZQUIERDO */}
                <div className="panel-izq">
                    <div className="saldo-box">
                        <div className="saldo-info">
                            <Wallet size={28} />
                            <div>
                                <h4>Saldo disponible</h4>
                                <h2>${saldo}</h2>
                            </div>
                        </div>
                        <button className="btn-recargar">
                            <RefreshCcw size={14} /> Recargar
                        </button>
                    </div>

                    <div className="stations-box">
                        <h3>Estaciones disponibles</h3>
                        <ul>
                            {estaciones.map((e) => (
                                <li key={e.idEstacion}>
                                    <div>
                                        <h4>{e.nombre}</h4>
                                        <p>Capacidad: {e.capacidad}</p>
                                    </div>
                                    <button
                                        className="btn-reservar"
                                        onClick={() => iniciarReserva(e)}
                                    >
                                        Reservar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* PANEL DERECHO: MAPA */}
                <div className="panel-der">
                    <MapContainer
                        center={[4.6097, -74.0817]}
                        zoom={13}
                        className="mapa"
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
                                icon={createBikeIcon(est.capacidad)}
                            >
                                <Tooltip>{est.nombre}</Tooltip>
                                <Popup>
                                    <h3>{est.nombre}</h3>
                                    <p>Capacidad: {est.capacidad}</p>
                                    <button
                                        className="btn-popup"
                                        onClick={() => iniciarReserva(est)}
                                    >
                                        Reservar
                                    </button>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </section>

            {/* PANEL LATERAL DE RESERVA */}
            {drawer?.visible && (
                <aside className="drawer">
                    <div className="drawer-header">
                        <h2>Reserva tu bicicleta</h2>
                        <button onClick={() => setDrawer(null)}>
                            <XCircle size={20} />
                        </button>
                    </div>

                    <div className="drawer-content">
                        <div className="step">
                            <h4>1. Estación de origen</h4>
                            <p>{drawer.estacionInicio.nombre}</p>
                        </div>
                        <div className="step">
                            <h4>2. Bicicleta asignada</h4>
                            <p>
                                #{drawer.bicicleta.idBicicleta} ({drawer.bicicleta.tipo})
                            </p>
                        </div>
                        <div className="step">
                            <h4>3. Selecciona tu destino</h4>
                            <select
                                value={destino}
                                onChange={(e) => setDestino(e.target.value)}
                                className="select-destino"
                            >
                                <option value="">-- Elegir estación --</option>
                                {estaciones
                                    .filter((e) => e.idEstacion !== drawer.estacionInicio.idEstacion)
                                    .map((e) => (
                                        <option key={e.idEstacion} value={e.idEstacion}>
                                            {e.nombre}
                                        </option>
                                    ))}
                            </select>
                        </div>

                        <button
                            className="btn-confirmar"
                            onClick={confirmarReserva}
                            disabled={loading}
                        >
                            {loading ? "Creando reserva..." : "Confirmar y continuar"}
                            <ChevronRight size={16} />
                        </button>

                        {resumen && (
                            <div className="resumen">
                                <CheckCircle2 color="var(--color-success)" size={40} />
                                <h3>Reserva Confirmada</h3>
                                <p>
                                    Bicicleta #{resumen.id_bicicleta} — {resumen.tipoBicicleta}
                                </p>
                                <p>
                                    Estación: <strong>{resumen.nombreEstacion}</strong>
                                </p>
                            </div>
                        )}
                    </div>
                </aside>
            )}
        </main>
    );
};
