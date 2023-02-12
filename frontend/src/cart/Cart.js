import React from "react";
import cart from "./cartItems.json";
import axios from "axios";

export default function Cart() {
  const items = cart.cartItems;
  const handleCheckout = (evt) => {
    evt.preventDefault();
    console.log("process.env.API_BASE_URL", process.env.REACT_APP_API_BASE_URL);
    const checkoutApi = `${process.env.REACT_APP_API_BASE_URL}/create-checkout-session`;
    axios
      .post(checkoutApi, {
        cartItems: items,
        customerId: 1,
      })
      .then((response) => {
        const stripeRedirectUrl = response.data.url;
        if (!!stripeRedirectUrl) {
          window.location.href = stripeRedirectUrl;
        }
      });
  };
  return (
    <>
      <h3>Cart ({items.length})</h3>
      <div>
        {items.map((item, index) => {
          return (
            <ul key={item.id}>
              {Object.keys(item).map((itemKey) => (
                <li key={itemKey}>
                  {itemKey}:{item[itemKey]}
                </li>
              ))}
            </ul>
          );
        })}
      </div>
      <button onClick={handleCheckout}>Checkout</button>
    </>
  );
}
