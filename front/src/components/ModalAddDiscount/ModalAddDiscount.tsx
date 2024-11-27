"use client";

import { useAuth } from "@/context/Authcontext";
import { editProductInformationByID } from "@/helpers/productHelper";
import { EditGameInformationProps, IProduct } from "@/interfaces/IProduct";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const ModalApplyDiscount = ({ product }: { product: IProduct }) => {
    const { userData } = useAuth();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [newDiscount, setNewDiscount] = useState<number>(0);
    const [newGameInfo, setNewGameInfo] = useState<EditGameInformationProps>({
        id: product.id,
        discount: 0,
    });

    // Sincronizar el estado de `newGameInfo` con `newDiscount`
    useEffect(() => {
        setNewGameInfo((prev) => ({
            ...prev,
            discount: newDiscount, // Actualiza el descuento con el nuevo valor
        }));
    }, [newDiscount]);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const parsedPrice = Number(product.price); // Convertimos price a número
        if (isNaN(parsedPrice)) {
            Swal.fire({
                title: "Error",
                text: "Invalid price provided.",
                icon: "error",
            });
            return;
        }

        if (newDiscount < 0 || newDiscount > 95) {
            Swal.fire({
                title: "Invalid Discount",
                text: "Please enter a discount between 0% and 95%.",
                icon: "error",
            });
            return;
        }

        const discountAmount = (parsedPrice * newDiscount) / 100; // Calcular el monto del descuento
        const finalPrice = parsedPrice - discountAmount; // Calcular el precio final

        // Mostrar SweetAlert con la información del descuento
        Swal.fire({
            title: "Discount Details",
            html: `
                <p>Product Price: <strong>$${parsedPrice.toFixed(2)}</strong></p>
                <p>Discount to Apply: <strong>${newDiscount}%</strong></p>
                <p>Price After Discount: <strong>$${finalPrice.toFixed(2)}</strong></p>
            `,
            showCancelButton: true,
            confirmButtonText: "Accept",
            cancelButtonText: "Cancel",
        }).then(async (result) => {
            if (result.isConfirmed && userData) {
                console.log("Data being sent to backend:", newGameInfo);

                editProductInformationByID(newGameInfo, userData?.token)
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
    };

    return (
        <div>
            <button
                className="w-[300px] h-[50px] bg-violet-600 text-white px-4 py-2 rounded"
                onClick={openModal}
            >
                Apply Discount
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-[500px]">
                        <h2 className="text-2xl mb-4">Apply Discount</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <label>
                                <span className="font-semibold">Product Price:</span>
                                <p className="text-lg">
                                    ${!isNaN(Number(product.price))
                                        ? Number(product.price).toFixed(2)
                                        : "Invalid Price"}
                                </p>
                            </label>
                            <label>
                                <span className="font-semibold">Enter Discount (%):</span>
                                <input
                                    type="number"
                                    value={newDiscount}
                                    onChange={(e) => setNewDiscount(Number(e.target.value))}
                                    className="w-full p-2 border border-gray-300 rounded"
                                    min="0"
                                    max="95"
                                    step="1"
                                    placeholder="Enter a discount between 5% and 95%"
                                />
                            </label>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                            >
                                Apply Discount
                            </button>
                        </form>
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

export default ModalApplyDiscount;
