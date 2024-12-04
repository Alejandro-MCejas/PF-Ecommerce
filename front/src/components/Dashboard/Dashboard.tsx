"use client";
import { useEffect, useState } from "react";
import MyInformation from "./MyInformation";
import Favorites from "./Favorites";
import Orders from "./Orders";
import ReclaimedProducts from "./ReclaimedProducts"; // Importa el nuevo componente
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";

const Dashboard = () => {
    const [activeView, setActiveView] = useState("information");
    const { userData, setUserData } = useAuth(); // Accedemos y actualizamos el contexto
    const [isClient, setIsClient] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setIsClient(true);

        // Si ya hay un token en el contexto, no hacemos nada
        if (userData?.token) return;

        // Si no hay token, intentamos obtenerlo desde la caché
        if (typeof window !== "undefined") {
            const query = new URLSearchParams(window.location.search);
            const userSessionString = query.get("userSession");

            if (userSessionString) {
                try {
                    const userSession = JSON.parse(decodeURIComponent(userSessionString));
                    console.log("Objeto userSession recibido:", userSession);

                    // Usa setUserData para actualizar el estado global
                    setUserData({
                        token: userSession.token,
                        user: userSession.userData,
                    });

                    // Redirige al dashboard principal
                    router.replace("/dashboard");
                } catch (error) {
                    console.error("Error al procesar userSession:", error);
                    router.replace("/login");
                }
            } else {
                // Si tampoco hay datos en la caché, redirige al login
                router.replace("/login");
            }
        }
    }, [userData?.token, router, setUserData]);

    // Si no es cliente (aún no montado) o no hay token, mostramos un loader o null
    if (!isClient || !userData?.token) {
        return null; // O un loader mientras se realiza la validación
    }

    const renderContent = () => {
        switch (activeView) {
            case "information":
                return <MyInformation />;
            case "favorites":
                return <Favorites />;
            case "orders":
                return <Orders userId={userData.user.id} />;
            case "reclaimedProducts":
                // Verifica si el usuario está suscrito antes de renderizar esta vista
                if (userData.user.isSuscription) {
                    return <ReclaimedProducts />;
                }
                return <p>You need a subscription to view this section.</p>;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center py-10">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6">
                <div className="flex border-b border-gray-300 pb-4 mb-4">
                    <div className="flex flex-col w-1/4 pr-4">
                        <button
                            className={`text-left py-2 px-4 rounded-lg mb-2 font-semibold ${
                                activeView === "information" ? "bg-gray-300" : "hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveView("information")}
                        >
                            My Information
                        </button>
                        <button
                            className={`text-left py-2 px-4 rounded-lg mb-2 ${
                                activeView === "favorites" ? "bg-gray-300" : "hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveView("favorites")}
                        >
                            Favorites
                        </button>
                        <button
                            className={`text-left py-2 px-4 rounded-lg mb-2 ${
                                activeView === "orders" ? "bg-gray-300" : "hover:bg-gray-200"
                            }`}
                            onClick={() => setActiveView("orders")}
                        >
                            My Orders
                        </button>
                        {userData.user.isSuscription && ( // Mostrar el botón solo si el usuario está suscrito
                            <button
                                className={`text-left py-2 px-4 rounded-lg ${
                                    activeView === "reclaimedProducts" ? "bg-gray-300" : "hover:bg-gray-200"
                                }`}
                                onClick={() => setActiveView("reclaimedProducts")}
                            >
                                Reclaimed Products
                            </button>
                        )}
                    </div>
                    <div className="w-3/4 pl-4">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

