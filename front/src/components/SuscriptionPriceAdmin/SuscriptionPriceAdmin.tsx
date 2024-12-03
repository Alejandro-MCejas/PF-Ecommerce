import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad } from '@fortawesome/free-solid-svg-icons';

const SuscriptionPriceAdmin = () => {
    const [suscriptionPrice, setSuscriptionPrice] = useState("10"); // Valor inicial

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSuscriptionPrice(e.target.value); // Actualizar el estado con el valor del input
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Puedes agregar lógica adicional si es necesario al enviar el formulario
    };

    return (
        <div className=' flex justify-evenly items-center'>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="priceInput">Subscription price</label>
                    <input
                        id="priceInput"
                        type="text"
                        value={suscriptionPrice}
                        onChange={handleOnChange}
                        className="border p-2"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Submit</button>
                </form>
            </div>
            <div className="w-[300px] min-h-[100px] max-h-[600px] p-4 border-2 border-blue-600 rounded-md mx-auto shadow-custom-blue hover:shadow-custom-blue-hover hover:-translate-y-5 transition-transform duration-300 relative z-0">
                <div className="w-full h-full bg-black flex flex-col items-center gap-3">
                    <div className="w-full h-1/6 flex flex-col justify-evenly items-center">
                        <p className="text-[20px] font-semibold text-white">Being part of</p>
                        <h2 className="text-[30px] font-extralight tracking-wide hover:tracking-widest neon-text">CyberGamer fan</h2>
                        <p className="text-[20px] font-semibold text-white">And enjoy of every game</p>
                        <p className="text-[40px] font-bold text-white">${suscriptionPrice}/month</p>
                    </div>
                    <div className="w-full h-5/6 flex flex-col justify-evenly items-center p-4 gap-3">
                        <h3 className="text-[18px] font-bold text-violet-400">Have access to:</h3>
                        <ul className="max-w-[470px] flex flex-col gap-3">
                            <li className="flex justify-start items-start gap-4 text-[18px] text-violet-300">
                                <FontAwesomeIcon icon={faGamepad} className="size-[10px] text-violet-300 mt-0" />
                                Exclusive discounts on selected products
                            </li>
                            <li className="flex justify-start items-start gap-4 text-[18px] text-violet-300">
                                <FontAwesomeIcon icon={faGamepad} className="size-[10px] neon-text mt-0" />
                                A catalog of games for monthly rental
                            </li>
                            <li className="flex justify-start items-start gap-4 text-[18px] text-violet-300">
                                <FontAwesomeIcon icon={faGamepad} className="size-[10px] text-violet-300 mt-0" />
                                Games available for rental on their release day
                            </li>
                            <li className="flex justify-start items-start gap-4 text-[18px] text-violet-300">
                                <FontAwesomeIcon icon={faGamepad} className="size-[10px] text-violet-300 mt-0" />
                                All the latest news about the world of videogames
                            </li>
                        </ul>
                        <link href="/subscription" className="text-white font-bold bg-violet-500 rounded-lg p-3 text-[18px] tracking-wide hover:bg-violet-300 hover:tracking-widest">Subscribe now</link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuscriptionPriceAdmin;
