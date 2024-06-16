import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import authService from "../../../services/authService";
import { Button, Modal, Form, Input, Table, Tag, Space } from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useLocation } from "react-router-dom";
import FormItem from "antd/es/form/FormItem";

function ProcessRequests() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [formData] = useForm();
  const location = useLocation();
  const [salerId, setSalerId] = useState(null);

  useEffect(() => {
    const user = authService.getCurrentUser();
    if (user && user.id) {
      setSalerId(user.id);
    } else {
      console.error("Người dùng chưa đăng nhập");
    }
  }, []);

  useEffect(() => {
    if (salerId) {
      fetchRequests();
    }
  }, [salerId]);

  const fetchRequests = async () => {
    try {
      const response = await axiosInstance.get("/saler");
      setRequests(
        response.data.filter((request) => request.saleId === salerId)
      );
    } catch (error) {
      console.error("Không thể lấy yêu cầu:", error);
    }
  };

  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
    setSelectedRecord("");
  };

  const handleOk = () => {
    formData.validateFields().then((values) => {
      handleSubmit(values);
    });
  };

  const handleSubmit = async (values) => {
    try {
      const updatedRecord = { ...selectedRecord, ...values, status: "Pending" };
      await axiosInstance.put(`/saler/${selectedRecord.id}`, updatedRecord);
      setRequests(
        requests.map((request) =>
          request.id === updatedRecord.id ? updatedRecord : request
        )
      );
      handleHideModal();
    } catch (error) {
      console.error("Không thể cập nhật yêu cầu:", error);
    }
  };

  const handleAnnounce = (id) => {
    console.log("Thông báo cho khách hàng:", id);
  };

  const handleSendToManager = (id) => {
    console.log("Gửi cho quản lý:", id);
  };

  const handleShowCustomerInfo = (record) => {
    setCustomerInfo(record);
    setIsCustomerModalOpen(true);
  };

  const handleHideCustomerModal = () => {
    setIsCustomerModalOpen(false);
    setCustomerInfo(null);
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
          <Button type="primary" onClick={() => handleShowModal(record)}>
            Lấy giá
          </Button>
          <Button onClick={() => handleSendToManager(record.id)}>
            Gửi cho quản lý
          </Button>
          <Button onClick={() => handleAnnounce(record.id)}>
            Thông báo cho khách hàng
          </Button>
          <Button onClick={() => handleShowCustomerInfo(record)}>
            Thông tin khách hàng
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

      <Modal
        open={isModalOpen}
        title={<div className="text-center text-2xl">Nhập thông tin</div>}
        onOk={handleOk}
        onCancel={handleHideModal}
        width="60%"
        footer={[
          <Button key="back" onClick={handleHideModal}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Lấy giá tự động
          </Button>,
        ]}
      >
        <p className="text-lg font-semibold mb-10">
          Mã yêu cầu: {selectedRecord.id}
        </p>
        <Form form={formData}>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col flex-wrap w-1/2">
              <FormItem label="Giá" name="price">
                <Input />
              </FormItem>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        open={isCustomerModalOpen}
        title={<div className="text-center text-2xl">Thông tin khách hàng</div>}
        onOk={handleHideCustomerModal}
        onCancel={handleHideCustomerModal}
        width="60%"
        footer={[
          <Button key="back" onClick={handleHideCustomerModal}>
            Đóng
          </Button>,
        ]}
      >
        {customerInfo && (
          <div>
            <p className="text-lg font-semibold mb-2">
              Tên khách hàng:{" "}
              <span className="font-thin">{customerInfo.cusName}</span>
            </p>
            <p className="text-lg font-semibold mb-2">
              Email: <span className="font-thin">{customerInfo.email}</span>
            </p>
            <p className="text-lg font-semibold mb-2">
              Địa chỉ:{" "}
              <span className="font-thin"> {customerInfo.address}</span>
            </p>
            <p className="text-lg font-semibold mb-2">
              Số điện thoại:{" "}
              <span className="font-thin">{customerInfo.phoneNum}</span>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProcessRequests;
