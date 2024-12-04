import React, { useEffect, useState } from "react";
import { IOrderResponse } from "@/interfaces/IOrder";
import { IProduct } from "@/interfaces/IProduct";
import { fetchingProductByID } from "@/helpers/productHelper";
import { changeStatus } from "@/helpers/orderHelper"; // Importa el helper
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedOrder: IOrderResponse | null;
  userToken: string; // Asegúrate de pasar el token del usuario como prop
}

const ModalOrderInformation: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  selectedOrder,
  userToken,
}) => {
  const [detailedProducts, setDetailedProducts] = useState<IProduct[]>([]); // Estado para almacenar los productos detallados
  const [isUpdating, setIsUpdating] = useState(false); // Estado para manejar el botón de actualización
  const router = useRouter()
  useEffect(() => {
    const fetchProductDetails = async () => {
      if (selectedOrder) {
        try {
          const products = await Promise.all(
            selectedOrder.orderDetail.products.map(async (product) => {
              const productDetails = await fetchingProductByID(product.productId);
              return {
                ...productDetails,
                quantity: product.quantity, // Añade la cantidad de la orden
              };
            })
          );
          setDetailedProducts(products); // Almacena los productos detallados en el estado
        } catch (error) {
          console.error("Error fetching product details:", error);
        }
      }
    };

    if (isOpen && selectedOrder) {
      fetchProductDetails(); // Llama a la función si el modal está abierto y hay una orden seleccionada
    }
  }, [isOpen, selectedOrder]);

  const handleChangeStatus = async () => {
    if (!selectedOrder) return;

    setIsUpdating(true); // Bloquea el botón mientras se realiza la actualización
    try {
      const updatedStatus = await changeStatus(selectedOrder.order.id, userToken);

      if (updatedStatus) {
        alert(`Order status changed to: ${updatedStatus.order.status}`);

      } else {
        alert("Failed to change order status. Try again later.");
      }
      router.refresh()
    } catch (error) {
      console.error("Error changing order status:", error);
      alert("An error occurred while changing the order status.");
    } finally {
      
      setIsUpdating(false); // Libera el botón
    }
  };

  if (!isOpen || !selectedOrder) return null; // No renderiza si no está abierto o no hay orden seleccionada

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          X
        </button>
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
            {detailedProducts.map((product) => (
              <div
                key={product.id}
                className="p-2 border rounded flex items-center justify-between"
              >
                <div className="flex flex-col items-start">
                  <p>
                    <strong>Name:</strong> {product.name}
                  </p>
                  <p>
                    <strong>Price:</strong> ${product.price}
                  </p>
                </div>
                <div>
                  <img
                    src={product.image?.[0] || "/placeholder.png"} // Renderiza la imagen si está disponible
                    alt={product.name}
                    className="w-16 h-16 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleChangeStatus}
            disabled={isUpdating} // Desactiva el botón mientras se actualiza
          >
            {isUpdating ? "Updating..." : "Change Status"}
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalOrderInformation;

