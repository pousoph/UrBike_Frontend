import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Dashboard } from "../components/Dashboard.jsx";
import {Register} from "../pages/Register.jsx";
import {InicioViaje} from "../pages/InicioViaje.jsx";
import {ViajeActivo} from "../pages/ViajeActivo.jsx";
import {FinViaje} from "../pages/FinViaje.jsx";
import {PagoViaje} from "../pages/PagoViaje.jsx";
import {PagoSaldo} from "../pages/PagoSaldo.jsx";

export const AppRouter = () => {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {token && <Route path="/dashboard" element={<Dashboard />} />}
                <Route path="/inicio-viaje" element={<InicioViaje />} />
                <Route path="/viaje-activo" element={<ViajeActivo />} />
                <Route path="/fin-viaje" element={<FinViaje />} />
                <Route path="/pago-tarjeta" element={<PagoViaje />} />
                <Route path="/pago-saldo" element={<PagoSaldo />} />
            </Routes>
        </BrowserRouter>
    );
};
