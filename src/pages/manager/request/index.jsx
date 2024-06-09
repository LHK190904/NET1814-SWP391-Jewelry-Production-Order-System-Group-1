import React, { useEffect, useState } from "react";
import axios from "axios";
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
      <div className="flex items-start justify-center">
        <table className="table-auto w-3/4 bg-white border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">REQUEST ID</th>
              <th className="border px-4 py-2">SALER ID</th>
              <th className="border px-4 py-2">DETAILS</th>
              <th className="border px-4 py-2">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.reqId}>
                <td className="border px-4 py-2">{item.reqId}</td>
                <td className="border px-4 py-2">{item.salerId}</td>
                <td className="border px-4 py-2">
                  <Button
                    type="link"
                    onClick={() => handleDetailsClick(item.details)}
                  >
                    Details
                  </Button>
                </td>
                <td className="border px-4 py-2">
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
