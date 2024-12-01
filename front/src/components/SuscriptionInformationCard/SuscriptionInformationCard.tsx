"use client"

//Font Awesome
import { faGamepad, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import kratosImg from "../../../public/kratos.png"
import marioImg from "../../../public/Mario.png"
import Image from "next/image"
import { suscribeCybergamer } from "@/helpers/suscriptionHelper"
import { useAuth } from "@/context/Authcontext"
import { useState } from "react"
import PaymentButton from "../PaymentButton/PaymentButton"
// import { Subscription } from '@mercadopago/sdk-react';
import Swal from "sweetalert2"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react"

const SuscriptionInformationCard = () => {

    const { userData } = useAuth()
    const [isButtonVisible, setIsButtonVisible] = useState(true);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);


    initMercadoPago('APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad');
    console.log(preferenceId)

    const handleSuscription = async () => {
        setIsButtonVisible(false);
        setIsLoading(true);
    
        try {
            if (userData?.user.id) {
                const response = await suscribeCybergamer(userData.user.id);
                console.log('Preference ID recibido:', response.preferenceId);
                if (response.preferenceId) {
                    setPreferenceId(response.preferenceId);
                } else {
                    throw new Error('Failed to retrieve preference ID');
                }
            } else {
                throw new Error('User ID is undefined');
            }
        } catch (error: any) {
            console.error('Error en la transacción:', error.message);
            Swal.fire({
                title: 'Error',
                text: error.message || 'An error occurred while processing your subscription.',
                icon: 'error',
                confirmButtonText: 'Retry',
            });
            setIsButtonVisible(true);
        } finally {
            setIsLoading(false);
        }
    };
    


    const renderSpinner = () => {
        if (isLoading) {
            return (
                <div className="w-full justify-center flex items-center">
                    <FontAwesomeIcon icon={faSpinner} spin className="text-white size-[100px]" />
                </div>
            )
        }
    }

    return (
        <div className="w-full flex relative">
            {/* Imagen izquierda */}
            <div className="absolute left-[100px] top-[100px] z-10">
                <Image src={marioImg} alt="Mario" className="w-[500px]" />
            </div>
            <div className="w-full max-w-[1500px] mx-auto p-10 z-0">
                {/* Carta de suscripción */}
                <div className="w-[800px] min-h-[700px] p-4 border-2 border-blue-600 rounded-md mx-auto shadow-custom-blue hover:shadow-custom-blue-hover hover:-translate-y-5 transition-transform duration-300 relative z-10">
                    <div className="w-full h-full flex flex-col justify-evenly items-center gap-3">
                        <div className="w-full h-1/6 flex flex-col justify-evenly items-center">
                            <p className="text-[20px] font-semibold text-white">Being part of</p>
                            <h2 className="text-[48px] font-extralight tracking-wide hover:tracking-widest neon-text">CyberGamer fan</h2>
                            <p className="text-[20px] font-semibold text-white">And enjoy of every game</p>
                        </div>
                        <div className="w-full h-1/6 flex justify-center items-center">
                            <p className="text-[60px] font-bold text-white">$10/month</p>
                        </div>
                        <div className="w-full h-4/6 flex flex-col justify-evenly items-center p-10 gap-3">
                            <h3 className="text-[48px] font-bold text-violet-400">Have access to:</h3>
                            <ul className="mb-3 max-w-[770px] flex flex-col gap-3">
                                <li className="flex justify-start items-start gap-4 text-[38px] text-violet-300">
                                    <FontAwesomeIcon icon={faGamepad} className="size-[70px] text-violet-300 mt-0" />
                                    Exclusive discounts on selected products
                                </li>
                                <li className="flex justify-start items-start gap-4 text-[38px] text-violet-300">
                                    <FontAwesomeIcon icon={faGamepad} className="size-[70px] neon-text mt-0" />
                                    A catalog of games for monthly rental
                                </li>
                                <li className="flex justify-start items-start gap-4 text-[38px] text-violet-300">
                                    <FontAwesomeIcon icon={faGamepad} className="size-[80px] text-violet-300 mt-0" />
                                    Games available for rental on their release day
                                </li>
                                <li className="flex justify-start items-start gap-4 text-[38px] text-violet-300">
                                    <FontAwesomeIcon icon={faGamepad} className="size-[90px] text-violet-300 mt-0" />
                                    All the latest news about the world of videogames
                                </li>
                            </ul>

                            {isButtonVisible && (
                                <button
                                    className="w-full bg-green-600 rounded-lg text-[30px] font-bold hover:bg-green-400"
                                    onClick={handleSuscription}
                                >
                                    Subscribe now
                                </button>
                            )}

                            {isLoading && renderSpinner()}

                            {preferenceId && (
                                <div>
                                    <PaymentButton preferenceId={preferenceId} />
                                </div>
                            )}

                            {/* <button
                                onClick={handleSuscription}
                                className="text-white font-bold bg-violet-500 rounded-lg p-3 text-[38px] tracking-wide hover:bg-violet-300 hover:tracking-widest">

                                Subscribe now
                            </button> */}
                        </div>
                    </div>
                </div>
            </div>
            {/* Imagen derecha */}
            <div className="absolute right-[0px] bottom-[0px] z-10">
                <Image src={kratosImg} alt="Kratos" className="w-[620px]" />
            </div>
        </div>
    );
};

export default SuscriptionInformationCard;
