import axios from "axios";

const API_URL = "http://localhost:8083/urbike/v1/viaje";

export const iniciarViaje = async (token, numeroSerie) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const body = { numeroSerie };
    const response = await axios.post(`${API_URL}/inicio-viaje`, body, config);
    return response.data;
};


export const finalizarViaje = async (token, idViaje) => {
    const config = {
        headers: { Authorization: `Bearer ${token}` },
    };
    const body = { id_viaje: idViaje };
    const response = await axios.post(`${API_URL}/fin-viaje`, body, config);
    return response.data;
};
