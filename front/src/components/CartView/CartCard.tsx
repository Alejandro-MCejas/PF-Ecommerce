"use client"

import { useCart } from "@/context/CartContext";
import Swal from "sweetalert2";
import CardCart from "../CartCard/CardCart";
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

export const CartView = () => {

    initMercadoPago('APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad');

    console.log(initMercadoPago("APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad"))

    //remplazo provisional useAuth()
    // const userSession = JSON.parse(localStorage.getItem("userSession") || "{}")
    // const role = userSession.user.id

    const { cart, removeFromCart, clearCart } = useCart();

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

    // const handlePurchase = async () => {
    //     const idProduct = cart.map((product) => product.id);

    //     if (userData?.user?.id) {
    //         try {
    //             const newOrder = await createOrder(idProduct, userData.token, userData.user.id);
    //             const storedUserToken = localStorage.getItem("userToken");
    //             if (storedUserToken) {
    //                 const parsedUserToken = JSON.parse(storedUserToken);
    //                 parsedUserToken.user.orders = parsedUserToken.user.orders || [];
    //                 parsedUserToken.user.orders.push(newOrder);
    //                 localStorage.setItem("userToken", JSON.stringify(parsedUserToken));
    //             }
    //             Swal.fire({
    //                 title: "Buy successfully",
    //                 width: 400,
    //                 padding: "3em",
    //             });
    //             clearCart();
    //         } catch (error) {
    //             console.error("Error creating order:", error);
    //         }
    //     } else {
    //         Swal.fire({
    //             title: "You have an error, please try again later",
    //             width: 400,
    //             padding: "3em",
    //         });
    //     }
    // };

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
                            <div className="w-full h-auto flex justify-center p-5 mt-auto">
                                    <button
                                        className="w-1/2 bg-green-600 rounded-lg text-[30px] font-bold hover:bg-green-400"
                                    // onClick={handlePurchase}
                                    >
                                        Purchase
                                    </button>
                                </div>
                        </div>
                    ) : (
                        <div className="flex flex-col justify-evenly min-h-[500px] items-center">
                            <h2 className="text-violet-500 font-tilt-neon text-[60px] text-center ">You don&apos;t have anything in your cart</h2>
                            <button className="w-[200px] h-[50px] bg-purple-500 rounded-md shadow-violet-400 shadow-2xl font-semibold text-white text-[20px]">Start Shopping</button>
                        </div>
                    )
                }
                <div>

                <Wallet initialization={{ preferenceId: 'wy9alYnxti0XI72y9zlseHC9ZZHNB6Vo' }} customization={{ texts:{ valueProp: 'smart_option'}}} />

                </div>

            </div>


        </div>
    )
}

export default CartView;