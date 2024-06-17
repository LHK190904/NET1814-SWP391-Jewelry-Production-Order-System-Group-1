import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
import axios from "axios";
import axiosInstance from "../../services/axiosInstance";

export default function Cart() {
  const [cart, setCart] = useState([]);

  const fetchRequest = async () => {
    try {
      const user = authService.getCurrentUser();
      const response = await axiosInstance.get(`requests/customer/${user.id}`);
      setCart(response.data.result.map((item) => ({ ...item, key: item.id })));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-start-2 col-span-5 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4">YÊU CẦU</h1>
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
          {cart.map((item, index) => (
            <div className="grid grid-cols-7 border" key={index}>
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
        <div className="col-start-7 col-span-5 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-6 border">
            <div className="col-span-1">BẢN THIẾT KẾ</div>
            <div className="col-span-1">NHÂN VIÊN THIẾT KẾ</div>
            <div className="col-span-1">NHÂN VIÊN GIA CÔNG</div>
            <div className="col-span-1">THỜI ĐIỂM TẠO</div>
            <div className="col-span-1">THỜI ĐIỂM KẾT THÚC</div>
            <div className="col-span-1">TRẠNG THÁI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
