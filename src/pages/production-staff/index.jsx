import React from "react";

function ProductionStaff() {
  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-2 col-span-6 m-4 rounded-lg p-4 bg-gray-300">
          <h1 className="text-center bg-gray-400 p-4 font-bold">
            CHI TIẾT ĐƠN HÀNG
          </h1>
          <div className="grid grid-cols-4 text-center mt-4">
            <div className="col-span-1">ID ORDER</div>
            <div className="col-span-1">ID KHÁCH HÀNG</div>
            <div className="col-span-1">MÔ TẢ</div>
            <div className="col-span-1">BẢN THIẾT KẾ</div>
          </div>
        </div>
        <div className="col-start-8 col-span-4 m-4 rounded-lg p-4 bg-gray-300">
          <h1 className="text-center bg-gray-400 p-4 font-bold">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-2 text-center mt-4 max-h-screen">
            <div className="col-span-1">ID ORDER</div>
            <div className="col-span-1">TRẠNG THÁI</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductionStaff;
