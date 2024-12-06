"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cancelSuscription, getSuscriptionInformation } from "@/helpers/suscriptionHelper";
import Swal from "sweetalert2";

const SubscriptionStatus = () => {
  const [expirationDate, setExpirationDate] = useState<string>("");
  const { userData, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userData?.user?.id && userData?.token) {
        try {
          const subscriptionData = await getSuscriptionInformation(userData.user.id, userData.token);

          if (subscriptionData?.suscription?.endDate) {
            setExpirationDate(subscriptionData.suscription.endDate);
          } else {
            console.warn("Invalid subscription data", subscriptionData);
          }
        } catch (error) {
          console.error("Failed to fetch subscription information:", error);
        }
      }
    };

    fetchUserInfo();
  }, [userData]);

  const handleCancelSubscription = async () => {
    if (!userData?.user?.id || !userData?.token) {
      console.error("User ID or token is missing.");
      return;
    }

    const confirmResult = await Swal.fire({
      title: "Are you sure?",
      text: "You are about to cancel your subscription.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirmResult.isConfirmed) {
      try {
        const cancelMessage = await cancelSuscription(userData.user.id, userData.token);
        console.log(cancelMessage);

        await Swal.fire({
          title: "Subscription Cancelled",
          text: "Your subscription has been cancelled successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Limpiar sesión
        localStorage.removeItem("Token");
        setUserData(null); // Limpia los datos del contexto
        router.push("/login"); // Redirige al login
      } catch (error) {
        console.error("Error cancelling subscription:", error);
        await Swal.fire({
          title: "Error",
          text: "Something went wrong while cancelling your subscription.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <div>
      {userData?.user?.isSuscription ? (
        <>
          <div className="text-sm text-gray-600">
            You are subscribed to{" "}
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
            You aren’t subscribed to{" "}
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

