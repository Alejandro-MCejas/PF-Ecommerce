"use client"; // Indica que este componente se renderiza en el cliente

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

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
}

const PaymentResultView: React.FC = () => {
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
  });

  useEffect(() => {
    setFeedbackData({
      collectionId: searchParams.get('collection_id'),
      collectionStatus: searchParams.get('collection_status'),
      paymentId: searchParams.get('payment_id'),
      status: searchParams.get('status'),
      externalReference: searchParams.get('external_reference'),
      paymentType: searchParams.get('payment_type'),
      merchantOrderId: searchParams.get('merchant_order_id'),
      preferenceId: searchParams.get('preference_id'),
      siteId: searchParams.get('site_id'),
      processingMode: searchParams.get('processing_mode'),
      merchantAccountId: searchParams.get('merchant_account_id'),
    });
  }, [searchParams]);

  return (
    <div>
      <h1>Payment Feedback</h1>
      {Object.entries(feedbackData).map(([key, value]) => (
        <p key={key}>
          {key}: {value || 'N/A'}
        </p>
      ))}
    </div>
  );
};

export default PaymentResultView;
