"use client";

import React, { useEffect } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

interface PaymentButtonProps {
  preferenceId: string;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ preferenceId }) => {
  useEffect(() => {
    // Inicializar Mercado Pago solo una vez al montar el componente
    initMercadoPago("APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad");
  }, []);

  return (
    <div className="flex flex-col items-center">
      {preferenceId ? (
        <div className="w-full">
          {/* Componente Wallet de Mercado Pago */}
          <Wallet initialization={{ preferenceId }} />
        </div>
      ) : (
        <p className="text-gray-500">Preparing payment...</p>
      )}
    </div>
  );
};

export default PaymentButton;
