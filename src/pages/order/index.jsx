import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function Order() {
  const { requestID } = useParams();
  const [requests, setRequests] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axiosInstance.get(`request`);
      const list = response.data.result.filter(
        (request) => request.id === requestID
      );
      setRequests(list);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-start-2 col-span-10 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4 font-bold">YÊU CẦU</h1>
          <div className="grid grid-cols-7 border">
            <div className="col-span-1 p-2 font-bold border">MÃ YÊU CẦU</div>
            <div className="col-span-1 p-2 font-bold border">BẢN THIẾT KẾ</div>
            <div className="col-span-1 p-2 font-bold border">
              NHÂN VIÊN THIẾT KẾ
            </div>
            <div className="col-span-1 p-2 font-bold border">
              NHÂN VIÊN GIA CÔNG
            </div>
            <div className="col-span-1 p-2 font-bold border">
              THỜI ĐIỂM TIẾP NHẬN
            </div>
            <div className="col-span-1 p-2 font-bold border">
              THỜI ĐIỂM HOÀN THÀNH
            </div>
            <div className="col-span-1 p-2 font-bold border">TRẠNG THÁI</div>
          </div>
          <div className="grid grid-cols-7 border">
            <div className="col-span-1 p-2 bg-white border">{requestID}</div>
            <div className="col-span-1 p-2 bg-white border">-</div>
            <div className="col-span-1 p-2 bg-white border">-</div>
            <div className="col-span-1 p-2 bg-white border">-</div>
            <div className="col-span-1 p-2 bg-white border">-</div>
            <div className="col-span-1 p-2 bg-white border">-</div>
            <div className="col-span-1 p-2 bg-white border">-</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Order;
