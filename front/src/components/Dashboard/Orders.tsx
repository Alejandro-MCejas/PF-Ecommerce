"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/helpers/userHelper";
import { getOrderDetailById } from "@/helpers/orderHelper";
import { IOrderResponse } from "@/interfaces/IOrder";
import { IProduct } from "@/interfaces/IProduct";
import ModalOrderInformation from "../ModalOrderInformation/ModalOrderInformation";

const MyOrders = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<IOrderResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrderResponse | null>(null); // Orden seleccionada
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); // Carga de detalles
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  // Cargar todas las órdenes del usuario
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInformation = await getUserById(userId);
        if (!userInformation || !userInformation.orders) {
          console.error("No orders found for this user.");
          return;
        }

        const ordersData: IOrderResponse[] = userInformation.orders.map((order: any) => ({
          order: {
            id: order.id,
            date: order.date,
            status: order.status,
            user: order.user,
          },
          orderDetail: {
            id: "", // No se requiere cargar detalle completo inicialmente
            price: 0,
            products: [],
          },
        }));

        setOrders(ordersData);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [userId]);

  // Manejar la carga de detalles de una orden y abrir el modal
  const handleViewDetails = async (orderId: string) => {
    setIsLoadingDetails(true); // Inicia la carga
    try {
      const orderDetail = await getOrderDetailById(orderId); // Llamada al helper
      if (!orderDetail) {
        console.error("Order detail not found.");
        return;
      }

      // Construir el objeto detallado
      const detailedOrder = {
        order: orders.find((o) => o.order.id === orderId)?.order!,
        orderDetail: orderDetail.orderDetail,
      };
      setSelectedOrder(detailedOrder); // Actualiza la orden seleccionada
      setIsModalOpen(true); // Abre el modal
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoadingDetails(false); // Finaliza la carga
    }
  };

  // Cerrar el modal
  const handleCloseModal = () => {
    setSelectedOrder(null); // Limpia la orden seleccionada
    setIsModalOpen(false); // Cierra el modal
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Orders</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order.order.id} className="border p-4 rounded-lg">
              <p>
                <strong>Order ID:</strong> {order.order.id}
              </p>
              <p>
                <strong>Order date:</strong> {order.order.date}
              </p>
              <p>
                <strong>Status:</strong> {order.order.status}
              </p>
              <button
                className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                onClick={() => handleViewDetails(order.order.id)}
              >
                {isLoadingDetails && selectedOrder?.order.id === order.order.id
                  ? "Loading..."
                  : "View Details"}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal para mostrar los detalles */}
      <ModalOrderInformation
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        selectedOrder={selectedOrder}
      />
    </div>
  );
};

export default MyOrders;

