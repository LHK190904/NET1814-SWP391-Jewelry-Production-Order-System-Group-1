import axios from "axios";
import React, { useEffect, useState } from "react";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, message, Upload, Modal, Image } from "antd";
import uploadFile from "../../utils/upload";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Designer() {
  const [listItems, setListItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState("");
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const API_URL = "https://664ef13afafad45dfae19e02.mockapi.io/Product";

  const fetchInfo = async () => {
    try {
      const response = await axios.get(API_URL);
      setListItems(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const handleUpload = async () => {
    setUploading(true);

    try {
      // Tạo mảng các promises để tải lên tất cả các file
      const uploadPromises = fileList.map(async (file) => {
        const url = await uploadFile(file.originFileObj);
        return { url, id: selectedItem.orderID };  // Sử dụng orderID làm id
      });

      // Chờ tất cả các upload hoàn tất
      const uploadedFiles = await Promise.all(uploadPromises);

      // Gửi yêu cầu lưu thông tin ảnh vào API
      const response = await axios.post(
        "https://663ddef6e1913c476795b585.mockapi.io/account",
        uploadedFiles
      );

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

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFileList([]);
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="text-white text-7xl text-center">Design staff</div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-1 col-span-9 bg-white m-4 rounded-lg p-4">
          <h1 className="text-center font-extrabold text-3xl">
            CHI TIẾT ĐƠN HÀNG {selectedItem.orderID}
          </h1>
          <div className="grid grid-cols-2 text-center mt-4">
            {/* <div className="col-span-1 font-bold">MÃ ĐƠN</div> */}
            <div className="col-span-1 font-bold">MÔ TẢ</div>
            <div className="col-span-1 font-bold">BẢN THIẾT KẾ</div>
            {selectedItem ? (
              <React.Fragment key={selectedItem.orderID}>
                {/* <div className="col-span-1">{selectedItem.orderID}</div> */}
                <div className="col-span-1 mt-2">
                  {selectedItem.description || "Descrption"}
                </div>
                <div className="col-span-1 flex justify-center mt-2">
                  <Button icon={<UploadOutlined />} onClick={openModal}>
                    Chọn file
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
              <React.Fragment key={item.orderID}>
                <div
                  className="col-span-1 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  {item.orderID}
                </div>
                <div
                  className="col-span-1 cursor-pointer"
                  onClick={() => handleItemClick(item)}
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
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          beforeUpload={() => false}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
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
      </Modal>
    </div>
  );
}

export default Designer;
