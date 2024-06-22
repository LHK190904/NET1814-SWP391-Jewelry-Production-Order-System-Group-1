import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

function ManagerRequest() {
  const [popupDetails, setPopupDetails] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const reqRes = await axiosInstance.get(
        `requests/getPendingQuotationRequest`
      );
      const requestsData = reqRes.data.result;

      const combinedData = await Promise.all(
        requestsData.map(async (req) => {
          const quoRes = await axiosInstance.get(`quotation/${req.id}`);
          return { ...req, quotation: quoRes.data.result };
        })
      );

      setRequests(combinedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleDetailsClick = (details) => {
    setPopupDetails(details);
    setModalOpen(true);
  };

  const handleStatusClick = (reqId) => {
    setStatuses((prev) => ({ ...prev, [reqId]: "action" }));
  };

  const handleApprove = async (quoID) => {
    try {
      const response = await axiosInstance.put(`quotation/update/${quoID}`);
      console.log(response.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeny = async (quoID) => {
    try {
      const response = await axiosInstance.put(`quotation/update/${quoID}`);
      console.log(response.data.result);
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
      <h1 className="text-center text-[#F7EF8A] font-extrabold p-10">
        REQUEST MANAGEMENT
      </h1>
      <div className="grid grid-cols-8 p-1">
        <div className="col-start-2 col-span-2">
          <Button onClick={() => handleNavigateClick("/manager/request")}>
            Request
          </Button>
          <Button onClick={() => handleNavigateClick("/manager/order")}>
            Order
          </Button>
        </div>
        <div className="col-start-6 col-span-2 flex justify-end">
          <input
            type="search"
            placeholder="Search . . ."
            className="px-2 p-1 rounded-lg"
          />
          <Button>Filter</Button>
        </div>
      </div>
      <div className="grid grid-cols-5 w-3/4 mx-auto bg-gray-400 p-4 rounded-lg">
        <div className="col-span-1 p-2 font-bold">REQUEST ID</div>
        <div className="col-span-1 p-2 font-bold">CUSTOMER ID</div>
        <div className="col-span-1 p-2 font-bold text-center">DETAILS</div>
        <div className="col-span-1 p-2 font-bold text-center">COST</div>
        <div className="col-span-1 p-2 font-bold text-center">STATUS</div>
        {requests.map((item) => (
          <React.Fragment key={item.id}>
            <div className="col-span-1 border p-2 bg-white">{item.id}</div>
            <div className="col-span-1 border p-2 bg-white">
              {item.customerID}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              <Button
                type="link"
                onClick={() => handleDetailsClick(item.description)}
              >
                Details
              </Button>
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {item.quotation.cost}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {statuses[item.id] === "action" ? (
                <div>
                  <Button
                    type="link"
                    onClick={() => handleApprove(item.quotation.id)}
                    className="text-green-500 mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleDeny(item.quotation.id)}
                    className="text-red-500"
                  >
                    Deny
                  </Button>
                </div>
              ) : (
                <Button type="link" onClick={() => handleStatusClick(item.id)}>
                  {statuses[item.id] || item.status}
                </Button>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>

      <Modal
        title="Details"
        visible={isModalOpen}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <p>{popupDetails}</p>
      </Modal>
    </div>
  );
}

export default ManagerRequest;
