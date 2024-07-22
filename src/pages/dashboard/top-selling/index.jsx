import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

function TopSelling() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(
        `dashboard/top-selling-products`
      );

      setProducts(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="bg-white shadow rounded-lg p-2">
      <h2 className="text-4xl font-bold">TOP SELLING PRODUCTS</h2>
      <div className="grid grid-cols-5">
        <div className="col-span-1">ID</div>
        <div className="col-span-1">NAME</div>
        <div className="col-span-1">AMOUNT</div>
        <div className="col-span-1">PRICE</div>
      </div>
      <ul className="mt-4">
        {products.map((item) => (
          <div key={item.id} className="grid grid-cols-5">
            <span className="col-span-1">{item.id}</span>
            <span className="col-span-1">{item.designName}</span>
            <span className="col-span-1 text-center">{item.order_count}</span>
            <span className="col-span-1">{item.price}</span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default TopSelling;
