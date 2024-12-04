import React from 'react';
import Link from 'next/link';

interface HomeCardGameProps {
    imagenUrl?: string;
    title?: string,
    price?: number
    id?: string
}

export const SuscriptionGameCard: React.FC<HomeCardGameProps> = ({ imagenUrl, title, price, id }) => {
    return (
        <Link href={`/products/${id}`}>
      <div className="relative w-[100px] h-[170px] md:w-[195px] md:h-[285px] bg-gray-800 rounded-2xl flex flex-col items-center justify-center text-white transition-transform duration-300 ease-in-out hover:scale-125 hover:rotate-[-1deg] overflow-hidden">
        {imagenUrl ? (
          <img
            src={imagenUrl}
            alt="Product"
            className="absolute w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-150"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-100 rounded-md">
            <p className="text-gray-500 font-semibold text-sm md:text-base">No product selected yet</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md opacity-0 flex flex-col items-center justify-center gap-2 transition-opacity duration-300 hover:opacity-100 z-10">
          <h3 className="text-sm md:text-xl font-bold p-2 md:p-4">{title}</h3>
          <p className="text-xs md:text-lg font-semibold">${price}</p>
        </div>
      </div>    
    </Link>
    );
};