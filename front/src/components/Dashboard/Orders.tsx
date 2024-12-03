"use client";

import { useEffect, useState } from "react";
import { getUserById } from "@/helpers/userHelper";
import { getOrderDetailById } from "@/helpers/orderHelper";
import { IOrderResponse } from "@/interfaces/IOrder";

const MyOrders = ({ userId }: { userId: string }) => {
  const [orders, setOrders] = useState<IOrderResponse[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrderResponse | null>(null); // Orden seleccionada
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false); // Carga de detalles

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

  // Manejar la carga de detalles de una orden
  const handleViewDetails = async (orderId: string) => {
    setIsLoadingDetails(true); // Inicia la carga
    try {
      const orderDetail = await getOrderDetailById(orderId); // Llamada al helper
      console.log(orderDetail)
      debugger
      // Validar si orderDetail es null
      if (!orderDetail) {
        console.error("Order detail not found.");
        return;
      }
  
      // Construir el objeto detallado
      const detailedOrder = {
        order: orders.find((o) => o.order.id === orderId)?.order!,
        orderDetail: orderDetail.orderDetail, // Aquí ya es seguro acceder
      };
      setSelectedOrder(detailedOrder); // Actualiza la orden seleccionada
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setIsLoadingDetails(false); // Finaliza la carga
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Your Orders</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orders.map((order) => (
            <div key={order.order.id} className="border p-4 rounded-lg">
              <p>
                <strong>Order ID:</strong> {order.order.id}
              </p>
              <p>
                <strong>Status:</strong> {order.order.status}
              </p>
              <p>
                <strong>Products:</strong> {order.orderDetail.products.length}
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

      {/* Mostrar detalles de la orden seleccionada */}
      {selectedOrder && (
        <div className="mt-8 border p-4 rounded-lg">
          <h3 className="text-xl font-semibold">Order Details</h3>
          <p>
            <strong>Order ID:</strong> {selectedOrder.order.id}
          </p>
          <p>
            <strong>Status:</strong> {selectedOrder.order.status}
          </p>
          <p>
            <strong>Total Price:</strong> ${selectedOrder.orderDetail.price}
          </p>
          <div className="mt-4">
            <h4 className="font-semibold">Products:</h4>
            <div className="space-y-2">
              {selectedOrder.orderDetail.products.map((product) => (
                <div key={product.productId} className="p-2 border rounded">
                  <p>
                    <strong>Product Name:</strong> {product.productName}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {product.quantity}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <button
            className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setSelectedOrder(null)} // Cierra los detalles
          >
            Close Details
          </button>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
