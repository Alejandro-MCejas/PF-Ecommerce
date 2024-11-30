const API_URL = process.env.NEXT_PUBLIC_API_URL;

interface PreferenceResponse {
    preferenceId: string;
}

export const suscribeCybergamer = async (userId: string): Promise<PreferenceResponse> => {
    try {
        const response = await fetch(`${API_URL}/suscription/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data: PreferenceResponse = await response.json();
        console.log('Respuesta del backend:', data);
        return data;
    } catch (error) {
        console.error('Error al crear la preferencia:', error);
        throw error;
    }
};
