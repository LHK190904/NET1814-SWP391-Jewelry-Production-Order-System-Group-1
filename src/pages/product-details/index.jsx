import React, { useState } from "react";
import { Link } from "react-router-dom";

function ProductDetails() {
  const [isOpen, setIsOpen] = useState(false);

  function handleShowModal() {
    setIsOpen(true);
  }
  function handleHideModal() {
    setIsOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleHideModal();
  }
  return (
    <div className="bg-[#434343] flex flex-col items-center w-full min-h-screen pt-10 px-4">
      <h2 className="text-2xl font-bold text-[#F7EF8A] mb-4">TÊN SẢN PHẨM</h2>
      <div className="flex flex-col md:flex-row md:space-x-8 p-8 rounded-lg w-full max-w-screen-lg">
        <div className="flex flex-col items-center md:w-1/2">
          <div className="mb-4">
            <img
              src="./src/assets/images/product.jpg"
              alt=""
              className="rounded-lg w-full"
            />
          </div>
          <div className="flex space-x-2">
            <img
              src="./src/assets/images/product.jpg"
              alt=""
              className="w-20 h-20 object-cover rounded-lg"
            />
            <img
              src="./src/assets/images/product.jpg"
              alt=""
              className="w-20 h-20 object-cover rounded-lg"
            />
            <img
              src="./src/assets/images/product.jpg"
              alt=""
              className="w-20 h-20 object-cover rounded-lg"
            />
            <img
              src="./src/assets/images/product.jpg"
              alt=""
              className="w-20 h-20 object-cover rounded-lg"
            />
          </div>
        </div>
        <div className="flex flex-col md:w-1/2 text-white">
          <div className="text-lg mb-4">
            <span className="font-bold text-2xl text-[#F7EF8A]">GIÁ TIỀN</span>
          </div>
          <div className="space-y-2 text-lg">
            <div className="flex justify-between">
              <span>Chất liệu:</span>
              <span className="font-bold text-[#F7EF8A]">(CHẤT LIỆU)</span>
            </div>
            <div className="flex justify-between">
              <span>Mã sản phẩm:</span>
              <span className="font-bold text-[#F7EF8A]">(BV 4804)</span>
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
              onClick={handleShowModal}
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
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg w-1/3 p-6">
            <h3 className="text-2xl font-bold mb-4">Form Liên Hệ</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Họ và Tên:</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email:</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Nội dung:</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleHideModal}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
