"use client";
import { useEffect, useState } from "react";
import MyInformation from "./MyInformation";
import Favorites from "./Favorites";
import Orders from "./Orders";
import ReclaimedProducts from "./ReclaimedProducts";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

const Dashboard = () => {
    const [activeView, setActiveView] = useState("information");
    const { userData, setUserData } = useAuth();
    const [isClient, setIsClient] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        if (userData?.token) return;

        if (typeof window !== "undefined") {
            const query = new URLSearchParams(window.location.search);
            const userSessionString = query.get("userSession");

            if (userSessionString) {
                try {
                    const userSession = JSON.parse(decodeURIComponent(userSessionString));
                    setUserData({
                        token: userSession.token,
                        user: userSession.userData,
                    });
                    router.replace("/dashboard");
                } catch (error) {
                    console.error("Error al procesar userSession:", error);
                    router.replace("/login");
                }
            } else {
                router.replace("/login");
            }
        }
    }, [userData?.token, router, setUserData]);

    if (!isClient || !userData?.token) {
        return null;
    }

    const renderMenuOptions = () => (
        <div className="flex flex-col gap-2">
            <button
                className={`py-2 px-4 rounded-lg font-semibold ${activeView === "information" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                onClick={() => {
                    setActiveView("information");
                    setIsMobileMenuOpen(false);
                }}
            >
                My Information
            </button>
            <button
                className={`py-2 px-4 rounded-lg ${activeView === "favorites" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                onClick={() => {
                    setActiveView("favorites");
                    setIsMobileMenuOpen(false);
                }}
            >
                Favorites
            </button>
            <button
                className={`py-2 px-4 rounded-lg ${activeView === "orders" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                onClick={() => {
                    setActiveView("orders");
                    setIsMobileMenuOpen(false);
                }}
            >
                My Orders
            </button>
            {userData.user.isSuscription && (
                <button
                    className={`py-2 px-4 rounded-lg ${activeView === "reclaimedProducts" ? "bg-gray-300" : "hover:bg-gray-200"}`}
                    onClick={() => {
                        setActiveView("reclaimedProducts");
                        setIsMobileMenuOpen(false);
                    }}
                >
                    Reclaimed Products
                </button>
            )}
        </div>
    );

    const renderContent = () => {
        switch (activeView) {
            case "information":
                return <MyInformation />;
            case "favorites":
                return <Favorites />;
            case "orders":
                return <Orders userId={userData.user.id} />;
            case "reclaimedProducts":
                if (userData.user.isSuscription) {
                    return <ReclaimedProducts />;
                }
                return <p>You need a subscription to view this section.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="p-3 md:min-h-screen bg-white md:bg-transparent flex flex-col items-center py-10">
            {/* Botón de menú móvil */}
            <div className="w-full px-4 mb-4 md:hidden">
                <button
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-lg"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    Menu
                </button>
            </div>

            {/* Modal de menú móvil */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg p-6 w-3/4 relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Close
                        </button>
                        {renderMenuOptions()}
                    </div>
                </div>
            )}

            {/* Menú lateral para pantallas grandes */}
            <div className="hidden md:flex bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
                <div className="flex flex-col w-1/4 pr-4 border-r border-gray-300">
                    {renderMenuOptions()}
                </div>
                <div className="w-3/4 pl-4">{renderContent()}</div>
            </div>

            {/* Contenido principal en pantallas móviles */}
            {!isMobileMenuOpen && (
                <div className="w-full max-w-4xl md:hidden">{renderContent()}</div>
            )}
        </div>
    );
};

export default Dashboard;
