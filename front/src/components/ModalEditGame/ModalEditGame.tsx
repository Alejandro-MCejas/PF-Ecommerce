"use client";

import { editProductInformationByID } from "@/helpers/productHelper";
import { IProduct , EditGameInformationProps } from "@/interfaces/IProduct";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Swal from "sweetalert2";

const ModalEditGame = ({ product }: { product: IProduct }) => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);    

    const inicialState ={
        id: product.id,
        name:product.name,
        description: product.description,
        stock:product.stock,
        price:product.price,
    }

    const [newGameInfo, setNewGameInfo] = useState<EditGameInformationProps>(inicialState)

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        Swal.fire({
            title: "Do you want to save the changes?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Save",
            denyButtonText: `Don't save`,
        }).then((result) => {
            if (result.isConfirmed) {
                editProductInformationByID(newGameInfo)
                    .then(() => {
                        Swal.fire("Saved!", "The changes have been saved.", "success");
                        closeModal();
                        router.push(`/products/${product.id}`); // Redirecciona después de guardar los cambios
                    })
                    .catch((error) => {
                        Swal.fire("Error", "There was an issue saving the changes.", "error");
                        console.error("Error updating product:", error);
                    });
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
    
        if (type === 'checkbox') {
            const input = event.target as HTMLInputElement; // Verificación de tipo explícita
            setNewGameInfo({
                ...newGameInfo,
                [name]: input.checked,
            });
        } else {
            setNewGameInfo({
                ...newGameInfo,
                [name]: type === 'number' ? parseFloat(value) || 0 : value,
            });
        }
    };


    
    

    return (
        <div>
            <button
                className="w-[300px] h-[50px] bg-violet-600 text-white px-4 py-2 rounded"
                onClick={openModal}
            >
                Edit Game
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-[1500px] h-[700px] overflow-y-auto">
                        <h2 className="text-2xl mb-4">Edit game information</h2>
                        <div className="flex space-x-10">
                            {/* Información actual */}
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">Actual game information</h3>
                                <div className="flex flex-col space-y-4">
                                    <img src={product.image[0]} alt={product.name} className="w-full h-auto rounded" />
                                    <p><strong>Name:</strong> {product.name}</p>
                                    <p><strong>Description:</strong> {product.description}</p>
                                    <p><strong>Price:</strong> ${product.price}</p>
                                    <p><strong>Stock:</strong> {product.stock}</p>
                                    <p><strong>Subscription:</strong> {product.suscription ? 'Yes' : 'No'}</p>
                                </div>
                            </div>

                            {/* Formulario para nueva información */}
                            <div className="w-1/2">
                                <h3 className="text-xl font-semibold mb-4">New game information</h3>
                                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                                    <label>
                                        <span className="font-semibold">Name:</span>
                                        <input
                                            type="text"
                                            name="name"
                                            value={newGameInfo.name}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </label>
                                    <label>
                                        <span className="font-semibold">Description:</span>
                                        <textarea
                                            value={newGameInfo.description}
                                            name="description"
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </label>
                                    <label>
                                        <span className="font-semibold">Price:</span>
                                        <input
                                            type="number"
                                            name="price"
                                            value={newGameInfo.price}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </label>
                                    <label>
                                        <span className="font-semibold">Stock:</span>
                                        <input
                                            name="name"
                                            type="stock"
                                            value={newGameInfo.stock}
                                            onChange={handleChange}
                                            className="w-full p-2 border border-gray-300 rounded"
                                        />
                                    </label>
                                    {/* <label className="flex items-center space-x-2">
                                        <input
                                            name="suscription"
                                            type="checkbox"
                                            checked={newGameInfo.suscription}
                                            onChange={handleChange}
                                        />
                                        <span className="font-semibold">Subscription</span>
                                    </label> */}
                                    <button
                                        type="submit"
                                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    >
                                        Save Changes
                                    </button>
                                </form>
                            </div>
                        </div>
                        <button
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalEditGame;
