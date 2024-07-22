import React, { useEffect, useRef } from "react";
import { message } from "antd";

const PayPalButton = ({ amount, onSuccess, onError }) => {
  const paypalRef = useRef();

  useEffect(() => {
    // Check if PayPal SDK is loaded
    if (!window.paypal) {
      const interval = setInterval(() => {
        if (window.paypal) {
          clearInterval(interval);
          window.paypal.Buttons({
            createOrder: (data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: amount,
                    },
                  },
                ],
              });
            },
            onApprove: async (data, actions) => {
              const order = await actions.order.capture();
              onSuccess(order);
            },
            onError: (err) => {
              onError(err);
            },
          }).render(paypalRef.current);
        }
      }, 100);
    } else {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          onSuccess(order);
        },
        onError: (err) => {
          onError(err);
        },
      }).render(paypalRef.current);
    }
  }, [amount, onSuccess, onError]);

  return <div ref={paypalRef}></div>;
};

export default PayPalButton;
