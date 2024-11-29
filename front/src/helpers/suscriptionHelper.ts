
const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PreferenceResponse {
    id: string;
}

export const suscribeCybergamer = async (userId: string) => {
    try {
        const response = await fetch(`${API_URL}/suscription/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const preference: PreferenceResponse = await response.json();
        return preference;
    } catch (error) {
        console.error('Error al crear la preferencia:', error);

    }
}