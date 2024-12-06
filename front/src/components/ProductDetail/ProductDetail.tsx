"use client"

import { IProduct } from "@/interfaces/IProduct";
import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Swal from "sweetalert2";
import ModalEditGame from "../ModalEditGame/ModalEditGame";
import AddToCart from "../AddToCart/AddToCart";
import { deleteProductByID, editProductInformationByID, reclaimeProduct } from "@/helpers/productHelper";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import ModalApplyDiscount from "../ModalAddDiscount/ModalAddDiscount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { addFavorite, eliminateFavorite, getFavorites } from "@/helpers/userHelper";
import Favorites from "../Dashboard/Favorites";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import Link from "next/link";

interface ProductDetail {
    product: IProduct;
}

const ProductDetail: React.FC<ProductDetail> = ({ product }: { product: IProduct }) => {
    const { userData } = useAuth()
    const [rating, setRating] = useState(0);
    const [activeImage, setActiveImage] = useState(product.image[0]);
    const router = useRouter()
    // const [favorite, setFavorite] = useState<boolean>(false)

    const price = typeof product.price === "string" ? parseFloat(product.price) : product.price;
    const discount = typeof product.discount === "string" ? parseFloat(product.discount) : product.discount;
    const discountedPrice = discount > 0 ? Math.floor((price - (price * discount) / 100) * 100) / 100 : price;
    // console.log(discountedPrice)

    const handleDeleteGame = () => {
        if (!userData?.token) {
            Swal.fire({
                title: "Error",
                text: "User token is missing. Please log in again.",
                icon: "error"
            });
            return;
        }

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteProductByID(product.id, userData.token);
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                router.push("/products");
            }
        });
    };



    const handleAddCyberGamer = async () => {
        if (!userData?.token) {
            Swal.fire({
                title: "Error",
                text: "User token is missing. Please log in again.",
                icon: "error"
            });
            return; // Salir de la función si el token no está presente
        }

        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You will add this game to CyberGamer",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
        });

        if (result.isConfirmed) {
            // Crear una copia del producto y cambiar la propiedad `suscription` a true
            const updatedProduct = { ...product, suscription: true };
            try {
                await editProductInformationByID(updatedProduct, userData.token);
                Swal.fire({
                    title: "Added successfully!",
                    text: "The game is now in CyberGamer",
                    icon: "success"
                });
            } catch (error) {
                Swal.fire({
                    title: "Ups, something went wrong!",
                    text: "The game couldn't be added",
                    icon: "error"
                });
            }
        }
    };

    const handleClaimeProduct = async () => {
        if (userData?.user.isSuscription === true && product.suscription === true) {
            try {
                const result = await Swal.fire({
                    title: "You will reclaime this free product?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, reclaime it!",
                });

                if (result.isConfirmed) {
                    try {
                        const response = await reclaimeProduct(userData.user.id, product.id);
                        if(response.ok){
                            Swal.fire({
                                title: "Reclaime!",
                                text: "Your product has been reclaimed.",
                                icon: "success",
                            });
                        }
                    } catch (error) {
                        console.log(error)
                        Swal.fire({
                            title: "Ups,you have already take it!",
                            text: "Check your email",
                            icon: "warning",
                        });
                    }
                }
            } catch (error) {
                console.log(error)
                Swal.fire({
                    title: "Ups, something went wrong!",
                    text: "Try again later",
                    icon: "warning",
                });
            }
        }
    };


    return (
        <div className="w-full">
            {/* Imagen e informacion */}
            < div className="flex flex-col md:flex-row w-full justify-evenly items-center" >
                {/* Imagen */}
                <div className="flex flex-col md:flex-row w-full md:min-w-[550px] md:min-h-[700px] md:max-w-[550px] md:max-h-[750px] items-center justify-center">
                    {/* Contenedor de miniaturas */}
                    <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible w-full md:w-[150px] h-auto md:h-[600px] justify-center items-center md:justify-evenly">
                        {product.image.map((image, index) => (
                            <div
                                key={index}
                                className="cursor-pointer border-2 border-transparent hover:border-blue-500 flex-shrink-0"
                                onClick={() => setActiveImage(image)}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index}`}
                                    className="w-[60px] h-[60px] md:w-[80px] md:h-[80px] object-cover rounded-sm"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Contenedor de la imagen principal */}
                    <div className="flex justify-center items-center w-full max-w-[400px] min-h-[400px] max-h-[450px] md:max-h-[800px] overflow-hidden p-5">
                        <img
                            src={activeImage}
                            alt="bannerImg"
                            className="w-full max-h-[400px] md:w-[400px] md:h-[650px] object-contain rounded-md"
                        />
                    </div>
                </div>


                {/* Informacion */}
                < div className="w-full md:w-1/2 md:min-w-[700px] md:min-h-[750px]  md:max-h-[750px] bg-white border-2 border-black flex justify-center items-start rounded-md" >
                    <div className="w-full md:h-[750px] flex flex-col justify-evenly items-start p-10">
                        <div className="w-full flex justify-end items-end">
                            <FavoriteButton
                                userId={userData?.user.id || ""}
                                productId={product.id}
                            />
                        </div>
                        <div className="flex flex-col justify-evenly items-start h-[200px] mt-0">
                            <h2 className="text-[30px] md:text-[48px] font-semibold">{product.name}</h2>
                            {/* Sistema de puntuacion de estrellas */}
                            <div>
                                {
                                    userData ? (
                                        <StarRating
                                            productId={product.id}
                                            userId={userData?.user.id}
                                            token={userData?.token}
                                            onReviewSubmitted={() => {
                                                // Actualiza la lista de reseñas o realiza otra acción
                                                console.log("Review submitted successfully!");
                                            }}
                                        />
                                    ) : (
                                        <div>
                                            You must be loggin to vote
                                        </div>
                                    )
                                }

                            </div>
                            {
                                product.suscription === true ? (
                                    <h3 className="bg-violet-500 p-1 text-white font-italic text-[20px]">Play with CyberGamer</h3>
                                ) : (
                                    <div>

                                    </div>
                                )
                            }
                        </div>
                        <div>
                            {/* Mostrar el precio dinámicamente */}
                            {
                                discount === 0 ? (
                                    <div>
                                        <p className="text-[60px] md:text-[98px] font-black">${product.price}</p>
                                    </div>
                                ) : (
                                    <div>
                                        <p className="text-[60px] md:text-[98px] font-black">${discountedPrice}</p>
                                        <p className="text-[16px] md:text-[24px] text-gray-500 line-through">
                                            Original: ${product.price}
                                        </p>
                                    </div>
                                )
                            }


                        </div>
                        {
                            product.stock === 0 ? (
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-[20px] md:text-[36px] font-semibold">No stock available</p>
                                </div>
                            ) : product.stock < 10 ? (
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-[20px] md:text-[36px] font-semibold">Stock available</p>
                                    <p className="text-[20px] md:text-[26px] font-semibold ">Only {product.stock} games available!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-[20px] md:text-[36px] font-semibold">Stock available</p>
                                </div>
                            )
                        }
                        <div className="w-full">
                            {/* Lógica de botones según el rol */}
                            {userData?.user.admin !== "admin" ? (
                                userData?.user.admin !== "user" ? (
                                    // Mostrar solo botón de comprar si el rol no es admin ni user
                                    <div className="w-full flex justify-center items-center">
                                        <Link href="/login" className="w-full md:w-1/2 bg-violet-500 text-white text-center font-bold px-4 py-2 m-auto rounded hover:bg-violet-300">Buy now</Link>
                                    </div>
                                ) : userData.user.isSuscription === true && product.suscription === true ? (
                                    <div className="w-full flex items-center flex-col gap-3">
                                        <AddToCart
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            stock={product.stock}
                                            price={discountedPrice !== price ? discountedPrice : price}
                                            image={product.image}
                                        />
                                        <button
                                            onClick={handleClaimeProduct}
                                            className=" w-[300px] h-[50px] bg-purple-500 text-white px-4 py-2 rounded"
                                        >Reclaime product</button>
                                    </div>
                                ) : (
                                    // Mostrar botones de "Add to Cart" y "Buy Now" si el rol es user
                                    <div className="w-full flex items-center flex-col gap-3">
                                        <AddToCart
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            stock={product.stock}
                                            price={discountedPrice !== price ? discountedPrice : price}
                                            image={product.image}
                                        />
                                        {/* <button className=" w-[300px] h-[50px] bg-purple-500 text-white px-4 py-2 rounded">Buy Now</button> */}
                                    </div>
                                )
                            ) : (
                                // Mostrar botones de "Edit", "Subscription" y "Delete" si el rol es admin
                                <div className="w-full flex flex-col items-center gap-4">
                                    <ModalEditGame
                                            product={product}
                                        />
                                        <ModalApplyDiscount
                                            product={product}
                                        />
                                        <button className="w-[300px] h-[50px] bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteGame}>Delete</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </div >
            <div className="mt-10 w-full max-w-[1500px] mx-auto h-[3px] bg-[#ffffff] rounded-3xl" />

            {/* Product description */}
            <div className="md:p-10 my-5">
                <h2 className="text-[20px] md:text-[38px] text-gray-400 font-semibold">Product description</h2>
                <article className="text-justify text-[15px] md:text-[28px] text-gray-500 max-w-[1500px]">{product.description}</article >
            </div>
        </div>

    )
}

export default ProductDetail;