"use client"

import { fetchingCategories, fetchingCategoriesById } from "@/helpers/categoiresHelper"
import { ICategories } from "@/interfaces/ICategories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export const FilterForm = () => {

    const router = useRouter()
    const [categories, setCategories] = useState<ICategories[]>([]);
    const [selectedCategory, setSelectedCategory]= useState<string|null>(null);

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

    const handleCheckboxChange = (categoryID:string)=>{
        setSelectedCategory((prev)=>(prev===categoryID ? null : categoryID))
    }

    const handleClearFilter = ()=>{
        setSelectedCategory(null)
        router.push("/products")
    }


    const handleApplyFilter = async () => {
        router.push(`/products/categories/${selectedCategory}`)
    }

    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex flex-col justify-center items-center ">
                <h2 className="text-[48px] font-bold text-white ">Filter</h2>
                {/* Divisor */}
                <div className="mt-4 w-full mx-auto h-[3px] bg-[#ffffff] rounded-3xl" />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-col justify-evenly items-start min-h-[300px]">
                    {categories.map((category) => (
                        <label
                            key={category.id}
                            className="inline-flex items-center cursor-pointer select-none text-base text-gray-200 transition-colors duration-300 hover:text-gray-400"
                        >
                            <input 
                                type="checkbox" 
                                className="hidden peer"
                                checked = {selectedCategory ===category.id}
                                onChange={()=> handleCheckboxChange(category.id)}
                            />
                            <span className="w-6 h-6 border-2 border-gray-200 rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-200 hover:bg-gray-200 hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-white before:transition-all before:duration-300"></span>
                            {category.name}
                        </label>
                    ))}
                </div>
                <div className="flex flex-col justify-evenly items-center gap-3 w-full">
                    <button 
                        className="w-full bg-violet-500 rounded-md text-[20px] text-white font-semibold"
                        onClick={handleApplyFilter}
                        >
                        Apply filters
                    </button>
                    <button 
                        className="w-full bg-violet-500 rounded-md text-[20px] text-white font-semibold"
                        onClick={handleClearFilter}
                        >
                        Clear filters
                    </button>
                </div>
            </div>
        </div>
    )
}
