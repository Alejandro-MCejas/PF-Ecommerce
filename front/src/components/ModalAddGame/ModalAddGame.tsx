"use client"

import { IProduct } from '@/interfaces/IProduct';
import { useState } from 'react';
import { AddProductProps } from '@/interfaces/IProduct';
import { addProduct } from '@/helpers/productHelper';
import AddNewGameButton from '../AddNewGameButton/AddNewGameButton';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/Authcontext';
import { fetchingCategories } from '@/helpers/categoiresHelper';
import { ICategories } from '@/interfaces/ICategories';
import Swal from 'sweetalert2';

const AddProductForm = ({ categories }: { categories: ICategories[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    const { userData } = useAuth()
    const router = useRouter()

    const [newGame, setNewGame] = useState<AddProductProps>({
        name: "",
        price: 0,
        images: [],
        stock: 0,
        description: "",
        categories: "",
        suscription: false,
        discount: 0
    })

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const newFiles = Array.from(files);
            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
            setNewGame((prevGame) => ({
                ...prevGame,
                images: [...prevGame.images, ...newFiles],
            }));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = event.target;
    
        // Convertir a número si es necesario (para stock y price)
        const parsedValue = (type === 'number' && (name === 'stock' || name === 'price'))
            ? parseFloat(value) || 0
            : value;
    
        setNewGame((prevGame) => ({
            ...prevGame,
            [name]: parsedValue, // parsedValue siempre tendrá el tipo correcto
        }));
    };
    

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        setNewGame((prevGame) => ({
            ...prevGame,
            [name]: checked,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    
        // Validación adicional antes de enviar
        if (newGame.stock < 0 || newGame.price < 0) {
            Swal.fire({
                title: "Error",
                text: "Stock and price cannot be negative.",
                icon: "error",
            });
            return;
        }
    
        console.log("New game submitted:", newGame);
    
        if (!userData?.token) {
            Swal.fire({
                title: "Error",
                text: "User token is missing. Please log in again.",
                icon: "error",
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
            confirmButtonText: "Yes, add it!",
        });
    
        if (result.isConfirmed) {
            setIsLoading(true); // Mostrar el spinner de carga
            try {
                const newProduct = await addProduct(newGame, userData.token);
                console.log("Product added:", newProduct);
    
                Swal.fire({
                    title: "Added successfully!",
                    text: "The game is now in CyberGamer",
                    icon: "success",
                }).then(() => {
                    window.location.reload(); // Recargar la página tras la confirmación
                });
            } catch (error) {
                console.error("Error adding product:", error);
    
                Swal.fire({
                    title: "Ups, something went wrong!",
                    text: "The game couldn't be added",
                    icon: "error",
                });
            } finally {
                setIsLoading(false); // Ocultar el spinner de carga
            }
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center w-full">
                <div className="flex-col gap-4 w-full flex items-center justify-center">
                    <div
                        className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full"
                    >
                        <div
                            className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"
                        ></div>
                    </div>
                </div>
            </div>
        );
    }

    const handleDiscountChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseFloat(event.target.value); // Convertir a número
        setNewGame((prevGame) => ({
            ...prevGame,
            discount: value, // Ahora es un número
        }));
    };

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCategoryId = event.target.value; // Obtener el id de la categoría seleccionada

        setNewGame((prevGame) => ({
            ...prevGame,
            categories: selectedCategoryId, // Asignar el id directamente como string
        }));
    };


    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const openPreviewModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsPreviewOpen(true);
    };

    const closePreviewModal = () => {
        setIsPreviewOpen(false);
        setCurrentImageIndex(null);
    };

    const nextImage = () => {
        if (currentImageIndex !== null && selectedFiles.length > 0) {
            setCurrentImageIndex((prevIndex) => (prevIndex! + 1) % selectedFiles.length);
        }
    };

    const prevImage = () => {
        if (currentImageIndex !== null && selectedFiles.length > 0) {
            setCurrentImageIndex((prevIndex) =>
                prevIndex! === 0 ? selectedFiles.length - 1 : prevIndex! - 1
            );
        }
    };

    const removeImage = (index: number) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    if (userData?.user.admin !== "admin") return null;

    return (
        <div className="mt-3 md:mt-10">
            <button
                className="bg-violet-600 text-white text-[30px] md:text-[64px] w-[300px] md:w-[600px] h-[100px] md:h-[200px] tracking-widest font-black rounded-md hover:bg-violet-400 transition "
                onClick={openModal}
            >
                Add New Game
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-lg w-full max-w-3xl">
                        <h2 className="w-full flex justify-center items-center text-xl font-bold mb-4">Add New Product</h2>
                        <div className="w-full max-w-[1500px] flex gap-4">
                            <div className='w-1/2'>
                                {/* Image upload */}
                                <div className="flex flex-col items-center border-2 border-gray-300 rounded p-4">
                                    <label className="min-w-full min-h-[200px] flex flex-col items-center cursor-pointer">
                                        <span className="text-gray-500">Upload image</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <span className="mt-2 text-2xl">⬇️</span>
                                    </label>
                                </div>
                                <div className="mt-4 gap-2">
                                    {selectedFiles.length > 2 ? (
                                        <button
                                            type="button"
                                            onClick={() => openPreviewModal(0)}
                                            className="w-full mt-4 bg-violet-500 text-white px-4 py-2 rounded hover:bg-violet-600"
                                        >
                                            Open Preview
                                        </button>
                                    ) : (
                                        <div className='flex justify-evenly w-full'>
                                            {selectedFiles.map((file, index) => (
                                                <div key={index} className="relative">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt={`Preview ${index}`}
                                                        className="w-full gap-1 h-20 object-cover rounded cursor-pointer"
                                                        onClick={() => openPreviewModal(index)}
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => removeImage(index)}
                                                        className="absolute top-0 right-0 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col justify-evenly items-center w-1/2'>
                                {/* Input fields */}
                                <label htmlFor="name" className='w-full flex justify-start items-start'>Put a name for the product:</label>
                                <input
                                    type="text"
                                    placeholder="Product title"
                                    name='name'
                                    value={newGame.name}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-500 rounded w-full"
                                />
                                <label htmlFor="stock" className='w-full flex justify-start items-start'>Select a stock:</label>
                                <input
                                    type="number"
                                    placeholder="Quantity Stock"
                                    name='stock'
                                    value={newGame.stock}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-500 rounded w-full"
                                />
                                <label htmlFor="price" className='w-full flex justify-start items-start'>Select a price:</label>
                                <input
                                    type="text"
                                    placeholder="Price"
                                    name='price'
                                    value={newGame.price}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-500 rounded w-full"
                                />
                                <label htmlFor="category" className='w-full flex justify-start items-start'>Select a price:</label>
                                <select
                                    id="categories"
                                    className="p-2 border border-gray-500 rounded w-full"
                                    value={newGame.categories} // Asignar el estado actual de `categories`
                                    onChange={handleCategoryChange}
                                >
                                    <option value="">Select a Category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col w-full justify-evenly items-start my-3 p-3'>
                            {/* Checkbox and Select options */}
                            <label className="flex items-center w-2/4 gap-4">
                                Is in CyberGamer?
                                <input
                                    type="checkbox"
                                    className="hidden peer"
                                    name="suscription"
                                    checked={newGame.suscription}
                                    onChange={handleCheckboxChange}
                                />
                                <span className="w-6 h-6 border-2 border-black rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-black peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 peer-focus:ring-offset-0 hover:border-black hover:bg-black hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-black before:transition-all before:duration-300"></span>

                            </label>
                            <label className="flex items-center w-3/4 gap-4">
                                <input type="checkbox" className="hidden peer" />
                                {/* <span className="w-6 h-6 border-2 border-black rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-black peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 peer-focus:ring-offset-0 hover:border-black hover:bg-black hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-black before:transition-all before:duration-300"></span> */}
                                <p className='w-1/2'>Have any discount?</p>
                                <select
                                    className="p-1 w-full border border-gray-500 rounded"
                                    value={newGame.discount}
                                    onChange={handleDiscountChange}
                                >
                                    <option value="">No Discount</option>
                                    {[5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95].map(
                                        (discount) => (
                                            <option key={discount} value={`${discount}`}>
                                                {discount}%
                                            </option>
                                        )
                                    )}
                                </select>
                            </label>
                            {/* Product description */}
                            <textarea
                                placeholder="Product description"
                                name='description'
                                value={newGame.description}
                                onChange={handleInputChange}
                                className="w-full mt-4 p-2 border border-gray-300 rounded"
                            ></textarea>
                        </div>
                        <div className='w-full flex justify-evenly'>
                            <button
                                type="button"
                                onClick={closeModal}
                                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="mt-4 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
                            >
                                Add product
                            </button>
                            {/* <AddNewGameButton product={newGame} /> */}
                        </div>
                    </form>
                </div>
            )}

            {/* Preview Modal */}
            {isPreviewOpen && currentImageIndex !== null && currentImageIndex < selectedFiles.length && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                    <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full relative">
                        <button
                            onClick={closePreviewModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                        >
                            ✕
                        </button>
                        <img
                            src={URL.createObjectURL(selectedFiles[currentImageIndex])}
                            alt={`Preview ${currentImageIndex}`}
                            className="w-full h-auto rounded"
                        />
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={prevImage}
                                className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                            >
                                Prev
                            </button>
                            <button
                                type="button"
                                onClick={() => removeImage(currentImageIndex)}
                                className=" bg-red-500 text-white rounded-sm flex items-center justify-center text-xs hover:bg-red-600"
                            >
                                Remove this image
                            </button>
                            <button
                                onClick={nextImage}
                                className="bg-gray-200 p-2 rounded hover:bg-gray-300"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddProductForm;
