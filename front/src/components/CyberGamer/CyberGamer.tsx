import Image from "next/image";
import gifImage from "../../../public/gif.gif"
import RandomProductsComponent from "@/components/RandomProductCard/RandomProductCard";
import { fetchingProducts } from "@/helpers/productHelper";
import EditGameSuscriptionModal from "../EditGameSuscriptionModal/EditGameSuscriptionModal";

const CyberGamer = () => {

    // const productList = await fetchingProducts()
    return (
        <div className="w-full min-h-screen">
                <h2 className="text-[30px] md:text-[64px] font-black text-center neon-text mb-4">Games of the month</h2>
            <div className="relative w-full h-[450px] md:h-[700px] mb-3">
                <Image
                    src={gifImage}
                    alt={"fondo"}
                    layout="fill"
                    className="w-full h-[450px] md:h-[700px] blur-md " ></Image>
                <div className="relative z-10 flex flex-col w-full max-w-[1500px] mx-auto items-center justify-evenly h-full bg-opacity-50 ">
                    <div className="w-full flex justify-evenly items-center">
                        <EditGameSuscriptionModal/>
                    </div>
                </div>
            </div>
{/* 
            <div className="w-full bg-white shadow-inner h-[50px] flex justify-center items-center">
                <h2 className="text-black font-bold tracking-widest shadow-md text-[30px]"> Exclusive discounts</h2>
            </div> */}


        </div>
    )
}

export default CyberGamer;