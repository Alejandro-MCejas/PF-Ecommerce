"use client"

import { AddReviewProps, IProduct } from "@/interfaces/IProduct";
import React, { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Link from "next/link";
import Swal from "sweetalert2";
import ModalEditGame from "../ModalEditGame/ModalEditGame";
import AddToCart from "../AddToCart/AddToCart";
import { addReview, deleteProductByID, editProductInformationByID } from "@/helpers/productHelper";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import ProductReviewCard from "../ProductReviewCard/ProductReviewCard";

interface ProductDetail {
    product: IProduct;
    // role: string;
}

const ProductDetail: React.FC<ProductDetail> = ({ product }: { product: IProduct }) => {
    const { userData } = useAuth()
    const [rating, setRating] = useState(0);
    const [idUser , setIdUser] = useState<string>("")
    const [activeImage, setActiveImage] = useState(product.image[0]);
    const router = useRouter()
    
    const [reviewProduct, setReview] = useState<AddReviewProps>({
        productId: product.id,
        userId: "", // Inicialmente vacío
        rating: 3,
        comment: "",
    });
    
    useEffect(() => {
        if (userData?.user?.id) {
            setIdUser(userData.user.id);
        } else {
            setIdUser(""); // Asegura que tenga un valor predeterminado
        }
    }, [userData]);
    
    // Sincroniza `reviewProduct.userId` con `idUser`
    useEffect(() => {
        setReview((prev) => ({
            ...prev,
            userId: idUser,
        }));
    }, [idUser]);



    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setReview({
            ...reviewProduct,
            [name]: value,
        });
    }

    const handleSumbitReview = async () => {
        const review = await addReview(reviewProduct, userData?.token || "")

    }
    // const role: string = userData?.user.admin || ""

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



    return (
        <div>
            {/* Imagen e informacion */}
            < div className="flex w-full justify-evenly items-center " >
                {/* Imagen */}
                < div className="w-1/2 min-w-[550px] min-h-[700px] max-w-[550px] max-h-[750px] flex justify-between items-center" >
                    <div className="h-[600px] flex flex-col justify-evenly items-center w-[150px]">
                        {product.image.map((image, index) => (
                            <div
                                key={index}
                                className="cursor-pointer m-1 border-2 border-transparent hover:border-blue-500"
                                onMouseEnter={() => setActiveImage(image)}
                            >
                                <img src={image} alt={`Thumbnail ${index}`} className="w-[80px] h-[80px] rounded-sm" />
                            </div>
                        ))}
                    </div>
                    <img src={activeImage} className="w-[400px] h-[650px] rounded-md" alt="bannerImg" />
                </div >
                {/* Informacion */}
                < div className="w-1/2 min-w-[700px] min-h-[750px] max-h-[750px] bg-white border-2 border-black flex justify-center items-start rounded-md" >
                    <div className="w-full h-[750px] flex flex-col justify-evenly items-start p-10">
                        <div className="flex flex-col justify-evenly items-start h-[200px] mt-0">
                            <h2 className="text-[48px] font-semibold shadow-md">{product.name}</h2>
                            {/* Sistema de puntuacion de estrellas */}
                            <div>
                                <StarRating rating={rating} setRating={setRating} />
                            </div>
                            <h3 className="bg-violet-500 p-1 text-white font-italic text-[20px]">Play with CyberGamer</h3>
                        </div>
                        <div>

                            <p className="text-[98px] font-black">${product.price}</p>
                        </div>
                        {
                            product.stock === 0 ? (
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-[36px] font-semibold">No stock available</p>
                                </div>
                            ) : product.stock < 10 ? (
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-[36px] font-semibold">Stock available</p>
                                    <p className="text-[26px] font-semibold ">Only {product.stock} games available!</p>
                                </div>
                            ) : (
                                <div className="flex flex-col justify-center items-start">
                                    <p className="text-[36px] font-semibold">Stock available</p>
                                </div>
                            )
                        }
                        <div className="w-full">
                            {/* Lógica de botones según el rol */}
                            {userData?.user.admin !== "admin" ? (
                                userData?.user.admin !== "user" ? (
                                    // Mostrar solo botón de comprar si el rol no es admin ni user
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Buy Now</button>
                                ) : (
                                    // Mostrar botones de "Add to Cart" y "Buy Now" si el rol es user
                                    <div className="w-full flex items-center flex-col gap-3">
                                        <AddToCart
                                            id={product.id}
                                            name={product.name}
                                            description={product.description}
                                            stock={product.stock}
                                            price={product.price}
                                            image={product.image}
                                        />
                                        <button className=" w-[300px] h-[50px] bg-purple-500 text-white px-4 py-2 rounded">Buy Now</button>
                                    </div>
                                )
                            ) : (
                                // Mostrar botones de "Edit", "Subscription" y "Delete" si el rol es admin
                                <div className="w-full flex items-center gap-4">
                                    <div className="flex flex-col gap-4">
                                        <ModalEditGame
                                            product={product}
                                        />
                                        <button className="w-[300px] h-[50px] bg-purple-400 text-violet-700 px-4 py-2 rounded">Add discount</button>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        <button className="w-[300px] h-[50px] bg-violet-600 text-white px-4 py-2 rounded" onClick={handleAddCyberGamer}>Subscription</button>
                                        <button className="w-[300px] h-[50px] bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteGame}>Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div >
            </div >
            <div className="mt-10 w-full max-w-[1500px] mx-auto h-[3px] bg-[#ffffff] rounded-3xl" />

            {/* Product description */}
            <div className="p-10 my-5">
                <h2 className="text-[38px] text-gray-400 font-semibold">Product description</h2>
                <article className="text-justify text-[28px] text-gray-500 max-w-[1500px]">{product.description}</article >
            </div>

            {/* Other games like this */}
            <h2 className="ml-10 my-5 text-[38px] text-gray-400 font-semibold">Other games like this:</h2>
            <div className="max-w-[1500px] w-full flex justify-evenly items-center">
                <div className="max-w-[200px] max-h-[270] flex justify-evenly  items-center my-3 hover:scale-[1.05]">
                    <Link href={`/products/${product.id}`}>
                        <img src={product.image[0]} alt="" className="w-full h-full rounded-xl" />
                    </Link>
                </div>
                <div className="max-w-[200px] max-h-[270] flex justify-evenly  items-center my-3 hover:scale-[1.05]">
                    <Link href={`/products/${product.id}`}>
                        <img src={product.image[0]} alt="" className="w-full h-full rounded-xl" />
                    </Link>
                </div>
                <div className="max-w-[200px] max-h-[270] flex justify-evenly  items-center my-3 hover:scale-[1.05]">
                    <Link href={`/products/${product.id}`}>
                        <img src={product.image[0]} alt="" className="w-full h-full rounded-xl" />
                    </Link>
                </div>
                <div className="max-w-[200px] max-h-[270] flex justify-evenly items-center my-3 hover:scale-[1.05]">
                    <Link href={`/products/${product.id}`}>
                        <img src={product.image[0]} alt="" className="w-full h-full rounded-xl" />
                    </Link>
                </div>
            </div >

            {/* Comments */}
            <div className="my-5">
                <h2 className="ml-10 mb-4 text-[38px] text-gray-400 font-semibold">Make your own review</h2>
                {
                    userData?.user.admin === "user" ? (
                        <div className="w-full max-w-[1400px] mx-auto h-[210px] flex flex-col items-center">
                            <textarea
                                name="comment"
                                value={reviewProduct.comment}
                                onChange={handleChange}
                                placeholder="Write something here..."
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
                            />
                            <div className="w-full flex justify-end items-center">
                                <button
                                    onClick={handleSumbitReview}
                                    className="mt-4 px-4 py-2 bg-violet-500 text-white font-semibold rounded-md hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-violet-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full max-w-[1400px] mx-auto h-[210px] flex flex-col items-center">
                            <h2 className="text-gray-500 text-[20px] font-semibold">To make your revire please, before</h2>
                            <a href="/login" className="text-violet-500 text-[20px] font-serif">login</a>
                        </div>
                    )
                }
                <h2 className="ml-10 mb-5 text-[38px] text-gray-400 font-semibold">Product Reviews</h2>
                <div className="flex flex-col justify-evenly gap-7">
                    {
                        product.reviews.map((review) => (
                            <ProductReviewCard
                                key={review.id}
                                review={review.comment}
                            />
                        ))
                    }
                </div>
            </div >
        </div>

    )
}

export default ProductDetail;