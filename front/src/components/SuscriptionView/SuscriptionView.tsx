"use client"

import { useAuth } from "@/context/Authcontext";
import SideMenuAdmin from "../SideMenuAdmin/SideMenuAdmin";
import CyberGamer from "../CyberGamer/CyberGamer";
import SuscriptionInformationCard from "../SuscriptionInformationCard/SuscriptionInformationCard";

const SuscriptionView = () => {
    const { userData } = useAuth()

    const isSuscription = true

    console.log(isSuscription)

    if (userData?.user.admin === "admin") {
        return (
            <div className="w-full max-w-[1500px] mx-auto h-[700px] bg-gray-300 my-3">
                <SideMenuAdmin />
            </div>
        )
    } else if (userData?.user.admin === "user" && userData.user.isSuscription) {
        return (
            <div>
                <CyberGamer />
            </div>
        )
    } else {
        return (
            <div>
                <SuscriptionInformationCard />
            </div>
        )
    }
}

export default SuscriptionView;