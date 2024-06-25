import React, { useEffect, useState } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Upload, Modal, Image, Form, Input } from "antd";
import uploadFile from "../../utils/upload";
import LogoutButton from "../../components/logoutButton";
import authService from "../../services/authService";
import axiosInstance from "../../services/axiosInstance";
import TextArea from "antd/es/input/TextArea";


const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Designer() {
  const [listItems, setListItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [form] = Form.useForm();

  const fetchInfo = async () => {
    try {
      const designer = authService.getCurrentUser();
      const response = await axiosInstance.get(
        `/request-orders/getOrderForDesigner/${designer.id}`
      );
      setListItems(response.data.result || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
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
          `orders/${selectedItem.id}`
        );
        return url;
      }
      return file.url;
    });
    return await Promise.all(uploadPromises);
  };

  const saveDesignData = async (uploadedUrls) => {
    const values = await form.validateFields();
    const { designName, description } = values;

    if (selectedItem && selectedItem.id) {
      // Nếu đã có selectedItem.id, thực hiện PUT để cập nhật bản thiết kế
      await axiosInstance.put(`/design/${selectedItem.id}`, {
        designName,
        description,
        listURLImage: uploadedUrls,
      });
    } else {
      // Nếu chưa có selectedItem.id, thực hiện POST để thêm bản thiết kế mới
      await axiosInstance.post(`/design`, {
        designName,
        description,
        listURLImage: uploadedUrls,
      });
    }
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const uploadedUrls = await uploadDesignImages();
      await saveDesignData(uploadedUrls);

      setFileList([]);
      message.success("Tải lên thành công.");
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      message.error("Tải lên thất bại.");
    } finally {
      setUploading(false);
    }
  };

  const fetchDesignData = async (id) => {
    try {
      const response = await axiosInstance.get(`/design/${id}`);
      return response.data.result;
    } catch (error) {
      console.error("Failed to fetch design data:", error);
      throw error;
    }
  };

  const initializeFormAndFileList = (designData) => {
    if (designData && designData.designName && designData.description) {
      // Đặt giá trị ban đầu cho form nếu có dữ liệu
      form.setFieldsValue({
        designName: designData.designName,
        description: designData.description,
      });

      // Cập nhật danh sách tệp tin với URL ảnh từ API, đảm bảo listURLImage luôn là một mảng
      const initialFileList = (designData.listURLImage || []).map(
        (url, index) => ({
          uid: index,
          name: `image-${index}`,
          status: "done",
          url,
        })
      );
      setFileList(initialFileList);
    } else {
      form.resetFields();
      setFileList([]);
    }
  };

  const openModal = async () => {
    try {
      if (selectedItem && selectedItem.id) {
        // Nếu đã có selectedItem.id, gọi API để lấy dữ liệu thiết kế hiện tại
        const designData = await fetchDesignData(selectedItem.id);
        initializeFormAndFileList(designData);
      } else {
        // Nếu chưa có selectedItem.id, reset form về trạng thái ban đầu
        form.resetFields();
        setFileList([]);
      }
      setIsModalOpen(true);
    } catch (error) {
      message.error("Failed to open modal.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFileList([]);
    form.resetFields(); // Reset form fields khi đóng modal
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
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-span-9 bg-white m-4 rounded-lg p-4">
          <h1 className="text-center font-extrabold text-3xl">
            CHI TIẾT ĐƠN HÀNG {selectedItem?.id}
          </h1>
          <div className="grid grid-cols-2 text-center mt-4">
            <div className="col-span-1 font-bold">MÔ TẢ TỪ KHÁCH HÀNG</div>
            <div className="col-span-1 font-bold">BẢN THIẾT KẾ</div>
            {selectedItem ? (
              <React.Fragment key={selectedItem.id}>
                <div className="col-span-1 mt-2">
                  {selectedItem.description}
                </div>
                <div className="col-span-1 flex justify-center mt-2">
                  <Button icon={<UploadOutlined />} onClick={openModal}>
                    Thêm bản thiết kế
                  </Button>
                </div>
              </React.Fragment>
            ) : (
              <div className="col-span-5 text-center mt-16">
                Chọn đơn hàng để xem thông tin
              </div>
            )}
          </div>
        </div>

        <div className="col-start-10 col-span-3 bg-white m-4 rounded-lg p-4">
          <h1 className="text-center text-3xl font-bold">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-2 text-center mt-4 max-h-screen">
            <div className="col-span-1 font-bold">ID ORDER</div>
            <div className="col-span-1 font-bold">TRẠNG THÁI</div>
            {listItems.map((item) => (
              <React.Fragment key={item.id}>
                <div
                  className={`col-span-1 cursor-pointer ${
                    selectedItem?.id === item.id ? "underline" : ""
                  }`}
                  onClick={() => setSelectedItem(item)}
                >
                  {item.id}
                </div>
                <div
                  className="col-span-1 cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  {item.status}
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        title="Tải lên bản thiết kế"
        onCancel={closeModal}
        footer={[
          <Button key="back" onClick={closeModal}>
            Hủy
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleUpload}
            disabled={fileList.length === 0}
            loading={uploading}
          >
            {uploading ? "Uploading" : "Tải lên"}
          </Button>,
        ]}
      >
        <Form form={form} labelCol={{ span: 24 }}>
          <Form.Item
            label="Tên bản thiết kế"
            name="designName"
            rules={[
              { required: true, message: "Vui lòng nhập tên bản thiết kế" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mô tả bản thiết kế"
            name="description"
            rules={[
              { required: true, message: "Vui lòng nhập mô tả bản thiết kế" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
            beforeUpload={() => false}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default Designer;
