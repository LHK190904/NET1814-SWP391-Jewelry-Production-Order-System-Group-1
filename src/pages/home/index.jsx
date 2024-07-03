import React, { useEffect, useState } from "react";
import authService from "../../services/authService";
import axios from "axios";
import { Modal, Form, Input, Select, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import uploadFile from "../../utils/upload";
import Tutorial from "../../components/Tutorial";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [dataAPI, setDataAPI] = useState([]);
  const [material, setMaterial] = useState([]);
  const [goldTypeData, setGoldTypeData] = useState({
    sellCost: 0,
    buyCost: 0,
    updated: "",
  });
  const [formData, setFormData] = useState({
    category: "",
    goldType: "",
    materialWeight: "",
    mainStoneId: 0,
    subStoneId: 0,
    description: "",
    updated: "",
    sellCost: 0,
    buyCost: 0,
    uRLImage: [""],
  });

  const fetchAPI = async () => {
    try {
      const goldResponse = await axios.get(
        `http://localhost:8080/api/gold/prices`
      );
      const goldData = goldResponse.data.DataList.Data.map((item, index) => ({
        goldType: item[`@n_${index + 1}`],
        sellCost: item[`@pb_${index + 1}`],
        buyCost: item[`@pb_${index + 1}`],
        updated: item[`@d_${index + 1}`],
      }));
      setDataAPI(goldData);

      const materialResponse = await axios.get(
        `http://localhost:8080/material/notGold`
      );
      setMaterial(materialResponse.data.result);
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
        const uploadedUrls = await Promise.all(
          fileList.map((file) => {
            if (!file.url && file.originFileObj) {
              return uploadFile(file.originFileObj, `request/${user.id}`);
            }
            return file.url;
          })
        );

        const API_URL = `http://localhost:8080/requests/${user.id}`;

        const requestData = {
          ...formData,
          uRLImage: uploadedUrls,
          updated: goldTypeData.updated,
          sellCost: goldTypeData.sellCost,
          buyCost: goldTypeData.buyCost,
        };

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
        message.error("Vui lòng đăng nhập để gửi yêu cầu");
      }
    } catch (error) {
      console.error(
        "Error",
        error.response ? error.response.data : error.message
      );
      message.error("Đã xảy ra lỗi khi gửi yêu cầu");
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const beforeUpload = (file) => {
    const isImage = file.type === "image/jpeg" || file.type === "image/png";
    if (!isImage) {
      message.error("Chỉ có thể upload file dạng JPG hoặc PNG!");
    }
    return isImage;
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div>Tải lên</div>
    </div>
  );

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
        sellCost: selectedGoldTypeData.sellCost,
        buyCost: selectedGoldTypeData.buyCost,
      }));
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <div className="w-screen min-h-screen bg-[#434343] text-[#F7EF8A]">
      <div className="grid grid-cols-12">
        <h1 className="col-span-12 text-center text-4xl">
          QUY TRÌNH ĐẶT GIA CÔNG TẠI LUXE
        </h1>

        <div className="col-start-3 col-span-8">
          <Tutorial />
        </div>

        <button
          onClick={handleShowModal}
          className="col-start-6 col-span-2 bg-[#F7EF8A] text-black p-4 my-4 rounded-lg"
        >
          ĐẶT YÊU CẦU
        </button>
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
            <Select allowClear>
              {material.map((item, index) => (
                <Select.Option key={index} value={item.id}>
                  {item.type}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="subStoneId" label="Đá phụ (Nếu có):">
            <Select allowClear>
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
              multiple={true}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
