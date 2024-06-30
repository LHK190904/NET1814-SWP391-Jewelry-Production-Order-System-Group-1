import React, { useState } from "react";
import Carousel from "../../components/Carousel";
import authService from "../../services/authService";
import axios from "axios";
import { Modal, Form, Input, Button, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form] = Form.useForm();

  const initialDataForm = [
    {
      requestId: "",
      customerId: "",
      category: "",
      goldType: "",
      materialWeight: "",
      mainStoneId: "",
      subStomeId: "",
      description: "",
      uRLImage: "",
      buyCost: "",
      sellCost: "",
      updated: "",
    },
  ];

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
    setFileList([]);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const user = authService.getCurrentUser();
      if (user && user.id) {
        const uploadedUrls = await uploadImages();
        const API_URL = `http://localhost:8080/requests/${user.id}`;
        axios
          .post(
            API_URL,
            { ...values, uRLImage: uploadedUrls },
            {
              headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            }
          )
          .then((response) => {
            console.log("Success", response.data);
            setIsModalOpen(false);
            message.success("Yêu cầu đã được gửi thành công");
          })
          .catch((error) => {
            console.error("Error", error);
            message.error("Đã xảy ra lỗi khi gửi yêu cầu");
          });
      }
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const uploadImages = async () => {
    const uploadPromises = fileList.map(async (file) => {
      if (!file.url) {
        const url = await uploadFile(file.originFileObj);
        return url;
      }
      return file.url;
    });
    return await Promise.all(uploadPromises);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const beforeUpload = (file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error("You can only upload JPG/PNG file!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Tải lên</div>
    </div>
  );

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <div>
      <div className="w-full h-fit">{/* <Carousel /> */}</div>
      <div className="flex items-center justify-center min-h-screen bg-[#434343]">
        <div>
          <button onClick={handleShowModal} className="text-white">
            ĐẶT YÊU CẦU
          </button>
        </div>
      </div>
      <Modal
        title="YÊU CẦU TƯ VẤN GIA CÔNG"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleHideModal}
      >
        <Form form={form} labelCol={{ span: 24 }}>
          <Form.Item
            name="category"
            label="Loại trang sức"
            rules={[
              { required: true, message: "Vui lòng chọn loại trang sức" },
            ]}
          >
            <Select>
              <Select.Option value="ring">Nhẫn</Select.Option>
              <Select.Option value="necklace">Dây chuyền</Select.Option>
              <Select.Option value="bracelet">Vòng tay</Select.Option>
              <Select.Option value="earrings">Bông tai</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="goldType"
            label="Vật liệu"
            rules={[{ required: true, message: "Vui lòng nhập vật liệu" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="materialWeight"
            label="Trọng lượng vật liệu"
            rules={[
              { required: true, message: "Vui lòng nhập trọng lượng vật liệu" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="mainStoneId" label="Đá chính">
            <Input />
          </Form.Item>
          <Form.Item name="subStoneId" label="Đá phụ">
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: fileList.length === 0,
                message: "Vui lòng nhập mô tả nếu không có hình ảnh",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Bản thiết kế (Nếu có)">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={async (file) => {
                if (!file.url && !file.preview) {
                  file.preview = await getBase64(file.originFileObj);
                }
                window.open(file.url || file.preview);
              }}
              onChange={handleChange}
              beforeUpload={beforeUpload}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
