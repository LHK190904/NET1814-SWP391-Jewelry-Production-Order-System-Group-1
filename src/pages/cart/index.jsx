import React from "react";
import { Link } from "react-router-dom";

export default function Cart() {
  return (
    <div className="h-screen bg-[#434343] ">
      <h1 className="text-4xl font-bold text-white text-center">Cart Page</h1>
      <div className="grid grid-cols-12">
        <ul className="grid col-start-2 col-span-6 bg-white p-4 rounded-lg">
          <h2 className="font-bold text-center">DANH SÁCH YÊU CẦU</h2>
          <li>
            <div className="grid grid-cols-4">
              <Link to={"/"}>
                <img
                  src="./src/assets/images/product.jpg"
                  alt=""
                  className="grid col-start-1"
                />
              </Link>
              <span className="grid col-start-2 col-span-2">
                <Link to={"/"}>
                  <p>Tên sản phẩm</p>
                </Link>
                <p>Nguyên vật liệu</p>
                <p>Khối lượng</p>
                <p>Bản thiết kế</p>
              </span>
              <span className="col-start-4">
                <p>Thời gian tạo đơn:</p>
                <p>Saler:</p>
                <p>Product Staff:</p>
                <p>Design Staff:</p>
              </span>
            </div>
          </li>
        </ul>
        <div className="grid col-start-9 col-span-3 bg-white p-4 rounded-lg">
          <h2 className="font-bold text-center">TỔNG CÁC YÊU CẦU</h2>
          <div className="grid grid-cols-2">
            <p className="grid col-start-1 col-span-1">Giá gốc</p>
            <p className="grid col-start-2 text-right">100</p>
            <p className="grid col-start-1 col-span-1">Tiền công</p>
            <p className="grid col-start-2 text-right">15</p>
            <p className="grid col-start-1 col-span-1">Phí (VAT)</p>
            <p className="grid col-start-2 text-right">10%</p>
            <p className="grid col-start-1 col-span-1 font-bold">TỔNG CỘNG</p>
            <p className="grid col-start-2 text-right font-bold">125</p>
          </div>
          <div className="flex gap-4">
            <button className="w-1/2 bg-gray-800 text-yellow-300 py-2 px-4 rounded-md">
              <Link to={"/"}>ĐẶT YÊU CẦU</Link>
            </button>
            <button className="w-1/2 bg-gray-800 text-yellow-300 py-2 px-4 rounded-md">
              <Link to={"/"}>VỀ TRANG CHỦ</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
