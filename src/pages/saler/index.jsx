import { Button, Form, Input, Modal, Space, Table, Tag, message } from "antd";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRequests } from "../../context/RequestContext.jsx";

function Saler() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData] = useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const { requests, setRequests, sendRequest } = useRequests(); // Sử dụng context

  const handleAnnounce = async (id) => {
    console.log(id);
  };

  const handleShowModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const handleOk = () => {
    formData.validateFields().then((values) => {
      handleSubmit(values);
    });
  };

  const fetchRequest = async () => {
    try {
      const response = await axios.get(
        "https://6628a3dc54afcabd073664dc.mockapi.io/saler"
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  const handleSubmit = async (values) => {
    if (selectedRecord) {
      const updatedRecord = {
        ...selectedRecord,
        ...values,
        status: "Chưa xử lý",
      };
      setRequests((prevData) =>
        prevData.map((record) =>
          record.id === updatedRecord.id ? updatedRecord : record
        )
      );
      handleHideModal();
    }
  };

  const columns = [
    {
      title: "Request ID",
      dataIndex: "id",
      key: "id",
      width: "5%",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      width: "45%",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      width: "10%",
      render: (status) => {
        let color = "volcano";
        if (status === "Approve") {
          color = "green";
        } else if (status === "Pending") {
          color = "blue";
        } else if (status === "Chưa xử lý") {
          color = "gray";
        }
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
      width: "30%",
      render: (_, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleShowModal(record)}>
            Nhập liệu
          </Button>
          <Button
            onClick={() => sendRequest(record.id)}
            className="bg-green-400"
          >
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
    <>
      <Table columns={columns} dataSource={requests} />

      <Modal
        open={isModalOpen}
        title={<div className="text-center text-lg ">Nhập thông tin</div>}
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
        <p>Mã yêu cầu: {selectedRecord?.id}</p>
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
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
}

export default Saler;
