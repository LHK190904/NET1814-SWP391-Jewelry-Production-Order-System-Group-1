import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { Button, Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

function ReceiveRequests() {
  const [requests, setRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      // const response = await axiosInstance.get("/saler");
      const response = await axios.get(
        "https://6628a3dc54afcabd073664dc.mockapi.io/saler"
      );
      // Chỉ hiển thị các yêu cầu chưa được nhận (saleId là rỗng hoặc null)
      const unassignedRequests = response.data.filter(
        (request) => !request.saleId
      );
      setRequests(unassignedRequests);
    } catch (error) {
      console.error("Không thể lấy yêu cầu:", error);
    }
  };
  const handleAcceptRequest = async (record) => {
    try {
      await axios.put(
        `https://6628a3dc54afcabd073664dc.mockapi.io/saler/${record.id}`,
        { status: "Processing",saleId:"8" }   // test api fake
      );
      setRequests(requests.filter((request) => request.id !== record.id));
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };
  const columns = [
    { title: "Mã yêu cầu", dataIndex: "id", key: "id" },
    { title: "Chi tiết", dataIndex: "detail", key: "detail" },

    {
      title: "Hành động",
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
      <div className="mb-4">
        <Link
          className={`mr-4 ${
            location.pathname === "/saler/receive_requests"
              ? "underline font-bold"
              : ""
          }`}
          to="/saler/receive_requests"
        >
          Nhận đơn để xử lý
        </Link>
        <Link
          className={`${
            location.pathname === "/saler/process_requests"
              ? "underline font-bold"
              : ""
          }`}
          to="/saler/process_requests"
        >
          Đơn đã nhận
        </Link>
      </div>
      <Table columns={columns} dataSource={requests} />
    </div>
  );
}

export default ReceiveRequests;
