"use client"

import { IProduct } from '@/interfaces/IProduct';
import { useState } from 'react';
import { AddProductProps } from '@/interfaces/IProduct';
import { addProduct } from '@/helpers/productHelper';
import AddNewGameButton from '../AddNewGameButton/AddNewGameButton';

const AddProductForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

    // const initialState = 

    const [newGame, setNewGame] = useState<AddProductProps>({
        name: "",
        price: 0,
        images: [],
        stock: 0,
        description: "",
        suscription: false,
    })

    const userSession = JSON.parse(localStorage.getItem('userSession') || "{}");
    const role: string = userSession.userData?.rol;

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
        setNewGame((prevGame) => ({
            ...prevGame,
            [name]: type === 'number' ? parseFloat(value) || 0 : value,
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
        console.log("New game submitted:", newGame);
        try {
            const newProduct = await addProduct(newGame);
            console.log('Product added:', newProduct);
            // Puedes agregar más lógica aquí, como mostrar un mensaje de éxito
        } catch (error) {
            console.error('Error adding product:', error);
            // Manejo de errores si la llamada falla
        }
        // Lógica de envío al backend o manejo de datos
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

    if (role !== "administrator") return null;

    return (
        <div className="mt-10">
            <button
                className="bg-violet-600 text-white text-[64px] w-[600px] h-[200px] tracking-widest font-black rounded-md hover:bg-violet-400 transition"
                onClick={openModal}
            >
                Add New Game
            </button>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
                                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
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
                                <input
                                    type="text"
                                    placeholder="Product title"
                                    name='name'
                                    value={newGame.name}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-500 rounded w-full"
                                />
                                <input
                                    type="number"
                                    placeholder="Quantity Stock"
                                    name='stock'
                                    value={newGame.stock}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-500 rounded w-full"
                                />
                                <input
                                    type="text"
                                    placeholder="Price"
                                    name='price'
                                    value={newGame.price}
                                    onChange={handleInputChange}
                                    className="p-2 border border-gray-500 rounded w-full"
                                />
                                <select className="p-2 border border-gray-500 rounded w-full">
                                    <option>Category 1</option>
                                    <option>Category 2</option>
                                    <option>Category 3</option>
                                    <option>Category 4</option>
                                    <option>Category 5</option>
                                    <option>Category 6</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col w-full justify-evenly items-start my-3 p-3'>
                            {/* Checkbox and Select options */}
                            <label className="flex items-center w-2/4 gap-4">
                                <input 
                                    type="checkbox" 
                                    className="hidden peer" 
                                    name="suscription"
                                    checked={newGame.suscription}
                                    onChange={handleCheckboxChange}
                                />
                                <span className="w-6 h-6 border-2 border-black rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-black peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 peer-focus:ring-offset-0 hover:border-black hover:bg-black hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-black before:transition-all before:duration-300"></span>
                                Is in CyberGamer?
                            </label>
                            <label className="flex items-center w-2/4 gap-4">
                                <input type="checkbox" className="hidden peer" />
                                <span className="w-6 h-6 border-2 border-black rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-black peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-black/20 peer-focus:ring-offset-0 hover:border-black hover:bg-black hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-black before:transition-all before:duration-300"></span>
                                Have any discount?
                                <select className="p-1 w-1/4 border border-gray-500 rounded">
                                    <option>5%</option>
                                    <option>10%</option>
                                    <option>15%</option>
                                    <option>20%</option>
                                    <option>25%</option>
                                    <option>30%</option>
                                    <option>35%</option>
                                    <option>40%</option>
                                    <option>45%</option>
                                    <option>50%</option>
                                    <option>55%</option>
                                    <option>60%</option>
                                    <option>65%</option>
                                    <option>70%</option>
                                    <option>75%</option>
                                    <option>80%</option>
                                    <option>85%</option>
                                    <option>90%</option>
                                    <option>95%</option>
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
