"use client";

import { useAuth } from "@/context/Authcontext";
import { useCart } from "@/context/CartContext";
import { IProduct } from "@/interfaces/IProduct";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export const AddToCart = ({ id, name, image, description, stock, price }: { id: string, name: string, image: string[], description: string, stock: number, price: number }) => {
    const router = useRouter();
    const { addToCart } = useCart();

    const {userData} = useAuth()
    const role = userData?.user.admin;

    const hanldeAddToCart = () => {
        if (userData?.token) {
            const cart = JSON.parse(localStorage.getItem("cart") || "[]");
            const productExist = cart.some((product: IProduct) => {
                if (product.id === id) return true;
                return false;
            });
            if (productExist) {
                Swal.fire({
                    title: "This product already exists in your cart",
                    width: 400,
                    padding: "3em"
                });
                router.push("/cart");
            } else {
                Swal.fire({
                    title: "You will add this product to your cart!",
                    text: "Are you sure?",
                    icon: "warning",
                    confirmButtonColor: "#3085d6",
                }).then((result) => {
                    if (result.isConfirmed) {
                        addToCart({ id, name, image, description, stock, price });
                        Swal.fire("Added!", "The product has been added to your cart.", "success");
                    }
                });
            }
        } else {
            Swal.fire({
                title: "Stop!",
                text: "You must be logged in to add products!",
                icon: "warning",
                confirmButtonColor: "#3085d6",
            }).then((result) => {
                if (result.isConfirmed) {
                    router.push("/login");
                }
            });
        }
    };

    return (
        <button onClick={hanldeAddToCart} className="w-[300px] h-[50px] bg-violet-500 text-white px-4 py-2 rounded">
            Add to Cart
        </button>
    );
};

export default AddToCart;
