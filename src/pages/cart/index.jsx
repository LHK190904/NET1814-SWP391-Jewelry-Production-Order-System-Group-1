import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";

export default function Request() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const user = authService.getCurrentUser();
      const reqRes = await axiosInstance.get(`requests/customer/${user.id}`);
      const list = reqRes.data.result;

      const combinedData = await Promise.all(
        list.map(async (req) => {
          try {
            const quoRes = await axiosInstance.get(`quotation/${req.id}`);
            return { ...req, quotation: quoRes.data.result };
          } catch (error) {
            console.error(
              `Error fetching quotation for request ID ${req.id}`,
              error
            );
            return { ...req, quotation: null };
          }
        })
      );

      setRequests(combinedData);
    } catch (error) {
      console.error("Error fetching requests", error);
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
            <div key={index} className="grid grid-cols-7 border ">
              <div className="col-span-1 p-2 bg-white border">
                <Link to={`/order/${item.id}`}>{item.id}</Link>
              </div>
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
                {item.receivedAt}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.quotation ? item.quotation.cost : "N/A"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
