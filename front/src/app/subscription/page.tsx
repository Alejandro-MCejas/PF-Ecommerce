import { faGamepad } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


import kratosImg from "../../../public/kratos.png"
import marioImg from "../../../public/Mario.png"
import Image from "next/image"

const Subscription = () => {
    return (
        <div className="w-full flex relative">
            {/* Imagen izquierda */}
            <div className="absolute left-[100px] top-[100px] z-10">
                <Image src={marioImg} alt="Mario" className="w-[500px]"/>
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
                            <a href="/subscription" className="text-white font-bold bg-violet-500 rounded-lg p-3 text-[38px] tracking-wide hover:bg-violet-300 hover:tracking-widest"> Subscribe now </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Imagen derecha */}
            <div className="absolute right-[0px] bottom-[0px] z-10">
                <Image src={kratosImg} alt="Kratos" className="w-[620px]"/>
            </div>
        </div>
    );
};

export default Subscription;
