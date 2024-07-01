import React, { useEffect, useState } from "react";
import Carousel from "../../components/Carousel";
import authService from "../../services/authService";
import axios from "axios";
import { Modal, Form, Input, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [dataAPI, setDataAPI] = useState([]);
  const [material, setMaterial] = useState([]);
  const [goldTypeData, setGoldTypeData] = useState({});

  const [formData, setFormData] = useState({
    category: "",
    goldType: "",
    materialWeight: "",
    mainStoneId: "",
    subStoneId: "",
    description: "",
    updated: "",
    uRLImage: [],
  });

  const fetchAPI = async () => {
    try {
      const goldResponse = await axios.get(
        `http://localhost:8080/api/gold/prices`
      );
      const goldData = goldResponse.data.DataList.Data.map((item, index) => ({
        goldType: item[`@n_${index + 1}`],
        price: item[`@pb_${index + 1}`],
        updated: item[`@d_${index + 1}`],
      }));
      setDataAPI(goldData);
      console.log(goldData);

      const materialResponse = await axios.get(
        `http://localhost:8080/material/notGold`
      );
      setMaterial(materialResponse.data.result);
      console.log(materialResponse.data.result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAPI();
  }, []);

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
      const user = authService.getCurrentUser();

      if (user && user.id) {
        const uploadedUrls = await uploadImages();
        const API_URL = `http://localhost:8080/requests/${user.id}`;

        const requestData = {
          ...formData,
          uRLImage: uploadedUrls,
          updated: goldTypeData.updated,
        };

        // Log the request data before submission
        console.log("Request Data before submit:", requestData);
        console.log(requestData.updated);

        const response = await axios.post(API_URL, requestData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        });

        console.log("Success", response.data);
        setIsModalOpen(false);
        message.success("Yêu cầu đã được gửi thành công");
      } else {
        message.error("Người dùng không hợp lệ");
      }
    } catch (error) {
      console.error(
        "Error",
        error.response ? error.response.data : error.message
      );
      message.error("Đã xảy ra lỗi khi gửi yêu cầu");
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
    return isImage;
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

  const handleGoldTypeChange = async (value) => {
    try {
      const selectedGoldTypeData = dataAPI.find(
        (item) => item.goldType === value
      );
      setGoldTypeData(selectedGoldTypeData);
      setFormData((prevFormData) => ({
        ...prevFormData,
        goldType: value,
        updated: selectedGoldTypeData.updated,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <div>
      <div className="w-full h-fit">{/* <Carousel /> */}</div>
      <div className="flex items-center justify-center min-h-screen bg-[#434343]">
        <div>
          <button
            onClick={handleShowModal}
            className="bg-[#F7EF8A] p-4 rounded-lg"
          >
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
        <Form
          form={form}
          labelCol={{ span: 24 }}
          initialValues={formData}
          onValuesChange={handleFormChange}
        >
          <Form.Item
            name="category"
            label="Loại trang sức:"
            rules={[
              { required: true, message: "Vui lòng chọn loại trang sức" },
            ]}
          >
            <Select>
              <Select.Option value="RING">Nhẫn</Select.Option>
              <Select.Option value="NECKLACE">Dây chuyền</Select.Option>
              <Select.Option value="BRACELET">Vòng tay</Select.Option>
              <Select.Option value="EARRINGS">Bông tai</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="goldType"
            label="Vật liệu:"
            rules={[{ required: true, message: "Vui lòng nhập vật liệu" }]}
          >
            <Select onChange={handleGoldTypeChange}>
              {dataAPI.map((item, index) => (
                <Select.Option key={index} value={item.goldType}>
                  {item.goldType}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="materialWeight"
            label="Trọng lượng vật liệu: (Đơn vị: Chỉ)"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trọng lượng vật liệu",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="mainStoneId" label="Đá chính (Nếu có):">
            <Select>
              {material.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="subStoneId" label="Đá phụ (Nếu có):">
            <Select>
              {material.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="description"
            label="Mô tả:"
            rules={[
              {
                required: fileList.length === 0,
                message: "Vui lòng nhập mô tả nếu không có hình ảnh",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Bản thiết kế (Nếu có):">
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
