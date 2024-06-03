import React from "react";

function ProductDetails() {
  return (
    <div className="bg-[#434343] flex flex-col items-center max-w-screen min-h-screen pt-10 px-4">
      <h2 className="text-2xl font-bold text-[#F7EF8A] mb-4">TÊN SẢN PHẨM</h2>
      <div className="flex flex-col md:flex-row md:space-x-8  p-8 rounded-lg shadow-lg">
        <div className="flex flex-col items-center md:w-1/2">
          <div className="mb-4">
            <img
              src="./src/assets/images/product.jpg"
              alt=""
              className="rounded-lg"
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
            <span className="font-bold">GIÁ TIỀN</span>
          </div>
          <div className="space-y-2">
            <div>Chất liệu:</div>
            <div>Viên chính:</div>
            <div>Viên phụ:</div>
            <div>Mã sản phẩm:</div>
          </div>
          <div className="flex items-center my-4">
            <span className="mr-2">Chọn số lượng:</span>
            <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center">
              -
            </button>
            <span className="mx-2">1</span>
            <button className="bg-white text-black w-8 h-8 rounded-full flex items-center justify-center">
              +
            </button>
          </div>
          <div className="flex">
            <button className="bg-gray-800 text-[#F7EF8A] rounded-lg">
              ĐẶT GIA CÔNG NGAY
            </button>
            <button className="bg-[#F7EF8A] text-gray-800 rounded-lg">
              THÊM VÀO GIỎ HÀNG
            </button>
            <button className="bg-white text-black rounded-lg">
              QUAY VỀ TRANG CHỦ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
