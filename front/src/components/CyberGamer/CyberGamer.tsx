import Image from "next/image";
import gifImage from "../../../public/gif.gif"
import RandomProductsComponent from "@/components/RandomProductCard/RandomProductCard";
import { fetchingProducts } from "@/helpers/productHelper";
import EditGameSuscriptionModal from "../EditGameSuscriptionModal/EditGameSuscriptionModal";
import SubscriptionStatus from "../YouSubscribed/YouSubscribed";

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
                    <div className="w-1/2 md:w-full flex justify-center md:ustify-evenly items-center">
                        <EditGameSuscriptionModal/>
                    </div>
                </div>
            </div>
            <SubscriptionStatus />
        </div>
    )
}

export default CyberGamer;