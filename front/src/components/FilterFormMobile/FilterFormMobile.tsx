"use client";

import { fetchingCategories } from "@/helpers/categoiresHelper";
import { ICategories } from "@/interfaces/ICategories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FilterFormMobile = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };


    const router = useRouter()
    const [categories, setCategories] = useState<ICategories[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategories = await handleAllCategories();
                if (allCategories) {
                    setCategories(allCategories);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleAllCategories = async () => {
        const categories = await fetchingCategories()
        return categories
    }


    const handleCheckboxChange = (categoryID: string) => {
        setSelectedCategory((prev) => (prev === categoryID ? null : categoryID))
    }

    const handleClearFilter = () => {
        setSelectedCategory(null)
        router.push("/products")
    }


    const handleApplyFilter = async () => {
        router.push(`/products/categories/${selectedCategory}`)
    }


    return (
        <div className="w-full flex justify-center items-center p-2 md:hidden">
            {!menuOpen && (
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-black bg-violet-500 rounded-md p-2 w-full focus:outline-none z-50 relative"
                    >
                        Categories
                    </button>
                </div>
            )}

            {menuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex">
                    {/* Menú deslizante desde la izquierda */}
                    <div
                        className={`bg-white w-3/4 max-w-md h-full transform transition-transform duration-500 ease-in-out ${menuOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        {/* Botón para cerrar el menú */}
                        <button
                            onClick={toggleMenu}
                            className="absolute top-5 right-5 text-black text-3xl z-50"
                        >
                            ✖
                        </button>
                        {/* Opciones del menú */}
                        <div className="h-3/5 mt-32 ml-3  flex flex-col justify-evenly items-start">
                            {categories.map((category) => (
                                <label
                                    key={category.id}
                                    className="inline-flex items-center cursor-pointer select-none text-base text-gray-700 transition-colors duration-300 hover:text-gray-400"
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden peer"
                                        checked={selectedCategory === category.id}
                                        onChange={() => handleCheckboxChange(category.id)}
                                    />
                                    <span className="w-6 h-6 border-2 border-gray-600 rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-600 hover:bg-gray-600 hover:scale-105 before:content-['✓'] before:text-gray-600 peer-checked:before:text-black before:transition-all before:duration-300"></span>
                                    {category.name}
                                </label>
                            ))}
                        </div>
                        <div className="flex flex-col justify-evenly items-center gap-3 w-full">
                            <button
                                className="w-1/2 bg-violet-500 rounded-md text-[20px] text-white font-semibold"
                                onClick={handleApplyFilter}
                            >
                                Apply filters
                            </button>
                            <button
                                className="w-1/2 bg-violet-500 rounded-md text-[20px] text-white font-semibold"
                                onClick={handleClearFilter}
                            >
                                Clear filters
                            </button>
                        </div>
                    </div>

                    {/* Fondo oscuro que permanece estático */}
                    <div
                        className="flex-1 bg-black bg-opacity-60 cursor-pointer"
                        onClick={toggleMenu}
                    ></div>
                </div>
            )}
        </div>
    );
};

export default FilterFormMobile;
