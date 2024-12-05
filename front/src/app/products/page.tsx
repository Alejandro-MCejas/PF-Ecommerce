"use client";

import { useEffect, useState } from "react";
import { CardProductsView } from "@/components/CardProductsView/CardProductsView";
import { FilterForm } from "@/components/FilterForm/FilterForm";
import FilterFormMobile from "@/components/FilterFormMobile/FilterFormMobile";
import AddGame from "@/components/ModalAddGame/ModalAddGame";
import { fetchingCategories } from "@/helpers/categoiresHelper";
import { fetchingProducts } from "@/helpers/productHelper";
import { IProduct } from "@/interfaces/IProduct";
import { ICategories } from "@/interfaces/ICategories";

const ProductsPage = () => {
    const [products, setProducts] = useState<IProduct[]>([]); // Estado para los productos
    const [categories, setCategories] = useState<ICategories[]>([]); // Estado para las categorías
    const [isLoading, setIsLoading] = useState(true); // Estado para mostrar un spinner de carga

    // Función para obtener los datos desde la API
    const fetchProductsAndCategories = async () => {
        setIsLoading(true); // Mostrar el estado de carga
        try {
            const productsData = await fetchingProducts();
            const categoriesData = await fetchingCategories();
            setProducts(productsData);
            setCategories(categoriesData);
        } catch (error) {
            console.error("Error fetching products or categories:", error);
        } finally {
            setIsLoading(false); // Ocultar el estado de carga
        }
    };

    useEffect(() => {
        fetchProductsAndCategories(); // Llamar a la API al montar el componente
    }, []);

    // Función para manejar la actualización de productos después de agregar un nuevo juego
    const handleAddGame = async () => {
        await fetchProductsAndCategories(); // Actualiza los productos y categorías
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
        )
    }

    return (
        <div>
            <div className="w-full h-[70px] bg-white flex justify-center items-center shadow-inner">
                <h1 className="font-bold text-[30px] md:text-[48px]">All games</h1>
            </div>
            <div className="max-w-[1500px] w-full mx-auto flex justify-center items-center z-50">
                <AddGame categories={categories} />
            </div>
            <div className="block md:hidden">
                <FilterFormMobile />
            </div>
            <div className="max-w-[1500px] w-full mx-auto mt-5 z-10">
                <div className="flex">
                    <div className="w-2/12 hidden md:block z-10">
                        <FilterForm />
                    </div>

                    <div className="w-full md:w-10/12 flex flex-wrap justify-center gap-3">
                        {products.map((game, index) => (
                            <CardProductsView key={index} product={game} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;
