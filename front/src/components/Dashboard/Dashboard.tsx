"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import MyInformation from "./MyInformation";
import Favorites from "./Favotites";
import Orders from "./Orders";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import MyOrders from "./Orders";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("information");
  const { setUserData, userData } = useAuth(); // Aseguramos que usemos el contexto de autenticación
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      const userSessionString = query.get("userSession");

      if (userSessionString) {
        try {
          const userSession = JSON.parse(decodeURIComponent(userSessionString));
          console.log("Objeto userSession recibido:", userSession);

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
        console.log(
          "No se encontró un userSession, acceso como invitado permitido."
        );
      }
    }
  }, [router, setUserData]);

  if (!isClient) {
    return <div>Cargando...</div>; // Muestra un mensaje de carga mientras se monta el cliente
  }

  const renderContent = () => {
    switch (activeView) {
      case "information":
        return <MyInformation />;
      case "favorites":
        return <Favorites />;
      case "orders":
        if (!userData?.user.id) {
          console.error("User ID is undefined");
          return null; // O un mensaje de error
        }
        return <MyOrders userId={userData.user.id} token={userData.token} />;
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
              className={`text-left py-2 px-4 rounded-lg ${
                activeView === "orders" ? "bg-gray-300" : "hover:bg-gray-200"
              }`}
              onClick={() => setActiveView("orders")}
            >
              My Orders
            </button>
          </div>
          <div className="w-3/4 pl-4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
