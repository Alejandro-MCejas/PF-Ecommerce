"use client"
import { useContext, useState, useEffect } from "react";
import { AuthContext, useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cancelSuscription } from "@/helpers/suscriptionHelper";

const SubscriptionStatus = () => {
  // const { userData, setUserData } = useContext(AuthContext);
  const [expirationDate, setExpirationDate] = useState("");
  const {userData} = useAuth()
  const router = useRouter();

  
  // Verificar si el usuario está suscrito o no
 // Cambiar a false para probar el estado "no suscrito"
  
  // useEffect(() => {
  //   // Asegurarse de que el userData y userData.user.id estén disponibles
  //   if (userData?.user?.id && userData.user.isSuscription) {
  //     fetchExpirationDate(userData.user.id);
  //   }
  // }, [userData, userData?.user.isSuscription]); // Asegurarse de que la verificación de userData esté en las dependencias

  // const fetchExpirationDate = async (userId: string) => {
  //   try {
  //     const response = await fetch(`${APIURL}/suscrption/${userId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${userData?.token}`,
  //       },
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setExpirationDate(data.expirationDate);
  //     } else {
  //       console.error("Failed to fetch expiration date");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching expiration date:", error);
  //   }
  // };

  const handleCancelSubscription = async () => {
    try {
      if(userData){
        const cancelMessage = await cancelSuscription(userData?.user.id)
        console.log(cancelMessage)
      }
      
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
  };

  return (
    <div>
      {userData?.user.isSuscription ? (
        <>
          <div className="text-sm text-gray-600">
            You are subscribed at{" "}
            <span className="text-blue-500 font-semibold">CyberGamer</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex-1 flex flex-col">
              <label className="text-gray-700">Expiration date</label>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-lg"
                placeholder="12/12/2024"
                value={expirationDate}
                disabled
              />
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={handleCancelSubscription}
            >
              Cancel subscription
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="text-sm text-gray-600">
            You aren’t subscribed at{" "}
            <span className="text-blue-500 font-semibold">CyberGamer</span>
          </div>
          <Link href="/subscription">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              Subscribe now!
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default SubscriptionStatus;
