import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../services/authService";
import axiosInstance from "../../../services/axiosInstance";

function CartRequest() {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  const fetchRequests = async () => {
    try {
      const user = authService.getCurrentUser();
      if (!user || !user.id) {
        console.error("User is not authenticated or user ID is missing");
        return;
      }
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

  const handleApprove = async (reqID) => {
    try {
      await axiosInstance.put(`requests/approveQuotationFromCustomer/${reqID}`);
      await axiosInstance.post(`request-orders/${reqID}`);
      setRequests((prevRequest) =>
        prevRequest.map((req) =>
          req.id === reqID ? { ...req, status: "Approved" } : req
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeny = async (reqID) => {
    try {
      const response = await axiosInstance.put(
        `requests/denyQuotationFromCustomer/${reqID}`
      );
      setRequests((prevRequest) =>
        prevRequest.map((req) =>
          req.id === reqID ? { ...req, status: "Denied" } : req
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (reqID) => {
    try {
      await axiosInstance.put(`requests/deleteRequest/${reqID}`);
      setRequests((prevRequest) =>
        prevRequest.filter((req) => req.id !== reqID)
      );
    } catch (error) {
      console.error(`Error deleting request ID ${reqID}`, error);
    }
  };

  const handleOrderClick = (reqID) => {
    navigate(`/cart/order/${reqID}`);
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4 px-2 lg:px-0">
        <div className="col-span-12 lg:col-start-2 lg:col-span-10 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4 text-2xl">YÊU CẦU</h1>
          <div className="hidden lg:grid lg:grid-cols-8 border">
            <div className="col-span-1 p-2 text-xl border">MÃ YÊU CẦU</div>
            <div className="col-span-1 p-2 text-xl border">
              NHÂN VIÊN BÁN HÀNG
            </div>
            <div className="col-span-1 p-2 text-xl border">TRẠNG THÁI</div>
            <div className="col-span-1 p-2 text-xl border">THỜI ĐIỂM TẠO</div>
            <div className="col-span-1 p-2 text-xl border">
              THỜI ĐIỂM TIẾP NHẬN
            </div>
            <div className="col-span-1 p-2 text-xl border">GIÁ</div>
            <div className="col-span-1 p-2 text-xl border">MÔ TẢ</div>
            <div className="col-span-1 p-2 text-xl border"></div>
          </div>
          {requests.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 lg:grid-cols-8 border my-2 lg:my-0"
            >
              <div className="col-span-1 p-2 bg-white border">{item.id}</div>
              <div className="col-span-1 p-2 bg-white border">
                {item.saleStaffID}
              </div>
              {item.status === "action" ? (
                <div className="col-span-1 p-2 bg-white flex flex-col lg:flex-row">
                  <button
                    onClick={() => handleApprove(item.id)}
                    className="bg-green-400 p-1 rounded-lg mb-2 lg:mr-2 lg:mb-0 hover:bg-green-500"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(item.id)}
                    className="bg-red-400 p-1 rounded-lg hover:bg-red-500"
                  >
                    Deny
                  </button>
                </div>
              ) : item.status === "Unapproved" ? (
                <div className="col-span-1 p-2 bg-white">
                  <span>{item.status}</span>
                </div>
              ) : item.status === "Approved" ||
                item.status === "Ordering" ||
                item.status === "Processing" ? (
                <div className="col-span-1 p-2 bg-white">
                  <span>{item.status}</span>
                </div>
              ) : item.status === "Pending quotation for manager" ? (
                <div className="col-span-1 p-2 bg-white">
                  <span>{item.status}</span>
                </div>
              ) : (
                <div className="col-span-1 p-2 bg-white">
                  <button
                    onClick={() =>
                      setRequests((prevRequest) =>
                        prevRequest.map((req) =>
                          req.id === item.id
                            ? { ...req, status: "action" }
                            : req
                        )
                      )
                    }
                    className="bg-blue-400 p-2 rounded-lg hover:bg-blue-500"
                  >
                    {item.status}
                  </button>
                </div>
              )}
              <div className="col-span-1 p-2 bg-white border">
                {new Date(item.createdAt).toLocaleString()}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {new Date(item.recievedAt).toLocaleString()}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.quotation
                  ? new Intl.NumberFormat().format(item.quotation.cost)
                  : "N/A"}
              </div>
              <div className="col-span-1 p-2 bg-white border">
                {item.description}
              </div>
              {item.status === "Approved" || item.status === "Ordering" ? (
                <div className="col-span-1 p-2 bg-white border">
                  <button
                    onClick={() => handleOrderClick(item.id)}
                    className="bg-blue-500 p-2 rounded-lg hover:bg-blue-600"
                  >
                    CHI TIẾT
                  </button>
                </div>
              ) : item.status === "Denied" || item.status === "Unapproved" ? (
                <div className="col-span-1 p-2 bg-white border">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 p-2 rounded-lg hover:bg-red-600"
                  >
                    Xóa
                  </button>
                </div>
              ) : (
                <div className="col-span-1 p-2 bg-white border"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CartRequest;
