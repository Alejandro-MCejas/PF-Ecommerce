"use client"

import { useAuth } from "@/context/Authcontext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface FeedbackData {
    paymentId: string | null;
    status: string | null;
    preferenceId: string | null;
  }

const PaymentResultSuscription = ()=>{

    const {userData , setUserData}  = useAuth()
    const router = useRouter()
    const [feedBack, setFeedbackData] = useState<FeedbackData>({
        paymentId:null,
        status:null,
        preferenceId:null
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
      
      


    const handleFinishSuscription = () =>{
        router.push("/subscription")
    }



    return(
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
            feedBack.status === "approved" ?(
              <p className='text-[30px] font-semibold text-green-500'>Approved</p>
            ):(
              <p className='text-[30px] font-semibold'>{feedBack.status}</p>
            )
          }
          <p className="text-[30px] font-semibold">{feedBack.paymentId}</p>
        </div>
      </div>
        <div className='w-full flex justify-center items-center my-3'>
          <button 
            className='bg-violet-500 w-[200px] h-[50px] rounded-lg text-white'
            onClick={handleFinishSuscription}
          >Finish
          </button>
        </div>
    </div>
    )
}


export default PaymentResultSuscription