import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";

export default function request() {
  const [requests, setRequests] = useState([]);

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

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-start-2 col-span-10 bg-gray-300 text-center p-1 rounded-lg">
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
            <div className="col-span-1 p-2 font-bold border">GIÁ</div>
            <div className="col-span-1 p-2 font-bold border">MÔ TẢ</div>
          </div>
          {requests.map((item, index) => (
            <div key={index}>
              <Link
                to={`/order/${item.id}`}
                className="grid grid-cols-7 border "
              >
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
                <div className="col-span-1 p-2 bg-white border">{}</div>
                <div className="col-span-1 p-2 bg-white border">
                  {item.description}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
