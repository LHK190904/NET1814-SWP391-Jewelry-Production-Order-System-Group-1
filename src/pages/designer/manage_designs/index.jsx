import React, { useEffect, useState } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  message,
  Upload,
  Modal,
  Image,
  Form,
  Popconfirm,
  Select,
  Input,
} from "antd";
import uploadFile from "../../../utils/upload";
import LogoutButton from "../../../components/logoutButton";
import axiosInstance from "../../../services/axiosInstance";
import TextArea from "antd/es/input/TextArea";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function ManageDesign() {
  const [listItems, setListItems] = useState([]);
  const [selectedDesignItem, setSelectedDesignItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();
  const [designID, setDesignID] = useState(null);
  const location = useLocation();
  const [material, setMaterial] = useState([]);
  const [dataAPI, setDataAPI] = useState([]);
  const [materialName, setMaterialName] = useState("");
  const [modalTitle, setModalTitle] = useState("Add new design");

  const fetchInfo = async () => {
    try {
      const response = await axiosInstance.get("/design/getAllCompanyDesign");
      setListItems(response.data.result || []);
    } catch (error) {
      console.error(error);
    }
  };

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
    fetchInfo();
    fetchAPI();
  }, []);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadDesignImages = async () => {
    const uploadPromises = fileList.map(async (file) => {
      if (!file.url) {
        const url = await uploadFile(
          file.originFileObj,
          `designs/${selectedDesignItem?.id}`
        );
        return url;
      }
      return file.url;
    });
    return await Promise.all(uploadPromises);
  };

  const handleUpload = async () => {
    try {
      const uploadedUrls = await uploadDesignImages();
      const values = await form.validateFields();
      const {
        description,
        category,
        designName,
        mainStoneId = 0,
        subStoneId = 0,
        materialWeight,
        materialName,
      } = values;
      const payload = {
        description,
        listURLImage: uploadedUrls,
        category,
        designName,
        materialName,
        mainStoneId,
        subStoneId,
        materialWeight,
      };

      if (designID) {
        await axiosInstance.put(
          `/design/updateCompanyDesign/${designID}`,
          payload
        );
      } else {
        await axiosInstance.post(`/design/createCompanyDesign`, payload);
      }
      setFileList([]);
      message.success("Tải lên thành công.");
      setIsModalOpen(false);
      fetchInfo();
    } catch (error) {
      console.error(error);
      message.error("Tải lên thất bại.");
    }
  };

  const initializeFormAndFileList = (designData) => {
    form.setFieldsValue({
      description: designData.description,
      category: designData.category,
      designName: designData.designName,
      materialName: designData.materialName,
      mainStoneId: designData.mainStoneId ?? "0",
      subStoneId: designData.subStoneId ?? "0",
      materialWeight: designData.materialWeight,
    });

    const initialFileList = (designData.listURLImage || []).map(
      (url, index) => ({
        uid: index,
        name: `image-${index}`,
        status: "done",
        url,
      })
    );
    setFileList(initialFileList);
  };

  const openEditModal = async (item) => {
    try {
      setSelectedDesignItem(item);
      setDesignID(item.id);
      setModalTitle(`Edit design ${item.id} `);
      initializeFormAndFileList(item);
      setIsModalOpen(true);
    } catch (error) {
      message.error("Failed to open modal.");
    }
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
    setFileList([]);
    form.resetFields();
  };

  const handleDelete = async (designId) => {
    try {
      await axiosInstance.delete(`/design/deleteDesign/${designId}`);
      message.success("Xóa thành công.");
      fetchInfo();
    } catch (error) {
      console.error("Failed to delete design:", error);
      message.error("Xóa thất bại.");
    }
  };

  const handleOpenAddModal = () => {
    setSelectedDesignItem(null);
    setDesignID(null);
    setModalTitle("Add new design");
    form.resetFields();
    setFileList([]);
    setIsModalOpen(true);
  };

  const handleGoldTypeChange = async (value) => {
    try {
      const selectedGoldTypeData = dataAPI.find(
        (item) => item.goldType === value
      );
      setMaterialName(selectedGoldTypeData?.goldType || "");
    } catch (error) {
      console.error(error);
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Tải lên</div>
    </div>
  );

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="text-white text-7xl text-center">Design staff</div>
      <div className="text-end mr-4">
        <LogoutButton />
      </div>

      <div className="mb-4 text-white">
        <Link
          className={`mr-4 ml-4 ${
            location.pathname === "/designer/process_orders"
              ? "underline font-bold"
              : ""
          }`}
          to="/designer/process_orders"
        >
          Order processing
        </Link>
        <Link
          className={` ${
            location.pathname === "/designer/manage_designs"
              ? "underline font-bold"
              : ""
          }`}
          to="/designer/manage_designs"
        >
          Manage design
        </Link>
      </div>
      <Button onClick={handleOpenAddModal}>Add design</Button>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-span-12 bg-white m-4 rounded-lg p-4">
          <h1 className="text-center font-extrabold text-3xl">
            List of designs
          </h1>
          <div className="grid grid-cols-3 text-center mt-4">
            <div className="col-span-1 font-bold">Design ID</div>
            <div className="col-span-1 font-bold">Design name</div>
            <div className="col-span-1 font-bold">Action</div>
            {listItems.length > 0 ? (
              listItems.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="col-span-1 mt-2">{item.id}</div>
                  <div className="col-span-1 mt-2">{item.designName}</div>
                  <div className="col-span-1 flex justify-center mt-2">
                    <Button
                      icon={<UploadOutlined />}
                      onClick={() => openEditModal(item)}
                      className="mr-4"
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Delete"
                      description="Are you sure you want to delete this design?"
                      onConfirm={() => handleDelete(item.id)}
                      okText="OK"
                      cancelText="Cancel"
                    >
                      <Button danger>Delete</Button>
                    </Popconfirm>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <div className="col-span-5 text-center mt-16">Empty</div>
            )}
          </div>
        </div>
      </div>

      <Modal
        title={
          <div className="text-center text-2xl font-bold">{modalTitle}</div>
        }
        open={isModalOpen}
        onOk={handleUpload}
        onCancel={handleHideModal}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          initialValues={{ mainStoneId: 0, subStoneId: 0 }}
        >
          <Form.Item
            name="designName"
            label="Tên thiết kế:"
            rules={[{ required: true, message: "Vui lòng nhập tên thiết kế" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Loại trang sức:"
            rules={[
              { required: true, message: "Vui lòng chọn loại trang sức" },
            ]}
          >
            <Select>
              <Select.Option value="RING">RING</Select.Option>
              <Select.Option value="NECKLACE">NECKLACE</Select.Option>
              <Select.Option value="BRACELET">BRACELET</Select.Option>
              <Select.Option value="EARRINGS">EARRINGS</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="materialName"
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
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <TextArea />
          </Form.Item>

          <Form.Item label="Upload hình ảnh:">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={previewOpen}
        title="Preview Image"
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <Image src={previewImage} />
      </Modal>
    </div>
  );
}

export default ManageDesign;
