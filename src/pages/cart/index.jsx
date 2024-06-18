import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
import axiosInstance from "../../services/axiosInstance";

export default function request() {
  const [requests, setRequests] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchRequests = async () => {
    try {
      const user = authService.getCurrentUser();
      const response = await axiosInstance.get(`requests/customer/${user.id}`);
      setRequests(
        response.data.result.map((item) => ({ ...item, key: item.id }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const fetchOrders = async () => {
    try {
      const user = authService.getCurrentUser();
      const response = await axiosInstance.get("");
      setOrders(
        response.data.result.map((item) => ({ ...item, key: item.id }))
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchOrders;
  }, []);

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-start-1 col-span-6 ml-10 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4 font-bold">YÊU CẦU</h1>
          <div className="grid grid-cols-7 border">
            <div className="col-span-1 p-2 font-bold border">MÃ YÊU CẦU</div>
            <div className="col-span-1 p-2 font-bold border">
              NHÂN VIÊN BÁN HÀNG
            </div>
            <div className="col-span-1 p-2 font-bold border">TRẠNG THÁI</div>
            <div className="col-span-1 p-2 font-bold border">THỜI ĐIỂM TẠO</div>
            <div className="col-span-1 p-2 font-bold border">
              THỜI ĐIỂM TIẾP NHẬN
            </div>
            <div className="col-span-1 p-2 font-bold border">
              THỜI ĐIỂM KẾT THÚC
            </div>
            <div className="col-span-1 p-2 font-bold border">MÔ TẢ</div>
          </div>
          {requests.map((item, index) => (
            <div className="grid grid-cols-7 border " key={index}>
              <div className="col-span-1 p-2 bg-white border">{item.id}</div>
              <div className="col-span-1 p-2 bg-white border">
                {item.saleStaffID}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.status}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.createdAt}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.recievedAt}
              </div>
              <div className="col-span-1 p-2 bg-white border">{item.endAt}</div>
              <div className="col-span-1 p-2 bg-white border">
                {item.description}
              </div>
            </div>
          ))}
        </div>
        <div className="col-start-7 col-span-6 mr-10 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4 font-bold">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-6 border font-bold">
            <div className="col-span-1 border ">BẢN THIẾT KẾ</div>
            <div className="col-span-1 border ">NHÂN VIÊN THIẾT KẾ</div>
            <div className="col-span-1 border ">NHÂN VIÊN GIA CÔNG</div>
            <div className="col-span-1 border ">THỜI ĐIỂM TẠO</div>
            <div className="col-span-1 border ">THỜI ĐIỂM KẾT THÚC</div>
            <div className="col-span-1 border ">TRẠNG THÁI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
