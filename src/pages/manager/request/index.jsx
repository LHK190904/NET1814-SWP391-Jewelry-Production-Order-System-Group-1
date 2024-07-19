import React, { useEffect, useState } from "react";
import { Modal, Button } from "antd";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

function ManagerRequest() {
  const [popupDetails, setPopupDetails] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

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
      console.log(combinedData);
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

  const handleApprove = async (quoID, reqID) => {
    try {
      const response = await axiosInstance.put(`quotation/update/${quoID}`);
      console.log(response.data.result);
      setStatuses((prev) => ({ ...prev, [reqID]: "Approved" }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeny = async (quoID, reqID) => {
    try {
      const response = await axiosInstance.put(`quotation/update/${quoID}`);
      console.log(response.data.result);
      setStatuses((prev) => ({ ...prev, [reqID]: "Denied" }));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the data to display based on pagination
  const paginatedData = requests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(requests.length / itemsPerPage);

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <h1 className="text-center text-[#F7EF8A] text-4xl font-bold">
        REQUEST MANAGEMENT
      </h1>
      <div className="grid grid-cols-8 gap-1 mb-1 text-white">
        <button
          onClick={() => handleNavigateClick("/manager/request")}
          className="col-start-2 col-span-1 p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
        >
          Request
        </button>
        <button
          onClick={() => handleNavigateClick("/manager/order")}
          className="col-span-1 p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
        >
          Order
        </button>
        <input
          type="search"
          placeholder="Search . . ."
          className="col-start-5 col-span-2 px-2 p-1 rounded-lg"
        />
        <button className="p-1 rounded-lg bg-blue-400 hover:bg-blue-500">
          Filter
        </button>
      </div>
      <div className="grid grid-cols-6 w-3/4 mx-auto bg-gray-400 p-4 rounded-lg">
        <div className="col-span-1 p-2 font-bold">REQUEST ID</div>
        <div className="col-span-1 p-2 font-bold">CUSTOMER ID</div>
        <div className="col-span-1 p-2 font-bold text-center">DETAILS</div>
        <div className="col-span-1 p-2 font-bold text-center">CAPITAL COST</div>
        <div className="col-span-1 p-2 font-bold text-center">COST</div>
        <div className="col-span-1 p-2 font-bold text-center">STATUS</div>
        {paginatedData.map((item) => (
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
                Details
              </Button>
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {item.quotation.capitalCost}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {item.quotation.cost}
            </div>
            <div className="col-span-1 border p-2 text-center bg-white">
              {statuses[item.id] === "action" ? (
                <div>
                  <button
                    onClick={() => handleApprove(item.quotation.id, item.id)}
                    className="bg-green-400 text-black p-2 rounded-lg mr-2"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(item.quotation.id, item.id)}
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

      {/* Pagination Buttons */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-2 py-1 border ${
              currentPage === index + 1 ? "bg-gray-400" : "bg-white"
            }`}
          >
            {index + 1}
          </button>
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
