const API_URL = "http://localhost:8060/urbike/v1/bicicleta/estacion";

export const getAllEstaciones = async () => {
    try {
        const response = await fetch(`${API_URL}/listar`);
        if (!response.ok) {
            throw new Error("Error al obtener las estaciones");
        }
        return await response.json();
    } catch (error) {
        console.error("Error en getAllEstaciones:", error);
        throw error;
    }
};
