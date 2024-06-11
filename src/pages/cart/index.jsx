import React from "react";
import { useCart } from "../../context/CartContext";

export default function Cart() {
  const { cart } = useCart();

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4 pt-4">
        <div className="col-start-2 col-span-5 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4">YÊU CẦU</h1>
          <div className="grid grid-cols-6 border">
            <div className="col-span-1 p-2 font-bold">NHÂN VIÊN BÁN HÀNG</div>
            <div className="col-span-1 p-2 font-bold">THỜI ĐIỂM TẠO</div>
            <div className="col-span-1 p-2 font-bold">THỜI ĐIỂM TIẾP NHẬN</div>
            <div className="col-span-1 p-2 font-bold">THỜI ĐIỂM GỬI</div>
            <div className="col-span-1 p-2 font-bold">TRẠNG THÁI</div>
            <div className="col-span-1 p-2 font-bold">MÔ TẢ</div>
          </div>
          {cart.map((item, index) => (
            <div className="grid grid-cols-6 border" key={index}>
              <div className="col-span-1 p-2 bg-white">{item.product_name}</div>
              <div className="col-span-1 p-2 bg-white">{item.price}</div>
              <div className="col-span-1 p-2 bg-white">{item.material}</div>
              <div className="col-span-1 p-2 bg-white">{item.type}</div>
              <div className="col-span-1 p-2 bg-white">1</div>
            </div>
          ))}
        </div>
        <div className="col-start-7 col-span-5 bg-gray-300 text-center p-1 rounded-lg">
          <h1 className="bg-gray-400 p-4">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-6 border">
            <div className="col-span-1">BẢN THIẾT KẾ</div>
            <div className="col-span-1">NHÂN VIÊN THIẾT KẾ</div>
            <div className="col-span-1">NHÂN VIÊN GIA CÔNG</div>
            <div className="col-span-1">THỜI ĐIỂM TẠO</div>
            <div className="col-span-1">THỜI ĐIỂM KẾT THÚC</div>
            <div className="col-span-1">TRẠNG THÁI</div>
          </div>
        </div>
      </div>
    </div>
  );
}
