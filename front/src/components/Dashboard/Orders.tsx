import { useState } from "react";
import { FaWarehouse, FaShippingFast, FaHome } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";

const MyOrders = () => {
    // Datos de ejemplo de órdenes de compra
    const orders = [
        { id: 1, item: "Cyber Adventure Game", status: "In Warehouse", tracking: "123456789" },
        { id: 2, item: "Fantasy Quest Game", status: "In Transit", tracking: "987654321" },
        { id: 3, item: "Racing Mania Game", status: "Delivered", tracking: null }
    ];

    const [selectedOrder, setSelectedOrder] = useState<number|null>(null);

    const handleTrackClick = (orderId:number) => {
        // Alterna el estado de la orden seleccionada para mostrar u ocultar detalles de tracking
        setSelectedOrder(selectedOrder === orderId ? null : orderId);
    };

    const renderOrderStatusIcon = (status:string) => {
        switch (status) {
            case "In Warehouse":
                return <FaWarehouse className="text-gray-700 text-2xl" />;
            case "In Transit":
                return <FaShippingFast className="text-yellow-500 text-2xl" />;
            case "In Post Office":
                return <MdLocalShipping className="text-blue-500 text-2xl" />;
            case "Delivered":
                return <FaHome className="text-green-500 text-2xl" />;
            default:
                return null;
        }
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">Your Orders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map(order => (
                    <div key={order.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-700">{order.item}</h3>
                            {renderOrderStatusIcon(order.status)}
                        </div>
                        <p className="text-sm text-gray-600 mt-2">Status: {order.status}</p>

                        {/* Condición para mostrar el botón o el código de tracking basado en el estado */}
                        {order.status !== "Delivered" && (
                            <button
                                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => handleTrackClick(order.id)}
                            >
                                Track Order
                            </button>
                        )}
                        
                        {selectedOrder === order.id && order.status === "In Post Office" && (
                            <p className="text-sm text-gray-600 mt-2">Tracking Code: {order.tracking}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
