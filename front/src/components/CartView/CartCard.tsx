"use client"

import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";
import CardCart from "../CartCard/CardCart";
import { useEffect, useState } from "react";
import { OrderDataMP } from "@/interfaces/IOrder";
import StartTransaction from "../StartTransactionButton/StartTransactionButton";
import PaymentButton from "../PaymentButton/PaymentButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { createOrder, createPaymentMercadoPago } from "@/helpers/orderHelper";
import { useAuth } from "@/context/Authcontext";
// import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export const CartView = () => {
    const { cart, removeFromCart, clearCart, orderData, setOrderData } = useCart();
    const { userData } = useAuth();
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [preferenceId, setPreferenceId] = useState <string | null> (null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (cart.length > 0) {
            const totalAmount = cart.reduce((sum, product) => sum + product.price, 0);

            // Usa la función de callback de setOrderData con el tipo adecuado
            setOrderData((prevOrderData: OrderDataMP) => ({
                ...prevOrderData,
                amount: totalAmount,
                description: "Products in cart"
            }));
        }
    }, [cart, setOrderData]);

    // const handleOnClick = async () => {
    //     setIsButtonVisible(false); // Oculta el botón de "Purchase"
    //     setIsLoading(true)
    //     fetch("http://localhost:8080/create_preference", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(orderData),
    //     })
    //         .then((response) => {
    //             return response.json();
    //         })
    //         .then((preference) => {
    //             setPreferenceId(preference.id);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //             setIsButtonVisible(true); // Vuelve a mostrar el botón en caso de error
    //             setIsLoading(false)
    //         }).finally(() => {
    //             setIsLoading(false);
    //         })
    // }
    const handleOnClick = async () => {
        setIsButtonVisible(false);
        setIsLoading(true);

        try {
            const productsId = cart.map((product: { id: string }) => ({ id: product.id }));

            const orderData = {
                userId: userData?.user.id,
                products: productsId,
            };

            const orderResponse = await createOrder(orderData);

            if (orderResponse) {
                console.log('Orden creada:', orderResponse);
                const mercadoPagoOrder = await createPaymentMercadoPago(orderResponse.order.id);

                if (mercadoPagoOrder && mercadoPagoOrder.id) {
                    setPreferenceId(mercadoPagoOrder.id);
                } else {
                    throw new Error('Error al obtener la preferencia de Mercado Pago');
                }
            } else {
                console.log('Error al crear la orden.');
            }
        } catch (error) {
            console.error('Error en la transacción:', error);
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
            )
        }
    }


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
                {
                    cart && cart.length > 0 ? (
                        <div>
                            {
                                cart.map((product) => (
                                    <div
                                        key={product.id}
                                        className="flex flex-col justify-evenly items-center w-full max-w-[1500px] min-h-[200px] m-auto h-full"
                                    >
                                        <CardCart
                                            name={product.name}
                                            image={product.image}
                                            stock={product.stock}
                                            price={product.price}
                                            id={product.id}
                                            onDelete={() => handleDeleteProduct(product.id)}

                                        />
                                    </div>
                                ))

                            }
                            <p>Total amount: ${orderData.amount}</p>

                            {isButtonVisible && (
                                <button
                                    className="w-1/2 bg-green-600 rounded-lg text-[30px] font-bold hover:bg-green-400"
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
                            <h2 className="text-violet-500 font-tilt-neon text-[60px] text-center ">You don&apos;t have anything in your cart</h2>
                            <button className="w-[200px] h-[50px] bg-purple-500 rounded-md shadow-violet-400 shadow-2xl font-semibold text-white text-[20px]">Start Shopping</button>
                        </div>
                    )
                }
                <div>

                </div>

            </div>


        </div>
    )
}

export default CartView;