import { useEffect, useState } from "react";
import authService from "../../../services/authService";
import axiosInstance from "../../../services/axiosInstance";
import { Link } from "react-router-dom";
import LogoutButton from "../../../components/logoutButton";

function ProductionStaff() {
  // const location = useLocation();
  const [dataSource, setDataSource] = useState([
    // {
    //   orderID: "O1",
    //   customerID: "C1",
    //   description: "Description1",
    //   design: "Design1",
    //   status: "100%",
    // },
    // {
    //   orderID: "O2",
    //   customerID: "C2",
    //   description: "Description2",
    //   design: "Design2",
    //   status: "100%",
    // },
    // {
    //   orderID: "O3",
    //   customerID: "C3",
    //   description: "Description3",
    //   design: "Design3",
    //   status: "100%",
    // },
    // {
    //   orderID: "O4",
    //   customerID: "C4",
    //   description: "Description4",
    //   design: "Design4",
    //   status: "100%",
    // },
    // {
    //   orderID: "O5",
    //   customerID: "C5",
    //   description: "Description5",
    //   design: "Design5",
    //   status: "100%",
    // },
    // {
    //   orderID: "O6",
    //   customerID: "C6",
    //   description: "Description6",
    //   design: "Design6",
    //   status: "100%",
    // },
    // {
    //   orderID: "O7",
    //   customerID: "C7",
    //   description: "Description7",
    //   design: "Design7",
    //   status: "100%",
    // },
    // {
    //   orderID: "O8",
    //   customerID: "C8",
    //   description: "Description8",
    //   design: "Design8",
    //   status: "100%",
    // },
    // {
    //   orderID: "O9",
    //   customerID: "C9",
    //   description: "Description9",
    //   design: "Design9",
    //   status: "100%",
    // },
    // {
    //   orderID: "O10",
    //   customerID: "C10",
    //   description: "Description10",
    //   design: "Design10",
    //   status: "100%",
    // },
    // {
    //   orderID: "O11",
    //   customerID: "C11",
    //   description: "Description11",
    //   design: "Design11",
    //   status: "100%",
    // },
    // {
    //   orderID: "O12",
    //   customerID: "C12",
    //   description: "Description12",
    //   design: "Design12",
    //   status: "100%",
    // },
    // {
    //   orderID: "O13",
    //   customerID: "C13",
    //   description: "Description13",
    //   design: "Design13",
    //   status: "100%",
    // },
    // {
    //   orderID: "O13",
    //   customerID: "C13",
    //   description: "Description13",
    //   design: "Design13",
    //   status: "100%",
    // },
    // {
    //   orderID: "O14",
    //   customerID: "C14",
    //   description: "Description14",
    //   design: "Design14",
    //   status: "100%",
    // },
    // {
    //   orderID: "O15",
    //   customerID: "C15",
    //   description: "Description15",
    //   design: "Design15",
    //   status: "100%",
    // },
  ]);

  const [selectedOrder, setSelectedOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchSalerData = async () => {
      const user = authService.getCurrentUser();
      console.log(user);
      if (user && user.id) {
        // setSaleName(user.username);
        try {
          const response = await axiosInstance.get(
            `/request-orders/getAllOrderByProductionStaff/${user.id}`
          );
          setDataSource(response.data.result || []);
        } catch (error) {
          console.error("Không thể lấy yêu cầu:", error);
        }
      } else {
        console.error("Người dùng chưa đăng nhập");
      }
    };
    fetchSalerData();
  }, []);

  const handleSelectOrder = (id) => {
    const order = dataSource.find((order) => order.orderID === id);
    setSelectedOrder(order ? [order] : []);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = dataSource.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const totalPages = Math.ceil(dataSource.length / itemsPerPage);

  return (
    <>
      <div className="mr-10">
        <LogoutButton />
      </div>
      <div className="mb-4">
        <Link
          className={`mr-4 ${
            location.pathname === "/production-staff/process-orders"
              ? "underline font-bold"
              : ""
          }`}
          to="/production-staff/process-orders"
        >
          Process orders
        </Link>
        <Link
          className={`${
            location.pathname === "/production-staff/manage-materials"
              ? "underline font-bold"
              : ""
          }`}
          to="/production-staff/manage-materials"
        >
          Manage materials
        </Link>
      </div>

      <div className="bg-[#434343] min-h-screen w-screen flex">
        <div className="grid grid-cols-12 w-full ">
          <div className="col-start-2 col-span-6 m-4 rounded-lg p-4 bg-gray-300 flex flex-col">
            <h1 className="bg-gray-400 p-4 text-2xl text-center">
              CHI TIẾT ĐƠN HÀNG
            </h1>
            {selectedOrder.map((item) => (
              <div
                className="grid grid-cols-2 text-center flex-grow"
                key={item.orderID}
              >
                <div className="col-span-2 border ">BẢN THIẾT KẾ</div>
                <div className="col-span-2 border bg-white">
                  {item.design}
                  <img
                    src="../src/assets/images/about1.jpg"
                    alt=""
                    className="w-[500px] h-[500px] mx-auto"
                  />
                </div>

                <div className="col-span-2 border">MÔ TẢ</div>
                <div className="col-span-2 border bg-white">
                  {item.description}
                </div>
                <div className="col-span-2 border">TRẠNG THÁI</div>
                <div className="col-span-2 border bg-white">{item.status}</div>
              </div>
            ))}
          </div>
          <div className="col-start-8 col-span-4 m-4 rounded-lg p-4 bg-gray-300 flex flex-col">
            <h1 className="text-center bg-gray-400 p-4 text-2xl">ĐƠN HÀNG</h1>
            <div className="grid grid-cols-2 text-center mt-4 border">
              <div className="col-span-1">ID ORDER</div>
              <div className="col-span-1">TRẠNG THÁI</div>
            </div>
            <div className="flex-grow overflow-auto">
              {paginatedData.map((order) => (
                <div
                  className="grid grid-cols-2 text-center border"
                  key={order.orderID}
                >
                  <div className="col-span-1 p-2 bg-white border">
                    <button onClick={() => handleSelectOrder(order.orderID)}>
                      {order.orderID}
                    </button>
                  </div>
                  <div className="col-span-1 p-2 bg-white border">
                    <button onClick={() => handleSelectOrder(order.orderID)}>
                      {order.status}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  // index start from 0
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`mx-1 px-2 py-1 border ${
                    currentPage === index + 1 ? "bg-gray-400" : "bg-white"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductionStaff;
