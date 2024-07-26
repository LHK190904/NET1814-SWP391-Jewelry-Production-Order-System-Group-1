import React, { useState } from "react";
import axiosInstace from "../../../services/axiosInstance";

function Overview() {
  const [totalSales, setTotalSales] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [orderComplete, setOrderComplete] = useState([]);
  const [cancelOrders, setCancelOrders] = useState([]);

  const fetchData = async () => {
    try {
      const responseTotalSales = await axiosInstace.get(``);
      setTotalSales(responseTotalSales.data.result);

      const responseTotalOrders = await axiosInstace.get(``);
      setTotalOrders(responseTotalOrders.data.result);

      const responseOrderComplete = await axiosInstace.get(``);
      setOrderComplete(responseOrderComplete.data.result);

      const responseCancelOrders = await axiosInstace.get(``);
      setCancelOrders(responseCancelOrders.data.result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-around">
      <div>Total Sales</div>
      <div>Total Orders</div>
      <div>Order Complete</div>
      <div>Cancel Orders</div>
    </div>
  );
}

export default Overview;
