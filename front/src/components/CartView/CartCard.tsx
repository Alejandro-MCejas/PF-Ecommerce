"use client";

import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";
import CardCart from "../CartCard/CardCart";
import { useEffect, useState } from "react";
import { OrderDataMP } from "@/interfaces/IOrder";
import PaymentButton from "../PaymentButton/PaymentButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createOrder, createPaymentMercadoPago } from "@/helpers/orderHelper";
import { useAuth } from "@/context/Authcontext";

export const CartView = () => {
  const { cart, removeFromCart, clearCart, orderData, setOrderData } = useCart();
  const { userData } = useAuth();
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [preferenceId, setPreferenceId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (cart.length > 0) {
      const totalAmount = cart.reduce((sum, product) => {
        const price = typeof product.price === "number" ? product.price : parseFloat(product.price as string);
        const quantity = product.quantity ?? 1; // Usa nullish coalescing para evitar `undefined`
        return sum + (isNaN(price) ? 0 : price * quantity);
      }, 0);
  
      // Redondear a 2 decimales para evitar discrepancias
      const roundedTotal = Math.round(totalAmount * 100) / 100;
  
      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        amount: roundedTotal, // Actualizar el monto total calculado
      }));
    }
  }, [cart, setOrderData]);
  
  
  

  const handleOnClick = async () => {
    setIsButtonVisible(false);
    setIsLoading(true);
  
    try {
      const productsData = cart.map((product) => ({
        id: product.id,
        quantity: product.quantity ?? 1, // Asegúrate de que la cantidad siempre esté definida
      }));
  
      const totalAmount = cart.reduce((sum, product) => {
        const price = typeof product.price === "number" ? product.price : parseFloat(product.price as string);
        const quantity = product.quantity ?? 1; // Usa nullish coalescing
        return sum + (isNaN(price) ? 0 : price * quantity);
      }, 0);
  
      const roundedTotal = Math.round(totalAmount * 100) / 100; // Redondear a 2 decimales
  
      // Crear los datos para enviar al backend
      const orderDataToSend = {
        userId: userData?.user.id,
        products: productsData,
        amount: roundedTotal,
      };
  
      console.log(orderDataToSend); // Verifica los datos enviados
      const orderResponse = await createOrder(orderDataToSend);
  
      if (orderResponse) {
        console.log("Orden creada:", orderResponse);
        const mercadoPagoOrder = await createPaymentMercadoPago(orderResponse.order.id);
  
        if (mercadoPagoOrder && mercadoPagoOrder.id) {
          setPreferenceId(mercadoPagoOrder.id);
        } else {
          throw new Error("Error al obtener la preferencia de Mercado Pago");
        }
      } else {
        console.log("Error al crear la orden.");
      }
    } catch (error) {
      console.error("Error en la transacción:", error);
      setIsButtonVisible(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const renderSpinner = () => {
    if (isLoading) {
      return (
        <div className="w-full justify-center flex items-center">
          <FontAwesomeIcon icon={faSpinner} spin className="text-white size-[100px]" />
        </div>
      );
    }
  };

  const handleDeleteProduct = (productId: string) => {
    Swal.fire({
      title: "You will delete this product from your cart!",
      text: "Are you sure?",
      icon: "warning",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
      }
    });
  };

  return (
    <div>
      <div>
        {cart && cart.length > 0 ? (
          <div>
            {cart.map((product) => (
              <div
                key={product.id}
                className="flex flex-col justify-evenly items-center w-full max-w-[1500px] min-h-[200px] m-auto h-full"
              >
                <CardCart
                  name={product.name}
                  image={product.image}
                  stock={product.stock}
                  price={product.price}
                  quantity={product.quantity} // Asegúrate de que `CardCart` soporte este prop
                  id={product.id}
                  onDelete={() => handleDeleteProduct(product.id)}
                />
              </div>
            ))}
            <div className="my-3 w-full border-white border-t-2 flex items-end justify-end">
              <p className="w-full text-white text-[20px] font-semibold flex justify-end items-end">
                Total amount: ${orderData.amount}
              </p>
            </div>

            {isButtonVisible && (
              <button
                className="w-full bg-green-600 rounded-lg text-[30px] font-bold hover:bg-green-400"
                onClick={handleOnClick}
              >
                Purchase
              </button>
            )}

            {isLoading && renderSpinner()}

            {preferenceId && (
              <div>
                <PaymentButton preferenceId={preferenceId} />
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col justify-evenly min-h-[500px] items-center">
            <h2 className="text-violet-500 font-tilt-neon text-[60px] text-center ">
              You don&apos;t have anything in your cart
            </h2>
            <button className="w-[200px] h-[50px] bg-purple-500 rounded-md shadow-violet-400 shadow-2xl font-semibold text-white text-[20px]">
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartView;
