import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Input, Form } from "antd";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://664ef13afafad45dfae19e02.mockapi.io/Movie/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const showModal = () => {
    setIsModalOpen(true);
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
        setIsModalOpen(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const [form] = Form.useForm();

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#434343] flex flex-col items-center w-full min-h-screen pt-10 px-4">
      <h2 className="text-2xl font-bold text-[#F7EF8A] mb-4">
        {product.product_name}
      </h2>
      <div className="flex flex-col md:flex-row md:space-x-8 p-8 rounded-lg w-full max-w-screen-lg">
        <div className="flex flex-col items-center md:w-1/2">
          <div className="mb-4">
            <img
              src="./src/assets/images/product.jpg"
              alt={product.product_name}
              className="rounded-lg w-full"
            />
          </div>
          <div className="flex space-x-2">
            <img
              src="./src/assets/images/product.jpg"
              alt={product.product_name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <img
              src="./src/assets/images/product.jpg"
              alt={product.product_name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <img
              src="./src/assets/images/product.jpg"
              alt={product.product_name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <img
              src="./src/assets/images/product.jpg"
              alt={product.product_name}
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 text-white">
          <div className="text-lg mb-4">
            <span className="font-bold text-2xl text-[#F7EF8A]">
              {product.price}
            </span>
          </div>
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Chất liệu:</span>
              <span className="font-bold text-[#F7EF8A]">
                {product.material}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mã sản phẩm:</span>
              <span className="font-bold text-[#F7EF8A]">{product.id}</span>
            </div>
          </div>
          <div className="flex items-center justify-between my-4">
            <span className="mr-2">Chọn số lượng:</span>
            <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center">
              -
            </button>
            <span className="mx-2">1</span>
            <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center">
              +
            </button>
          </div>
          <div className="flex flex-col">
            <button
              className="rounded-lg bg-gray-800 text-[#F7EF8A] p-4"
              onClick={showModal}
            >
              ĐẶT YÊU CẦU
            </button>
            <button className="rounded-lg bg-[#F7EF8A] text-gray-800 p-4">
              <Link to={"/cart"}>THÊM VÀO GIỎ HÀNG</Link>
            </button>
            <button className="rounded-lg bg-white text-black p-4">
              <Link to={"/"}>QUAY VỀ TRANG CHỦ</Link>
            </button>
          </div>
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
            name="name"
            label="Họ và Tên"
            rules={[
              {
                required: true,
                message: "Hãy nhập Họ và Tên của bạn",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                message: "Hãy nhập Email của bạn",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
          <Form.Item
            name="content"
            label="Nội dung"
            rules={[
              {
                required: true,
                message: "Hãy nhập Nội dung yêu cầu",
              },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ProductDetails;
