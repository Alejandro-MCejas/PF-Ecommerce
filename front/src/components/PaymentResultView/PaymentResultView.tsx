"use client"; // Indica que este componente se renderiza en el cliente

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getOrderDetailById } from '@/helpers/orderHelper';
import { useAuth } from '@/context/Authcontext';
import OrderDetailInformation from '../OrderDetailInformation/OrderDetailInformation';

interface FeedbackData {
  collectionId: string | null;
  collectionStatus: string | null;
  paymentId: string | null;
  status: string | null;
  externalReference: string | null;
  paymentType: string | null;
  merchantOrderId: string | null;
  preferenceId: string | null;
  siteId: string | null;
  processingMode: string | null;
  merchantAccountId: string | null;
  orderDetailId: string | null;
}

const PaymentResultView: React.FC = () => {
  const { userData } = useAuth()
  const searchParams = useSearchParams();
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    collectionId: null,
    collectionStatus: null,
    paymentId: null,
    status: null,
    externalReference: null,
    paymentType: null,
    merchantOrderId: null,
    preferenceId: null,
    siteId: null,
    processingMode: null,
    merchantAccountId: null,
    orderDetailId: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Captura la URL completa
      const url = window.location.href;

      // Usa una expresión regular para capturar el `orderDetailId`
      const orderDetailIdMatch = url.match(/orderDetailId:([^/?]+)/);
      const orderDetailId = orderDetailIdMatch ? orderDetailIdMatch[1] : null;

      // Obtiene los parámetros de la consulta
      const queryParams = new URLSearchParams(window.location.search);

      setFeedbackData({
        orderDetailId,
        collectionId: queryParams.get('collection_id'),
        collectionStatus: queryParams.get('collection_status'),
        paymentId: queryParams.get('payment_id'),
        status: queryParams.get('status'),
        externalReference: queryParams.get('external_reference'),
        paymentType: queryParams.get('payment_type'),
        merchantOrderId: queryParams.get('merchant_order_id'),
        preferenceId: queryParams.get('preference_id'),
        siteId: queryParams.get('site_id'),
        processingMode: queryParams.get('processing_mode'),
        merchantAccountId: queryParams.get('merchant_account_id'),
      });

      if (orderDetailId && userData?.token) {
        getOrderDetailById(orderDetailId, userData.token);

      }
    }
  }, []);

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
            feedbackData.status === "approved" ?(
              <p className='text-[30px] font-semibold text-green-500'>Approved</p>
            ):(
              <p className='text-[30px] font-semibold'>{feedbackData.status}</p>
            )
          }
          <p className="text-[30px] font-semibold">{feedbackData.paymentId}</p>
        </div>
      </div>
        <div className='w-full flex justify-center items-center my-3'>
          <button className='bg-violet-500 w-[200px] h-[50px] rounded-lg text-white'>See my order detail</button>
        </div>
    </div>
  );
};

export default PaymentResultView;