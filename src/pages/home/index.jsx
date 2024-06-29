import { useState } from "react";
import Carousel from "../../components/Carousel";
import authService from "../../services/authService";
import axios from "axios";
import { Modal } from "antd";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      form.resetFields();
      const user = authService.getCurrentUser();
      if (user && user.id) {
        const API_URL = `http://localhost:8080/requests/${user.id}`;
        axios
          .post(API_URL, values, {
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          })
          .then((response) => {
            console.log("Success", response.data);
            setIsModalOpen(false);
          })
          .catch((error) => {
            console.error("Error", error);
          });
      }
    });
  };

  return (
    <div>
      <div className="w-full h-fit">
        <Carousel />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-[#434343]">
        <div>
          <button onClick={handleShowModal} className="text-white">
            ĐẶT YÊU CẦU
          </button>
        </div>
      </div>
      <Modal
        title="YÊU CẦU TƯ VẤN GIA CÔNG"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleHideModal}
      >
        <form>
          <label>Loại trang sức: </label>
          <input type="text" />
          <label>Vật liệu</label>
          <input type="text" />
          <label>Trọng lượng vật liệu</label>
          <input type="text" />
          <label>Đá chính</label>
          <input type="text" />
          <label>Đá phụ</label>
          <input type="text" />
          <label>Mô tả</label>
          <input type="text" />
          <label>Bản thiết kế (Nếu có)</label>
        </form>
      </Modal>
    </div>
  );
}
