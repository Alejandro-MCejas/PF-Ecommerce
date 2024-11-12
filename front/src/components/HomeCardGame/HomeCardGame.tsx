import React from 'react';

interface HomeCardGameProps {
    imagenUrl?: string;
}

export const HomeCardGame: React.FC<HomeCardGameProps> = ({ imagenUrl }) => {
    return (
        <div className="max-w-[200px] max-h-[270px] flex justify-center items-center my-3 border-2 border-gray-300 rounded-md">
            {imagenUrl ? (
                <img src={imagenUrl} alt="Product" className="w-full h-full rounded-md" />
            ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-100 rounded-md">
                    <p className="text-gray-500 font-semibold">No product selected yet</p>
                </div>
            )}
        </div>
    );
};
