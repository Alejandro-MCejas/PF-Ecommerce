"use client"

import { useAuth } from "@/context/Authcontext";
import SideMenuAdmin from "../SideMenuAdmin/SideMenuAdmin";
import CyberGamer from "../CyberGamer/CyberGamer";
import SuscriptionInformationCard from "../SuscriptionInformationCard/SuscriptionInformationCard";

const SuscriptionView = () => {
    const { userData } = useAuth()

    console.log(userData?.user.isSuscription)

    if (userData?.user.admin === "admin") {
        return (
            <div>
                <CyberGamer />
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