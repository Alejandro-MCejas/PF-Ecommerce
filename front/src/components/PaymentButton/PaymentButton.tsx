"use client"
import React, { useState } from "react";
import { useCart } from "@/context/CartContext"
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

const PaymentButton = ({preferenceId} : {preferenceId:string})=>{


    initMercadoPago('APP_USR-82a8c747-15af-4cce-ad00-69ab877f14ad');

    return(
        <div>
            {
                preferenceId ? (
                    <Wallet 
                        initialization={{ preferenceId}} 
                    />
                ) : (
                    <p>Preparing payment...</p>
                )
            }
        </div>
    )


}

export default PaymentButton