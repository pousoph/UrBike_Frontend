export const createCharge = async (paymentData) => {
    try {
        const response = await fetch("http://localhost:8085/urbike/v1/pago/charge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paymentData),
        });

        if (!response.ok) throw new Error("Error en el servidor al procesar el pago");

        return await response.json();
    } catch (error) {
        console.error("Error al crear el cargo:", error);
        throw error;
    }
};
