"use client"
import { useContext, useState, useEffect } from "react";
import { AuthContext, useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cancelSuscription, getSuscriptionInformation } from "@/helpers/suscriptionHelper";

const SubscriptionStatus = () => {
  // const { userData, setUserData } = useContext(AuthContext);
  const [expirationDate, setExpirationDate] = useState<string>("");
  const { userData } = useAuth()
  const router = useRouter();




  useEffect(() => {
    const fechUserInfo = async () => {
      if (userData) {
        try {
          const expirationDate = await getSuscriptionInformation(userData?.user.id);

          if (expirationDate?.suscription?.endDate) {
            setExpirationDate(expirationDate.suscription.endDate);
          } else {
            console.warn("Invalid subscription data", expirationDate);
          }
        } catch (error) {
          console.error("Failed to fetch subscription information:", error);
        }
      }
    };

    fechUserInfo();
  }, [userData]);


  const handleCancelSubscription = async () => {
    try {
      if (userData) {
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
                value={expirationDate.toString()}
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
