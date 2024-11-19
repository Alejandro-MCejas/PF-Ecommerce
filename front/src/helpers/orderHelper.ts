import { OrderData, OrderResponse } from "@/interfaces/IOrder";
import { IProduct } from "@/interfaces/IProduct";

const API_URL = process.env.NEXT_PUBLIC_API_URL;



export const createOrder = async (orderData: OrderData): Promise<OrderResponse | null> => {
    try {
        const response = await fetch(`${API_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${orderData.token}`, // si es necesario
            },
            body: JSON.stringify({
                userId: orderData.userId,
                products: orderData.products,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const order = await response.json();
        return order;
    } catch (error) {
        console.error("Error creando la orden:", error);
        return null; // Retorna null o un valor de fallback en caso de error
    }
};

interface PreferenceResponse {
  id: string;
}

export const createPaymentMercadoPago = async (orderId:string) => {
  try {
    const response =  await fetch(`${API_URL}/mercado-pago/create-pago/${orderId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${orderData.token}`, // si es necesario
        },
        // body: JSON.stringify({
        //     userId: orderData.userId,
        //     products: orderData.products,
        // }),
    })

    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }
    console.log(response)
    
    const preference: PreferenceResponse = await response.json();
    return preference;
  } catch (error) {
    console.error('Error al crear la preferencia:', error);
  }
};