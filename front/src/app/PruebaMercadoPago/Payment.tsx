"use client"

import React, { useContext, useState } from "react";
import classnames from 'classnames';
import { Wallet } from "@mercadopago/sdk-react";
import { Context } from "./ContextProvider";

interface OrderData {
  price: number;
  quantity: number;
  amount: number;
}

interface ContextType {
  preferenceId: string | null;
  orderData: OrderData;
}

const Payment: React.FC = () => {
  const { preferenceId, orderData } = useContext(Context) as ContextType;
  const [isReady, setIsReady] = useState<boolean>(false);

  const paymentClass = classnames('payment-form dark', {
    'payment-form--hidden': !isReady,
  });

  const handleOnReady = () => {
    setIsReady(true);
  };

  const renderCheckoutButton = (preferenceId: string | null) => {
    if (!preferenceId) return null;

    return (
      <Wallet
        initialization={{ preferenceId }}
        onReady={handleOnReady}
      />
    );
  };

  return (
    <div className={paymentClass}>
      <div className="container_payment">
        <div className="block-heading">
          <h2>Checkout Payment</h2>
          <p>This is an example of a Mercado Pago integration</p>
        </div>
        <div className="form-payment">
          <div className="products">
            <h2 className="title">Summary</h2>
            <div className="item">
              <span className="price" id="summary-price">${orderData.price}</span>
              <p className="item-name">
                Book X <span id="summary-quantity">{orderData.quantity}</span>
              </p>
            </div>
            <div className="total">
              Total
              <span className="price" id="summary-total">${orderData.amount}</span>
            </div>
          </div>
          <div className="payment-details">
            <div className="form-group col-sm-12">
              {renderCheckoutButton(preferenceId)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
