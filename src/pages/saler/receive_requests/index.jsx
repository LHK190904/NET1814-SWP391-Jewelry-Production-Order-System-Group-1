import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { Button, Table } from "antd";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../../../components/logoutButton";

function ReceiveRequests() {
  const [requests, setRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get("requests/unrecievedRequest");
      console.log(response.data.result);
      setRequests(response.data.result);
    } catch (error) {
      console.error("Không thể lấy yêu cầu:", error);
    }
  };

  const handleAcceptRequest = async (record) => {
    try {
      const response = await axiosInstance.put(`requests/sales/${record.id}`);
      setRequests(requests.filter((request) => request.id !== record.id));
      console.log(response.data);
    } catch (error) {
      console.error("Failed to accept request:", error);
    }
  };

  const columns = [
    { title: "Mã yêu cầu", dataIndex: "id", key: "id" },
    { title: "Chi tiết", dataIndex: "description", key: "description" },
    { title: "Thời gian tạo", dataIndex: "createdAt", key: "createdAt" },
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
      <div className="flex justify-between items-center pb-9 bg-slate-400">
        <h1 className="text-6xl font-extrabold text-center">
          Nhân viên bán hàng
        </h1>
        <div className="mr-10">
          <LogoutButton />
        </div>
      </div>
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
