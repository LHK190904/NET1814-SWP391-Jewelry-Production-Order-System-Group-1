import React, { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";

function SaleOverview() {
  const totalSales = [1000, 2000, 3000, 4000, 5000];
  const totalOrders = [1000, 2000, 3000, 4000, 5000];
  const completedOrders = [1000, 2000, 3000, 4000, 5000];
  const canceledOrders = [1000, 2000, 3000, 4000, 5000];

  const startDate = "2024-01-01T00:00:00Z";
  const endDate = "2024-12-31T23:59:59Z";
  const [orderCount, setOrderCount] = useState([]);

  const fetchData = async () => {
    try {
      const responseOrderCount = await axiosInstance.get(
        `dashboard/order-count?startDate=${startDate}&endDate=${endDate}`
      );
      setOrderCount(responseOrderCount.data.result);
      console.log("Order count: ", responseOrderCount.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCalculateDiff = (arr) => {
    const last = arr[arr.length - 1];
    const secondLast = arr[arr.length - 2];
    return last > secondLast ? last - secondLast : 0;
  };

  return (
    <div className="grid grid-cols-12 bg-white rounded-lg p-2 gap-2">
      <div className="col-span-6">
        <h1 className="text-xl font-bold">TOTAL SALES</h1>
        <p className="text-2xl">{totalSales[totalSales.length - 1]}</p>
        <p className="text-green-400 text-xl">
          {handleCalculateDiff(totalSales)}
        </p>
      </div>
      <div className="col-span-6">
        <h1 className="text-xl font-bold">TOTAL ORDERS</h1>
        <p className="text-2xl">{totalOrders[totalOrders.length - 1]}</p>
        <p className="text-red-400 text-xl">
          {handleCalculateDiff(totalOrders)}
        </p>
      </div>
      <div className="col-span-6">
        <h1 className="text-xl font-bold">COMPLETED ORDERS</h1>
        <p className="text-2xl">
          {completedOrders[completedOrders.length - 1]}
        </p>
        <p className="text-green-400 text-xl">
          {handleCalculateDiff(completedOrders)}
        </p>
      </div>
      <div className="col-span-6">
        <h1 className="text-xl font-bold">CANCELED ORDERS</h1>
        <p className="text-2xl">{canceledOrders[canceledOrders.length - 1]}</p>
        <p className="text-green-400 text-xl">
          {handleCalculateDiff(canceledOrders)}
        </p>
      </div>
    </div>
  );
}

export default SaleOverview;
