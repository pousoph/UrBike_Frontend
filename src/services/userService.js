const API_URL = "http://localhost:8080/urbike/v1/usuario";

export const loginUser = async (correo, contrasena) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, contrasena }),
        });

        if (!response.ok) throw new Error("Error al iniciar sesión");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error en loginUser:", error);
        throw error;
    }
};

export const registerUser = async (nombre, correo, contrasena) => {
    try {
        const response = await fetch(`${API_URL}/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, correo, contrasena }),
        });

        if (!response.ok) throw new Error("Error al registrar usuario");

        await response.text(); // El backend retorna un mensaje simple
        const loginData = await loginUser(correo, contrasena);
        return loginData;
    } catch (error) {
        console.error("Error en registerUser:", error);
        throw error;
    }
};
