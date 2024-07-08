import { useEffect, useState } from "react";
import axiosInstance from "../../../services/axiosInstance";
import { Link, useLocation } from "react-router-dom";
import LogoutButton from "../../../components/logoutButton";
import { Modal, Input, Button, Form } from "antd";

function ManageMaterial() {
  const location = useLocation();
  const [materials, setMaterials] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      const response = await axiosInstance.get("/material/notGold");
      setMaterials(response.data.result || []);
    } catch (error) {
      console.error("Không thể lấy danh sách nguyên liệu:", error);
    }
  };

  const handleAddMaterial = () => {
    setIsEditMode(false);
    setCurrentMaterial(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditMaterial = (material) => {
    setIsEditMode(true);
    setCurrentMaterial(material);
    form.setFieldsValue(material);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    try {
      if (isEditMode) {
        await axiosInstance.put(`/material/${currentMaterial.id}`, values);
      } else {
        await axiosInstance.post("/material", values);
      }
      fetchMaterials();
      setIsModalVisible(false);
    } catch (error) {
      console.error("Không thể lưu nguyên liệu:", error);
    }
  };

  return (
    <>
      <div className="bg-[#7873d8]">
        <div className="mr-10">
          <LogoutButton />
        </div>
        <div className="mb-4">
          <Link
            className={`mr-4 ${
              location.pathname === "/production-staff/process-orders"
                ? "underline font-bold"
                : ""
            }`}
            to="/production-staff/process-orders"
          >
            Process orders
          </Link>
          <Link
            className={`${
              location.pathname === "/production-staff/manage-materials"
                ? "underline font-bold"
                : ""
            }`}
            to="/production-staff/manage-materials"
          >
            Manage materials
          </Link>
        </div>
      </div>
      <div className="bg-[#434343] min-h-screen w-screen flex justify-center items-center">
        <div className="w-3/4 bg-gray-300 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl">Manage Materials</h1>
            <Button type="primary" onClick={handleAddMaterial}>
              Add Material
            </Button>
          </div>
          <table className="w-full bg-white rounded-lg">
            <thead>
              <tr className="border-b">
                <th className="p-4 text-left">Type</th>
                <th className="p-4 text-left">Price Per Unit</th>
                <th className="p-4 text-left">Material Name</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.id} className="border-b">
                  <td className="p-4">{material.type}</td>
                  <td className="p-4">{material.pricePerUnit}</td>
                  <td className="p-4">{material.materialName}</td>
                  <td className="p-4 text-center">
                    <Button
                      type="link"
                      onClick={() => handleEditMaterial(material)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        title={isEditMode ? "Edit Material" : "Add Material"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: "Please input the type!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Price Per Unit"
            name="pricePerUnit"
            rules={[
              { required: true, message: "Please input the price per unit!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="Material Name"
            name="materialName"
            rules={[
              { required: true, message: "Please input the material name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Save Changes" : "Add Material"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default ManageMaterial;
