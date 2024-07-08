import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { Button, message } from "antd";
import Stepper from "../../../components/stepper";

function CartOrder() {
  const { requestID } = useParams();
  const [order, setOrder] = useState({});
  const [design, setDesign] = useState({});
  const [process, setProcess] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (requestID) {
      fetchOrders();
    } else {
      console.error("Request ID is undefined");
    }
  }, [requestID]);

  useEffect(() => {
    if (process && process.status === "100%") {
      handleCreateInvoice();
    }
  }, [process]);

  const fetchOrders = async () => {
    try {
      const responseOrder = await axiosInstance.get(
        `request-orders/getOrderByRequestIdForCustomer/${requestID}`
      );
      setOrder(responseOrder.data.result);
      console.log(responseOrder.data.result);
      const responseDesign = await axiosInstance.get(
        `design/${responseOrder.data.result.id}`
      );
      setDesign(responseDesign.data.result);
      console.log(responseDesign.data.result);
      const responseProcess = await axiosInstance.get(
        `process/getProcessByRequestOrderId/${responseOrder.data.result.id}`
      );
      setProcess(responseProcess.data.result);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrder({});
    }
  };

  const handleCreateInvoice = async () => {
    try {
      const response1 = await axiosInstance.post(`invoices/${order.requestID}`);
      console.log(response1.data.result);
      if (response1.data.result) {
        const response2 = await axiosInstance.post(
          `invoice-details/${order.id}`
        );
        console.log(response2.data.result);
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        console.error(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("Error request:", error.request);
        console.error("No response from server");
      } else {
        console.error("Error", error.message);
        console.error("Error creating invoice");
      }
    }
  };

  const handleApprove = async () => {
    try {
      const values = { feedback };
      await axiosInstance.put(
        `request-orders/acceptDesign/${design.id}`,
        values
      );
      message.success("Đã gửi");
      setFeedback("");
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra");
    }
  };

  const handleDeny = async () => {
    try {
      const requestData = { description: feedback };
      await axiosInstance.put(`design/denyDesign/${design.id}`, requestData);
      message.success("Đã gửi");
      setFeedback("");
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra");
    }
  };

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const getCurrentStep = () => {
    if (process && process.status) {
      switch (process.status) {
        case "25%":
          return 1;
        case "50%":
          return 2;
        case "75%":
          return 3;
        case "100%":
          return 4;
        default:
          return 1;
      }
    }
    return 1;
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <h1 className="text-center text-4xl font-bold py-4 text-[#F7EF8A]">
        CHI TIẾT ĐƠN HÀNG
      </h1>
      <div className="grid grid-cols-12 gap-2">
        <div className="col-start-2 col-span-10 bg-gray-300 rounded-lg p-2">
          <h1 className="col-span-7 text-2xl text-center my-4">CHI TIẾT</h1>
          <div className="grid grid-cols-5 mt-4">
            <div className="col-span-12 bg-white">
              {order.status === "New" ? (
                <div className="my-4 text-2xl text-center">
                  Đang chờ phân công công việc . . .
                </div>
              ) : (
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6 flex flex-col items-center">
                    {design.listURLImage && design.listURLImage.length > 0 ? (
                      <>
                        <img
                          src={selectedImage || design.listURLImage[0]}
                          alt="Chưa có hình ảnh"
                          className="rounded-lg w-[300px] h-[300px]"
                        />
                        <div className="flex flex-wrap justify-center mt-4">
                          {design.listURLImage.map((url, index) => (
                            <img
                              key={index}
                              src={url}
                              alt="Chưa có hình ảnh"
                              className="rounded-lg cursor-pointer w-[100px] h-[100px] mx-1"
                              onClick={() => handleImageClick(url)}
                            />
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="col-span-12 text-center">
                        Chưa có hình ảnh
                      </div>
                    )}
                  </div>
                  <div className="col-span-6 text-xl">
                    {order.status === "Assigned" ||
                    order.status === "Design Denied" ||
                    order.status === "Waiting for customer's decision" ? (
                      <div className="flex flex-col justify-evenly h-full p-1">
                        <form>
                          <label className="text-2xl">Feedback</label>
                          <textarea
                            value={feedback}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded"
                          />
                          <div className="flex justify-around mt-4">
                            <Button
                              className="w-full bg-green-400 p-2 font-bold"
                              onClick={handleApprove}
                            >
                              Approve
                            </Button>
                            <Button
                              className="w-full bg-red-400 p-2 font-bold"
                              onClick={handleDeny}
                            >
                              Deny
                            </Button>
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="flex flex-col justify-evenly h-full">
                        <div>LOẠI TRANG SỨC: {design.category}</div>
                        <div>LOẠI VÀNG: {design.materialName}</div>
                        <div>TRỌNG LƯỢNG: {design.materialWeight}</div>
                        <div>ĐÁ CHÍNH: {design.mainStoneId}</div>
                        <div>ĐÁ PHỤ: {design.subStoneId}</div>
                        <div>MÔ TẢ: {design.description}</div>
                        <div>
                          TIẾN TRÌNH: {process ? process.status : "N/A"}
                        </div>
                        <Stepper currentStep={getCurrentStep()} />
                        <div>
                          CẬP NHẬT LÚC: {process ? process.updatedAt : "N/A"}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartOrder;
