import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="h-screen bg-[#434343] ">
      <h1 className="text-4xl font-bold text-white">Cart Page</h1>
      <div className="grid grid-cols-12">
        <ul className="grid col-start-2 col-span-6 bg-white">
          <h2 className="font-bold text-center ">Cart</h2>
          <li>
            <div className="grid grid-cols-4">
              <img
                src="./src/assets/images/product.jpg"
                alt=""
                className="grid col-start-1"
              />
              <span className="grid col-start-2 col-span-2">
                <h4>Name</h4>
                <p>Description</p>
                <p>Amount</p>
              </span>
              <div className="col-start-4">icons</div>
            </div>
          </li>
        </ul>
        <div className="grid col-start-9 col-span-3 bg-white">
          <h2 className="font-bold text-center">Order Summary</h2>
          <p>Sub total</p>
          <p>Shipping estimate</p>
          <p>Tax estimate</p>
          <p className="font-bold">Order total</p>
        </div>
      </div>
    </div>
  );
}
