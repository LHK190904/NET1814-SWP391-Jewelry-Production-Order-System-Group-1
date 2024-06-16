import axios from "axios";
import React, { useEffect, useState } from "react";

function Designer() {
  const [listItems, setListItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
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

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-start-2 col-span-6 bg-white m-4 rounded-lg p-4">
          <h1 className="text-center">CHI TIẾT ĐƠN HÀNG</h1>
          <div className="grid grid-cols-5 text-center mt-4">
            <div className="col-span-1">ID ORDER</div>
            <div className="col-span-1">ID KHÁCH HÀNG</div>
            <div className="col-span-1">MÔ TẢ</div>
            <div className="col-span-1">BẢN THIẾT KẾ</div>
            <div className="col-span-1"></div>
            {selectedItem ? (
              <React.Fragment key={selectedItem.orderID}>
                <div className="col-span-1">{selectedItem.orderID}</div>
                <div className="col-span-1">{selectedItem.customerID}</div>
                <div className="col-span-1">
                  {selectedItem.description || "Description"}
                </div>
                <div className="col-span-1">Design</div>
                <div className="col-span-1">Button</div>
              </React.Fragment>
            ) : (
              <div className="col-span-5 text-center">
                Select an order to view details
              </div>
            )}
          </div>
        </div>
        <div className="col-start-8 col-span-4 bg-white m-4 rounded-lg p-4">
          <h1 className="text-center">ĐƠN HÀNG</h1>
          <div className="grid grid-cols-2 text-center mt-4 max-h-screen">
            <div className="col-span-1">ID ORDER</div>
            <div className="col-span-1">TRẠNG THÁI</div>
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
    </div>
  );
}

export default Designer;
