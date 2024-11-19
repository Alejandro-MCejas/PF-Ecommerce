"use client";

import React, { useEffect, useState } from 'react';
import { IProduct, EditGameModalProps } from '@/interfaces/IProduct';
import { HomeCardGame } from '../HomeCardGame/HomeCardGame';
import { useAuth } from '@/context/Authcontext';



export const EditGameModal: React.FC<EditGameModalProps> = ({ games }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedGames, setSelectedGames] = useState<IProduct[]>([]);
    const [tempSelectedGames, setTempSelectedGames] = useState<IProduct[]>([]);
    const {userData} = useAuth()

    useEffect(() => {
        const storedGames = localStorage.getItem('selectedGames');
        if (storedGames) {
            setSelectedGames(JSON.parse(storedGames));
        } else if (games.length > 0) {
            setSelectedGames(games.slice(0, 4)); // Toma los primeros 4 elementos de games
        }
    }, [games]);

    const openModal = () => {
        // Copia la selección actual para modificarla en el modal
        setTempSelectedGames([...selectedGames]);
        setIsOpen(true);
    };
    

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleApplyChanges = () => {
        // Aplica los cambios al estado principal y cierra el modal
        localStorage.setItem('selectedGames', JSON.stringify(tempSelectedGames));
        setSelectedGames(tempSelectedGames);
        setIsOpen(false);
    };

    const handleCheckboxChange = (game: IProduct) => {
        if (tempSelectedGames.some((selectedGame) => selectedGame.id === game.id)) {
            setTempSelectedGames(tempSelectedGames.filter((selectedGame) => selectedGame.id !== game.id));
        } else if (tempSelectedGames.length < 4) {
            setTempSelectedGames([...tempSelectedGames, game]);
        }
    };

    if (userData?.user.admin !== 'administrator') {
        return (
            <div className="w-[1500px] flex justify-evenly items-center">
                <div className="w-full flex justify-evenly items-center">
                    {selectedGames.map((game, index) => (
                        <HomeCardGame 
                        key={index} 
                        imagenUrl={game.image && Array.isArray(game.image) && game.image.length > 0 ? game.image[0] : undefined
                        } />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex flex-col w-[1500px] justify-center items-center">
                <div className="w-full flex justify-evenly items-center">
                    {selectedGames.map((game, index) => (
                        <HomeCardGame key={index} imagenUrl={game.image[0]} />
                    ))}
                </div>
                <div className="mt-10">
                    <button
                        className="bg-violet-600 text-white text-[34px] w-[300px] h-[50px] tracking-widest font-bold rounded-md hover:bg-violet-400 transition"
                        onClick={openModal}
                    >
                        Edit Game
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-[1500px] h-[700px]">
                        <h2 className="text-2xl mb-4">Choose 4 games for change</h2>
                        <div>
                            {games.map((game) => (
                                <label key={game.id} className="flex items-center mb-2 p-2 bg-white rounded shadow">
                                    <input
                                        type="checkbox"
                                        checked={tempSelectedGames.some((selectedGame) => selectedGame.id === game.id)}
                                        onChange={() => handleCheckboxChange(game)}
                                        className="mr-2"
                                    />
                                    {game.name}
                                </label>
                            ))}
                            <div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                    onClick={handleApplyChanges}
                                >
                                    Apply changes
                                </button>
                                <button
                                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditGameModal;
