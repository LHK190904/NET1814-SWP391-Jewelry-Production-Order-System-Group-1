import { Modal } from "antd";
import React, { useState } from "react";

function ManagerOrder() {
  const [isOpenModal, setOpenModal] = useState(false);
  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <h1 className="text-center text-[#F7EF8A] font-extrabold p-10">
        ORDER MANAGEMENT
      </h1>
      <div className="grid grid-cols-5 w-3/4 mx-auto bg-white p-4 rounded-lg">
        <div className="col-span-1 bg-gray-400 p-2 font-bold">ORDER ID</div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          STAFF
        </div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          PROBLEM
        </div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          STATUS
        </div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center"></div>
      </div>
    </div>
  );
}

export default ManagerOrder;
