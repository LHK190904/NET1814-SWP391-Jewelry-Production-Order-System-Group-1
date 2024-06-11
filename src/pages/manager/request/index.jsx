import React, { useState } from "react";
import { Modal, Button } from "antd";

function ManagerRequest() {
  const [popupDetails, setPopupDetails] = useState(null);
  const [statuses, setStatuses] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  // Example data
  const data = [
    { reqId: 1, salerId: "A123", details: "Detail 1", status: "Pending" },
    { reqId: 2, salerId: "B456", details: "Detail 2", status: "Pending" },
    { reqId: 3, salerId: "C789", details: "Detail 3", status: "Pending" },
  ];

  const handleDetailsClick = (details) => {
    setPopupDetails(details);
    setModalOpen(true);
  };

  const handleStatusClick = (reqId) => {
    setStatuses((prev) => ({ ...prev, [reqId]: "action" }));
  };

  const handleApprove = (reqId) => {
    setStatuses((prev) => ({ ...prev, [reqId]: "Approved" }));
  };

  const handleDeny = (reqId) => {
    setStatuses((prev) => ({ ...prev, [reqId]: "Denied" }));
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setPopupDetails(null);
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <h1 className="text-center text-[#F7EF8A] font-extrabold p-10">
        REQUEST MANAGEMENT
      </h1>
      <div className="grid grid-cols-4 w-3/4 mx-auto bg-white p-4 rounded-lg">
        <div className="col-span-1 bg-gray-400 p-2 font-bold">REQUEST ID</div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold">SALER ID</div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          DETAILS
        </div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          STATUS
        </div>
        {data.map((item) => (
          <React.Fragment key={item.reqId}>
            <div className="col-span-1 border p-2">{item.reqId}</div>
            <div className="col-span-1 border p-2">{item.salerId}</div>
            <div className="col-span-1 border p-2 text-center">
              <Button
                type="link"
                onClick={() => handleDetailsClick(item.details)}
              >
                Details
              </Button>
            </div>
            <div className="col-span-1 border p-2 text-center">
              {statuses[item.reqId] === "action" ? (
                <div>
                  <Button
                    type="link"
                    onClick={() => handleApprove(item.reqId)}
                    className="text-green-500 mr-2"
                  >
                    Approve
                  </Button>
                  <Button
                    type="link"
                    onClick={() => handleDeny(item.reqId)}
                    className="text-red-500"
                  >
                    Deny
                  </Button>
                </div>
              ) : (
                <Button
                  type="link"
                  onClick={() => handleStatusClick(item.reqId)}
                >
                  {statuses[item.reqId] || item.status}
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
