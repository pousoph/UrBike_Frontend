import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Dashboard } from "../pages/Dashboard";
import {Register} from "../pages/Register.jsx";

export const AppRouter = () => {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {token && <Route path="/dashboard" element={<Dashboard />} />}
            </Routes>
        </BrowserRouter>
    );
};
