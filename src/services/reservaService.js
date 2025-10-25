export const crearReserva = async (token, reservaData) => {
    try {
        const response = await fetch("http://localhost:8083/urbike/v1/viaje/reserva", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(reservaData),
        });

        if (!response.ok) {
            throw new Error("Error al crear la reserva");
        }

        const data = await response.json();
        console.log("Reserva creada:", data);
        return data;
    } catch (error) {
        console.error("Error en crearReserva:", error);
        throw error;
    }
};
