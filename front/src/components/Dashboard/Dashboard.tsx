"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import MyInformation from "./MyInformation";
import Favorites from "./Favorites";
import Orders from "./Orders";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/Authcontext";
import MyOrders from "./Orders";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("information");
  const { setUserData, userData } = useAuth();  // Aseguramos que usemos el contexto de autenticación
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);

    // Verificar si el token está disponible en localStorage
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");  // Verifica si hay un token almacenado

      if (storedToken) {
        // Si el token está en localStorage, intenta usarlo para autenticar al usuario
        const userSessionString = localStorage.getItem("userSession");  // Puede ser que almacenes el usuario junto con el token
        if (userSessionString) {
          try {
            const userSession = JSON.parse(userSessionString);  // Decodifica los datos de la sesión
            console.log("Usuario autenticado desde localStorage:", userSession);

            // Actualiza el contexto con los datos del usuario y el token
            setUserData({
              token: storedToken,
              user: userSession.userData,
            });

            // Redirige al dashboard si ya está autenticado
            router.replace("/dashboard");
          } catch (error) {
            console.error("Error al procesar userSession desde localStorage:", error);
            router.replace("/login");  // Si ocurre un error, redirige al login
          }
        }
      } else if (!userData?.token) {
        // Si no hay token en localStorage ni en el contexto de usuario, redirige al login
        router.replace("/login");
      } else {
        // Si ya está en el contexto de usuario, redirige al dashboard
        router.replace("/dashboard");
      }
    }
  }, [router, setUserData, userData]);

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
