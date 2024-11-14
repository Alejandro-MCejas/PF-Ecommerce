"use client"
import { useState } from "react";


export const FilterForm = () => {
    return (
        <div className="w-full h-full flex flex-col justify-start items-center">
            <div className="w-full flex flex-col justify-center items-center ">
                <h2 className="text-[48px] font-bold text-white ">Filter</h2>
                {/* Divisor */}
                <div className="mt-4 w-full mx-auto h-[3px] bg-[#ffffff] rounded-3xl" />
            </div>
            <div className="flex flex-col justify-center items-center w-full">
                <div className="flex flex-col justify-evenly items-start h-[200px] ">
                    <h3 className="text-[25px] font-semibold text-gray-300 items-start">Category 1</h3>
                    {/* Divisor */}
                    <div className="my-2 w-full mx-auto h-[3px] bg-[#bebebe] rounded-3xl" />
                    <label className="inline-flex items-center cursor-pointer select-none text-base text-gray-200 transition-colors duration-300 hover:text-gray-400">
                        <input type="checkbox" className="hidden peer" />
                        <span className="w-6 h-6 border-2 border-gray-200 rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-200 hover:bg-gray-200 hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-white before:transition-all before:duration-300"></span>
                        Custom Checkbox
                    </label>
                    <label className="inline-flex items-center cursor-pointer select-none text-base text-white transition-colors duration-300 hover:text-gray-200">
                        <input type="checkbox" className="hidden peer" />
                        <span className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-200 hover:bg-gray-200 hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-white before:transition-all before:duration-300"></span>
                        Custom Checkbox
                    </label>
                    <label className="inline-flex items-center cursor-pointer select-none text-base text-white transition-colors duration-300 hover:text-gray-200">
                        <input type="checkbox" className="hidden peer" />
                        <span className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-200 hover:bg-gray-200 hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-white before:transition-all before:duration-300"></span>
                        Custom Checkbox
                    </label>
                    <label className="inline-flex items-center cursor-pointer select-none text-base text-white transition-colors duration-300 hover:text-gray-200">
                        <input type="checkbox" className="hidden peer" />
                        <span className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-200 hover:bg-gray-200 hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-white before:transition-all before:duration-300"></span>
                        Custom Checkbox
                    </label>
                    <label className="inline-flex items-center cursor-pointer select-none text-base text-white transition-colors duration-300 hover:text-gray-200">
                        <input type="checkbox" className="hidden peer" />
                        <span className="w-6 h-6 border-2 border-white rounded-md flex items-center justify-center mr-2 transition-all duration-300 peer-checked:border-white peer-checked:scale-110 peer-checked:rotate-[360deg] peer-checked:rotate-y-[360deg] peer-checked:content-['✓'] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-white/20 peer-focus:ring-offset-0 hover:border-gray-200 hover:bg-gray-200 hover:scale-105 before:content-['✓'] before:text-transparent peer-checked:before:text-white before:transition-all before:duration-300"></span>
                        Custom Checkbox
                    </label>
                </div>
            </div>
        </div>
    )
}
