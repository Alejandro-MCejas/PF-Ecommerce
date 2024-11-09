"use client"

import { IProduct } from "@/interfaces/IProduct";
import React, { useState } from "react";
import StarRating from "../StarRating/StarRating";
import Link from "next/link";
import Swal from "sweetalert2";
import ModalEditGame from "../ModalEditGame/ModalEditGame";

interface ProductDetail {
    product:IProduct;
    role: string;
}

const ProductDetail: React.FC<ProductDetail> = ({ product, role }: { product: IProduct, role: string })=> {

    const [rating, setRating] = useState(0);
    const [activeImage, setActiveImage] = useState(product.image[0]);

    function handleDeleteGame (){
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
            }
          });
    }

    function handleAddCyberGamer (){
        Swal.fire({
            title: "Are you sure?",
            text: "You will add this game to CyberGamer",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, add it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Add it succesfully!",
                text: "The game is now in CyberGamer",
                icon: "success"
              });
            }else{
                Swal.fire({
                    title: "Ups, something went wrong!",
                    text: "The game couldnt be added",
                    icon: "error"
                });
            }
          });
    }

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
                            {/* Verificacion de rol. Si el rol es distinto de admin entonces preguntar si es distinto de user mostrar un solo boton de comprar, 
                            si es user entonces mostrar add to cart o buy now y si es admin mostrar edit, suscription y delete */}
                            {/* Lógica de botones según el rol */}
                            {role !== "admin" ? (
                                role !== "user" ? (
                                    // Mostrar solo botón de comprar si el rol no es admin ni user
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Buy Now</button>
                                ) : (
                                    // Mostrar botones de "Add to Cart" y "Buy Now" si el rol es user
                                    <>
                                        <button className="bg-green-500 text-white px-4 py-2 rounded">Add to Cart</button>
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded">Buy Now</button>
                                    </>
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

            {/* Commets */}
            <div className="my-5">
                <h2 className="ml-10 my-5 text-[38px] text-gray-400 font-semibold">Product Reviews</h2>
                <div className="flex flex-col justify-evenly gap-7">
                    <div className="w-full max-w-[1400px] mx-auto bg-white border-2 shadow-xl rounded-md h-[110px] flex justify-evenly items-center p-5">
                        <div className="w-2/12 flex justify-center items-center">
                            <img src={product.image[0]} className="w-[50px] h-[50px] rounded-full" alt="" />
                        </div>
                        <p className="w-10/12 text-[16px]">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="w-full max-w-[1400px] mx-auto bg-white border-2 shadow-xl rounded-md h-[110px] flex justify-evenly items-center p-5">
                        <div className="w-2/12 flex justify-center items-center">
                            <img src={product.image[0]} className="w-[50px] h-[50px] rounded-full" alt="" />
                        </div>
                        <p className="w-10/12 text-[16px]">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="w-full max-w-[1400px] mx-auto bg-white border-2 shadow-xl rounded-md h-[110px] flex justify-evenly items-center p-5">
                        <div className="w-2/12 flex justify-center items-center">
                            <img src={product.image[0]} className="w-[50px] h-[50px] rounded-full" alt="" />
                        </div>
                        <p className="w-10/12 text-[16px]">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                    <div className="w-full max-w-[1400px] mx-auto bg-white border-2 shadow-xl rounded-md h-[110px] flex justify-evenly items-center p-5">
                        <div className="w-2/12 flex justify-center items-center">
                            <img src={product.image[0]} className="w-[50px] h-[50px] rounded-full" alt="" />
                        </div>
                        <p className="w-10/12 text-[16px]">
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                        </p>
                    </div>
                </div>
            </div >
        </div>

    )
}

export default ProductDetail;