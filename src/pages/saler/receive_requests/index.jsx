import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { Button, Table, Tag, Space } from "antd";
import { Link, useLocation } from "react-router-dom";

function ReceiveRequests() {
  const [requests, setRequests] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get("/saler");
      setRequests(response.data);
    } catch (error) {
      console.error("Không thể lấy yêu cầu:", error);
    }
  };

  const handleAnnounce = (id) => {
    console.log("Thông báo cho khách hàng:", id);
  };

  const handleSendToManager = (id) => {
    console.log("Gửi cho quản lý:", id);
  };

  const columns = [
    { title: "Mã yêu cầu", dataIndex: "id", key: "id" },
    { title: "Chi tiết", dataIndex: "detail", key: "detail" },
    { title: "Giá", dataIndex: "price", key: "price" },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "volcano";
        if (status === "Approve") color = "green";
        if (status === "Pending") color = "blue";
        if (status === "Chưa xử lý") color = "gray";
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleSendToManager(record.id)}>
            Gửi cho quản lý
          </Button>
          <Button onClick={() => handleAnnounce(record.id)}>
            Thông báo cho khách hàng
          </Button>
        </Space>
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
