import { useEffect, useState } from "react";
import axios from "axios";
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
  const location = useLocation(); // useLocation to get current URL

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        "https://6628a3dc54afcabd073664dc.mockapi.io/saler"
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch requests:", error);
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
      await axios.put(
        `https://6628a3dc54afcabd073664dc.mockapi.io/saler/${selectedRecord.id}`,
        updatedRecord
      );
      setRequests(
        requests.map((request) =>
          request.id === updatedRecord.id ? updatedRecord : request
        )
      );
      handleHideModal();
    } catch (error) {
      console.error("Failed to update request:", error);
    }
  };

  const handleAnnounce = (id) => {
    console.log("Announce to customer:", id);
  };

  const handleSendToManager = (id) => {
    console.log("Send to manager:", id);
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
    { title: "Request ID", dataIndex: "id", key: "id" },
    { title: "Detail", dataIndex: "detail", key: "detail" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Status",
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
      title: "Action",
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
              {/* <FormItem label="Giá vật liệu" name="material">
                <Input />
              </FormItem>
              <FormItem label="Trọng lượng" name="weight">
                <Input />
              </FormItem>
              <FormItem label="Tiền công" name="laborCost">
                <Input />
              </FormItem>
            </div>
            <div className="flex flex-col flex-wrap w-1/2">
              <FormItem label="Tiền đá" name="stoneCost">
                <Input />
              </FormItem>
              <FormItem label="Đá chính" name="mainStone">
                <Input />
              </FormItem>
              <FormItem label="Vật liệu" name="materialCost">
                <Input />
              </FormItem> */}
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
              Tên khách hàng: {customerInfo.cusName}
            </p>
            <p className="text-lg font-semibold mb-2">
              Email: {customerInfo.email}
            </p>
            <p className="text-lg font-semibold mb-2">
              Địa chỉ: {customerInfo.address}
            </p>
            <p className="text-lg font-semibold mb-2">
              Số điện thoại: {customerInfo.phoneNum}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProcessRequests;
