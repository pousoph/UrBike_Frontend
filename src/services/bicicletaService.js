import axios from "axios";

const API_URL = "http://localhost:8082/urbike/v1/bicicleta";

export const obtenerBicicletasPorEstacion = async (nombreEstacion) => {
    const response = await axios.get(`${API_URL}/nombre/${nombreEstacion}`);
    // Solo bicicletas disponibles
    return response.data.filter((bici) => bici.estado === "DISPONIBLE");
};
