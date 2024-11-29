import React from 'react';

interface HomeCardGameProps {
    imagenUrl?: string;
}

export const HomeCardGame: React.FC<HomeCardGameProps> = ({ imagenUrl }) => {
    return (
        <div className="max-w-[100px] max-h-[170px] flex-wrap md:max-w-[200px] md:max-h-[270px]  flex justify-center items-center my-3 border-2 border-violet-500 rounded-md">
            {imagenUrl ? (
                <img src={imagenUrl} alt="Product" className="w-[100px] h-[150px] md:w-[190px] md:h-[260px]" />
            ) : (
                <div className="w-full h-full flex justify-center items-center bg-gray-100 rounded-md">
                    <p className="text-gray-500 font-semibold">No product selected yet</p>
                </div>
            )}
        </div>
    );
};
