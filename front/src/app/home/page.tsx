import Image from "next/image";

//Importaciones de imagenes  
import gifImage from "./gif.gif"
import logoNintendo from "./LogoNintendo.png"

//Helppers
import { exampleArrayProducs } from "../backHelper";

//Componentes
import { HomeCardGame } from "@/components/HomeCardGame/HomeCardGame";
import { EditGameModal } from "../../components/ModalChangeGamesHome/ModalChangeGamesHome"

//Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlaystation } from "@fortawesome/free-brands-svg-icons/faPlaystation";
import { faXbox } from "@fortawesome/free-brands-svg-icons";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";


const home = () => {


    const role = "admin";
    return (
        <div className="w-full min-h-screen bg-backgroundLayout">

            <h2 className="text-[64px] font-black text-center neon-text mb-4">Latest releases</h2>
            <div className="relative w-full h-[700px] mb-3">
                <Image
                    src={gifImage}
                    alt={"fondo"}
                    layout="fill"
                    className="w-full h-[700px] blur-md" ></Image>
                <div className="relative z-10 flex flex-col w-full max-w-[1500px] mx-auto items-center justify-evenly h-full bg-opacity-50 ">
                    <div>
                        <EditGameModal
                            role={role}
                            games={exampleArrayProducs}
                        />
                    </div>
                </div>


            </div>
            <div className="w-full bg-white h-[70px] shadow-inner">
                <div className="w-full max-w-[1500px] mx-auto flex">
                    <div className="w-1/2 h-[70px] flex items-center justify-center">
                        <h2 className="text-center font-black text-[30px] font-serif">Choose where you like to play the most</h2>
                    </div>
                    <div className="w-1/2 flex justify-evenly items-center">
                        <FontAwesomeIcon icon={faPlaystation} className="w-[50px] h-[50px] flex justify-end" />
                        <FontAwesomeIcon icon={faXbox} className="w-[50px] h-[50px] flex justify-end" />
                        <Image src={logoNintendo} alt={"logo"} className="w-[150px] h-[50px] flex justify-end" ></Image>
                    </div>

                </div>
            </div>
            <h2 className="text-[64px] font-black text-center text-violet-500 mb-4">Suscribe and start winning</h2>
            <div className="w-full max-w-[1500px] mx-auto p-10 ">
                <div className="w-[800px] h-[700px] border-2 border-blue-600 rounded-md mx-auto shadow-custom-blue hover:shadow-custom-blue-hover hover:-translate-y-5 transition-transform duration-300">
                    <div className="w-full h-full">
                        <div className="w-full h-1/3 flex flex-col justify-evenly items-center">
                            <h2 className="text-[48px] font-black neon-text">CyberGamer fan</h2>
                            <p className="text-[60px] font-bold text-violet-500">$10/month</p>
                        </div>
                        <div className="w-full h-2/3 flex flex-col justify-evenly items-center">
                            <h3 className="text-[48px] font-bold text-violet-400">Have access to:</h3>
                            <ul className="mb-3">
                                <li className="flex justify-start items-center gap-4 text-[38px] text-violet-500"><FontAwesomeIcon icon={faGamepad} className="w-[50px] h-[50px] text-violet-500" />Games monthly to play</li>
                                <li className="flex justify-start items-center gap-4 text-[38px] text-violet-500"><FontAwesomeIcon icon={faGamepad} className="w-[50px] h-[50px] text-violet-500" />Exclusive discounts</li>
                                <li className="flex justify-start items-center gap-4 text-[38px] text-violet-500"><FontAwesomeIcon icon={faGamepad} className="w-[50px] h-[50px] text-violet-500" />All the latest news about videogames</li>
                            </ul>
                            <a href="/suscription" className="text-white font-bold bg-blue-500 rounded-lg p-1 text-[38px] tracking-wide hover:bg-blue-300"> More information </a>
                        </div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default home;