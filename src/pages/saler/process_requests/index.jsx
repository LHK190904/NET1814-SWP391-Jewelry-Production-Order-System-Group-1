import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import authService from "../../../services/authService";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Tag,
  Space,
  message,
  InputNumber,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import FormItem from "antd/es/form/FormItem";

function ProcessRequests() {
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState("");
  const [customerInfo, setCustomerInfo] = useState(null);
  const [formData] = useForm();
  const location = useLocation();
  const [salerId, setSalerId] = useState("");

  useEffect(() => {
    const user = authService.getCurrentUser();
    // console.log(user.id);
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
      const response = await axiosInstance.get(`/requests/sales/${salerId}`);
      setRequests(response.data.result);
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
    if (!values.cost) {
      message.warning("Bạn chưa lấy giá cho đơn hàng này.");
      return;
    }

    try {
      const updatedRecord = {
        ...selectedRecord,
        ...values,
        status: "Processing",
      };
      await axios.put(
        `https://6628a3dc54afcabd073664dc.mockapi.io/saler/${selectedRecord.id}`,
        updatedRecord
      );
      await axios.post(
        `https://6628a3dc54afcabd073664dc.mockapi.io/manager`,
        updatedRecord
      );
      setRequests(
        requests.map((request) =>
          request.id === updatedRecord.id ? updatedRecord : request
        )
      );
      message.success("Đã gửi cho quản lý!");
      handleHideModal();
    } catch (error) {
      console.error("Không thể cập nhật yêu cầu:", error);
    }
  };

  const handleAnnounce = (id) => {
    console.log("Thông báo cho khách hàng:", id);
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
    { title: "Giá", dataIndex: "cost", key: "cost" },
    {
      title: "Trạng thái",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let color = "volcano";
        if (status === "Approve") color = "green";
        if (status === "Processing") color = "blue";
        if (status === "Pending") color = "gray";
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
              <FormItem label="Giá vật liệu" name="material">
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
              </FormItem>
              <FormItem
                label="Giá"
                name="cost"
                rules={[
                  {
                    // required: true,
                    type: "number",
                    // message: "Giá phải là số.",
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </FormItem>
            </div>
          </div>
        </Form>
      </Modal>

      <Modal
        open={isCustomerModalOpen}
        title={<div className="text-center text-2xl">Thông tin khách hàng</div>}
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
