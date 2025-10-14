const API_URL = "http://localhost:8080/urbike/v1/usuario";

export const login = async (correo, contrasena) => {
    console.log("Enviando datos:", JSON.stringify({ correo, contrasena }));

    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ correo, contrasena }),
        });

        if (!response.ok) {
            throw new Error("Error al iniciar sesión");
        }

        const data = await response.json();
        console.log("Respuesta del backend:", data);
        return data;
    } catch (error) {
        console.error("Error en login:", error);
        throw error;
    }
};
