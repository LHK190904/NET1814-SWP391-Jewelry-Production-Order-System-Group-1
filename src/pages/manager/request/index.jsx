import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import LogoutButton from "../../../components/logoutButton";
import Navbar from "../../../components/navbar";
import authorService from "../../../services/authorService";

function ManagerRequest() {
  const [popupDetails, setPopupDetails] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const reqRes = await axiosInstance.get(
        "requests/getPendingQuotationRequest"
      );
      const requestsData = reqRes.data.result;
      const combinedData = await Promise.all(
        requestsData.map(async (req) => {
          const quoRes = await axiosInstance.get(`quotation/${req.id}`);
          return { ...req, quotation: quoRes.data.result };
        })
      );

      setRequests(combinedData);
      console.log(combinedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authorService.checkPermission("MANAGER")) {
      fetchRequests();
    } else {
      navigate("/unauthorized");
    }
  }, []);

  const handleDetailsClick = (details) => {
    setPopupDetails(details);
    setModalOpen(true);
  };

  const handleStatusClick = (reqId) => {
    setStatuses((prev) => ({ ...prev, [reqId]: "action" }));
  };

  const handleApproveDeny = async (quoID, reqID, action) => {
    try {
      await axiosInstance.put(`quotation/update/${quoID}`, { action });
      setStatuses((prev) => ({
        ...prev,
        [reqID]: action === "approve" ? "Approved" : "Denied",
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPopupDetails(null);
  };

  const navigate = useNavigate();

  const handleNavigateClick = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="bg-[#1d1d1d] text-white h-40 flex justify-between items-center px-10">
        <Link to={"/"}>
          <img
            className="h-[160px] w-auto"
            src="/src/assets/images/logo.png"
            alt="Logo"
          />
        </Link>
        <div className="flex-grow text-center">
          <h1 className="text-5xl">QUẢN LÝ</h1>
        </div>
        <div className="w-80 text-right">
          <LogoutButton />
        </div>
      </div>
      <Navbar />
      <h1 className="text-center text-[#F7EF8A] text-4xl font-bold">
        QUẢN LÝ YÊU CẦU
      </h1>
      <div className="flex justify-center gap-1 mb-1 text-white">
        <button
          onClick={() => handleNavigateClick("/manager/request")}
          className="w-1/3 p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
        >
          QUẢN LÝ YÊU CẦU
        </button>
        <button
          onClick={() => handleNavigateClick("/manager/order")}
          className="w-1/3 p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
        >
          QUẢN LÝ ĐƠN HÀNG
        </button>
      </div>
      <div className="grid grid-cols-6 w-3/4 mx-auto bg-gray-400 p-4 rounded-lg">
        <div className="col-span-1 p-2 font-bold">ID YÊU CẦU</div>
        <div className="col-span-1 p-2 font-bold">ID KHÁCH HÀNG</div>
        <div className="col-span-1 p-2 font-bold text-center">CHI TIẾT</div>
        <div className="col-span-1 p-2 font-bold text-center">GIÁ VỐN</div>
        <div className="col-span-1 p-2 font-bold text-center">GIÁ</div>
        <div className="col-span-1 p-2 font-bold text-center">TRẠNG THÁI</div>
        {requests.map((item) => (
          <React.Fragment key={item.id}>
            <div className="col-span-1 border p-2 bg-white text-center">
              {item.id}
            </div>
            <div className="col-span-1 border p-2 bg-white text-center">
              {item.customerID}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              <Button
                type="link"
                onClick={() => handleDetailsClick(item.description)}
              >
                CHI TIẾT ĐƠN HÀNG
              </Button>
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {new Intl.NumberFormat().format(item.quotation.capitalCost)}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {new Intl.NumberFormat().format(item.quotation.cost)}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {statuses[item.id] === "action" ? (
                <div>
                  <button
                    onClick={() =>
                      handleApproveDeny(item.quotation.id, item.id, "approve")
                    }
                    className="bg-green-400 text-black p-2 rounded-lg mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() =>
                      handleApproveDeny(item.quotation.id, item.id, "deny")
                    }
                    className="bg-red-400 text-black p-2 rounded-lg"
                  >
                    Deny
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleStatusClick(item.id)}
                  className="bg-blue-400 p-2 rounded-lg"
                >
                  {statuses[item.id] || item.status}
                </button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Details Modal */}
      <Modal
        title="Details"
        open={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <img src="" alt="" />
        <p>{popupDetails}</p>
      </Modal>
    </div>
  );
}

export default ManagerRequest;
