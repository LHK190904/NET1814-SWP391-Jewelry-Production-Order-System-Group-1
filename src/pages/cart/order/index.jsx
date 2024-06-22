import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

function CartOrder() {
  const { requestID } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!requestID) {
        console.error("Request ID is undefined");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `request-orders/getOrderByRequestIdForCustomer/${requestID}`
        );
        setOrders(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, [requestID]);

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-start-2 col-span-10 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-8 border">
            <div className="col-span-1 p-2 border">MÃ YÊU CẦU</div>
            <div className="col-span-1 p-2 border">BẢN THIẾT KẾ</div>
            <div className="col-span-1 p-2 border">NHÂN VIÊN THIẾT KẾ</div>
            <div className="col-span-1 p-2 border">NHÂN VIÊN GIA CÔNG</div>
            <div className="col-span-1 p-2 border">THỜI ĐIỂM TIẾP NHẬN</div>
            <div className="col-span-1 p-2 border">THỜI ĐIỂM HOÀN THÀNH</div>
            <div className="col-span-1 p-2 border">TRẠNG THÁI</div>
            <div className="col-span-1 p-2 border">MÔ TẢ</div>
          </div>
          {orders.map((order, index) => (
            <div key={index} className="grid grid-cols-8 border">
              <div className="col-span-1 p-2 bg-white border">
                {order.requestID}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.designID || "-"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.designStaff || "-"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.productionStaff || "-"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.createdAt || "-"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.receivedAt || "-"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.status || "-"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {order.description || "-"}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartOrder;
