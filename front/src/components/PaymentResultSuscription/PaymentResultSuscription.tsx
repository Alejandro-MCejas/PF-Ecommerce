"use client"

import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FeedbackData {
  paymentId: string | null;
  status: string | null;
  preferenceId: string | null;
}

const PaymentResultSuscription = () => {

  const { userData, setUserData } = useAuth()
  const router = useRouter()
  const [feedBack, setFeedbackData] = useState<FeedbackData>({
    paymentId: null,
    status: null,
    preferenceId: null
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      const queryParams = new URLSearchParams(window.location.search);

      setFeedbackData({
        paymentId: queryParams.get("payment_id"),
        status: queryParams.get("status"),
        preferenceId: queryParams.get("preference_id"),
      });
    }
  }, []);

  useEffect(() => {
    if (feedBack.status === "approved" && userData) {
      // Solo actualiza si `isSuscription` no es ya `true`
      if (!userData.user.isSuscription) {
        setUserData({
          ...userData,
          user: {
            ...userData.user,
            isSuscription: true,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedBack.status]); // Removemos `userData` de las dependencias para evitar loops




  const handleFinishSuscription = () => {
    router.push("/subscription")
  }



  return (
    <div>
      <div className='w-full flex justify-evenly items-center gap-2'>
        <div>
          {/* <p>Order detail ID:</p> */}
          <p className='text-[30px] font-semibold'>Status:</p>
          <p className='text-[30px] font-semibold'>ID:</p>
        </div>
        <div>
          {/* <p>{feedbackData.orderDetailId}</p> */}
          {
            feedBack.status === "approved" ? (
              <p className='text-[30px] font-semibold text-green-500'>Approved</p>
            ) : (
              <p className='text-[30px] font-semibold'>{feedBack.status}</p>
            )
          }
          <p className="text-[30px] font-semibold">{feedBack.paymentId}</p>
        </div>
      </div>
      <div className='w-full flex justify-center items-center my-3'>
        <button
          onClick={handleFinishSuscription}
          className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-purple-50 backdrop-blur-md lg:font-semibold isolation-auto border-purple-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-purple-500 hover:text-purple-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 border-purple-500 rounded-full group"
        >
          Finish
          <svg
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-purple-50 text-purple-50 ease-linear duration-300 rounded-full border border-purple-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-purple-800 group-hover:fill-purple-800"
            ></path>
          </svg>
        </button>

      </div>
    </div>
  )
}


export default PaymentResultSuscription