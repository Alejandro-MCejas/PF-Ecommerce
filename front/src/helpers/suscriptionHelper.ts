import { IProduct } from "@/interfaces/IProduct";
import { IUserInformation } from "@/interfaces/ISession";

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


export const cancelSuscription = async (userId:string):Promise<string | undefined> =>{
    try {
        const response = await fetch(`${API_URL}/suscription/cancel/${userId}`,{
            method:"POST"
        })
        const cancelResponse = await response.json()
        return cancelResponse
    } catch (error) {
        console.log(error)
    }
}

interface Suscription {
    price: string;
    id: string;
    productIds: string[];
    type: string;
    startDate: string;
    endDate: string;
    paymentId: string | null;
    status: string;
    user: IUserInformation;
    product: IProduct | null;
  }
  
  // Interfaz para la respuesta completa
  export interface SubscriptionResponse {
    suscription: Suscription;
    products: IProduct[];
  }

export const getSuscriptionInformation = async (userId:string): Promise <SubscriptionResponse | undefined>=>{
    try {
        const response = await fetch(`${API_URL}/suscription/${userId}`)
        const information = await response.json()
        console.log(information)
        debugger
        return information
    } catch (error) {
        console.log(error)
    }
}
