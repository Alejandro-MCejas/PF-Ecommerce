import { getOrderDetailById } from "@/helpers/orderHelper";
import { getUserById } from "@/helpers/userHelper";
import { IOrder, OrderDetail, OrderDetailInformation } from "@/interfaces/IOrder";
import { useEffect, useState } from "react";
import { FaWarehouse, FaShippingFast, FaHome } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const MyOrders = ({ userId, token }: { userId: string, token: string }) => {
    const [ordersWithDetails, setOrdersWithDetails] = useState<OrderDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                // Obtén la información del usuario
                const userInformationById = await getUserById(userId);

                // Procesa las órdenes y sus detalles
                const orders = await Promise.all(
                    (userInformationById.orders || []).map(async (order: IOrder) => {
                        const orderDetailsResponse = await getOrderDetailById(order.id, token);
                        const orderDetail = orderDetailsResponse?.orderDetail || []; // Asegúrate de obtener el arreglo correcto
                        return {
                            order, // Información básica de la orden
                            orderDetail, // Detalles de los productos en la orden
                        } as OrderDetail;
                    })
                );

                setOrdersWithDetails(orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchOrders();
    }, [userId, token]);

    console.log(ordersWithDetails)

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Your Orders</h2>
            {ordersWithDetails.length > 0 ? (
                ordersWithDetails.map((orderDetail) => (
                    <div key={orderDetail.order.id} className="border p-4 rounded-lg">
                        <p className="text-gray-700 font-medium">
                            Order ID: {orderDetail.order.id}
                        </p>
                        <p className="text-gray-500 text-sm">
                            Date: {orderDetail.order.date}
                        </p>
                        <div className="flex flex-col gap-5">
                            {orderDetail.orderDetail.length > 0 ? (
                                orderDetail.orderDetail.map((product) => (
                                    <div key={product.id} className="rounded-xl flex justify-between">
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-sm text-gray-500">Price: ${product.price}</p>
                                            <p className="text-sm text-gray-500">Status of the payment:</p>
                                            <p className="text-sm text-gray-500">Status:</p>
                                        </div>
                                        <div>
                                            <img src={product.image[0]} alt="" className="max-w-[100px] max-h-[150px]" />
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No products found in this order.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No orders found.</p>
            )}
        </div>
    );
};

export default MyOrders;



// const [selectedOrder, setSelectedOrder] = useState<number|null>(null);

// const handleTrackClick = (orderId:number) => {
//     // Alterna el estado de la orden seleccionada para mostrar u ocultar detalles de tracking
//     setSelectedOrder(selectedOrder === orderId ? null : orderId);
// };