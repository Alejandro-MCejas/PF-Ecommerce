// import { IOrder, OrderData, OrderDetail, OrderDetailInformation, OrderResponse } from "@/interfaces/IOrder";
import { IOrder, IOrderResponse, OrderData, OrderDetailInformation, OrderResponse } from "@/interfaces/IOrder";
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

export const createPaymentMercadoPago = async (orderId: string) => {
  try {
    const response = await fetch(`${API_URL}/mercado-pago/create-pago/${orderId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const getOrderDetailById = async (orderId: string): Promise<IOrderResponse | null> => {
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}`, {
      headers: {
        // Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error al obtener el detalle de la orden: ${response.statusText}`);
    }

    const orderDetail: IOrderResponse = await response.json();
    console.log(orderDetail)
    return orderDetail;
  } catch (error) {
    console.error("Error al obtener el detalle de la orden:", error);
    return null;
  }
};

// Interfaz para cambiar el estado de una orden
interface ChangeStatusResponse {
  message: string;
  order: IOrder;
}


interface changeStatus{
  message:string,
  order:IOrder
}

export const changeStatus = async (orderId: string, token: string): Promise<changeStatus | null> => {
  try {
    const response = await fetch(`${API_URL}/orders/changeStatus`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Asegúrate de que el backend reconozca el formato JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId }), // Convertir el objeto a JSON
    });

    if (!response.ok) {
      throw new Error(`Error changing status: ${response.statusText}`);
    }

    const newState: changeStatus = await response.json();
    return newState;
  } catch (error) {
    console.log("Error en:", error);
    return null;
  }
};


