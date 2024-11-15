"use client"

import React, { useState} from "react";
import { initMercadoPago } from "@mercadopago/sdk-react";
import Payment from "./Payment";
import Checkout from "./Checkput";
// import Footer from "./components/Footer";
import InternalProvider from "./ContextProvider";
// import { SpinnerCircular } from 's';

// REPLACE WITH YOUR PUBLIC KEY AVAILABLE IN: https://developers.mercadopago.com/panel
initMercadoPago("APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad");

const App = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderData, setOrderData] = useState({ quantity: "1", price: "10", amount: 10, description: "Some book" });
  
  const handleClick = () => {
    setIsLoading(true);
    fetch("http://localhost:8080/create_preference", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        return response.json();
      })
      .then((preference) => {
        setPreferenceId(preference.id);
      })
      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setIsLoading(false);
      })
  };

  const renderSpinner = () => {
     if (isLoading) {
      return (
        <div className="bg-red-600 text-[100px]">
          {/* <SpinnerCircular сolor='#009EE3' />
           */}
           Loading
        </div>
      )
     }
  }

  return (
    <InternalProvider context={{ preferenceId, isLoading, orderData, setOrderData }}>
      <main className="bg-white">
        {renderSpinner()}
            <Checkout onClick={handleClick} />
        <Payment />
      </main>
    </InternalProvider>
  );
};

export default App;
