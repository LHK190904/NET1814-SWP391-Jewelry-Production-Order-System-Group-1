import React, { useState } from "react";
import Carousel from "../../components/carousel";
import { Input, Modal, Form } from "antd";
import { useCart } from "../../context/CartContext";
import { useForm } from "antd/es/form/Form";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm(); // Fix: destructuring assignment for useForm
  const { addToCart } = useCart(); // Use the addToCart function from CartContext

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleHideModal = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        console.log("Received values of form: ", values);
        addToCart(values); // Add form values to the cart
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
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
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="description"
            label="Mô tả"
            rules={[
              {
                required: true,
                message: "Hãy nhập mô tả",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
