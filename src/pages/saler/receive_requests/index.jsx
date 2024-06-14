// src/pages/ReceiveRequests.jsx

import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button } from "antd";
import { Link, useLocation } from "react-router-dom";

function ReceiveRequests() {
  const [requests, setRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://6628a3dc54afcabd073664dc.mockapi.io/receive"
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
    }
  };

  const handleAcceptRequest = async (record) => {
    try {
      await axios.put(
        `https://6628a3dc54afcabd073664dc.mockapi.io/saler/${record.id}`,
        { status: "Processing" }
      );
      setRequests(requests.filter((request) => request.id !== record.id));
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const columns = [
    { title: "Request ID", dataIndex: "id", key: "id" },
    { title: "Detail", dataIndex: "detail", key: "detail" },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button type="primary" onClick={() => handleAcceptRequest(record)}>
          Nhận đơn
        </Button>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-6xl font-extrabold pb-9 bg-slate-400 text-center">
        Nhân viên bán hàng
      </h1>
      <Link
          className={`mr-4 ${location.pathname === "/saler/receive_requests" ? "underline font-bold" : ""}`}
          to="/saler/receive_requests"
        >
          Nhận đơn để xử lí
        </Link>
        <Link
          className={`${location.pathname === "/saler/process_requests" ? "underline font-bold" : ""}`}
          to="/saler/process_requests"
        >
          Đơn đã nhận
        </Link>
      <Table columns={columns} dataSource={requests} />
    </div>
  );
}

export default ReceiveRequests;
