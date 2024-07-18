import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";
import { Button, message, Modal } from "antd";
import Stepper from "../../../components/stepper";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

function CartOrder() {
  const { requestID } = useParams();
  const [order, setOrder] = useState({});
  const [design, setDesign] = useState({});
  const [invoice, setInvoice] = useState({});
  const [process, setProcess] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);

  const fetchOrders = async () => {
    if (!requestID) {
      console.error("Request ID is undefined");
      return;
    }
    try {
      const responseOrder = await axiosInstance.get(
        `request-orders/getOrderByRequestIdForCustomer/${requestID}`
      );
      console.log("Order data:", responseOrder.data.result);
      setOrder(responseOrder.data.result);
      try {
        const responseDesign = await axiosInstance.get(
          `design/${responseOrder.data.result.id}`
        );
        setDesign(responseDesign.data.result);
        console.log("Design:", responseDesign.data.result);
      } catch (error) {
        console.log(`No image found`);
      }
      try {
        const responseProcess = await axiosInstance.get(
          `process/getProcessByRequestOrderId/${responseOrder.data.result.id}`
        );
        setProcess(responseProcess.data.result);
        console.log("Process", responseProcess.data.result);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrder({});
    }
  };

  const fetchInvoice = async () => {
    try {
      await axiosInstance.post(`invoices/${order.requestID}`);
      await axiosInstance.post(`invoice-details/${order.id}`);
      const response = await axiosInstance(
        `invoices/getInvoiceInfor/${order.id}`
      );
      setInvoice(response.data.result);
      console.log("Invoice:", response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [requestID]);

  useEffect(() => {
    if (order.status === "Completed!!!") {
      fetchInvoice();
    } else if (order.status === "finished") {
      fetchWarranty();
    }
  }, [order]);

  const handleApprove = async () => {
    try {
      const values = { feedback };
      console.log("Approve values:", values);
      const response = await axiosInstance.put(
        `request-orders/acceptDesign/${design.id}`,
        values
      );
      message.success(`Đã gửi`);
      setFeedback("");
    } catch (error) {
      console.log(error);
      message.error("Có lỗi xảy ra");
    }
  };

  const handleDeny = async () => {
    try {
      const values = { feedback };
      console.log("Deny values:", values);
      const requestData = {
        description: feedback,
      };
      const response = await axiosInstance.put(
        `design/denyDesign/${design.id}`,
        requestData
      );
      message.success(`Đã gửi`);
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

  const handleShowModal = () => {
    setIsOpenModal(true);
  };

  const handleHideModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen p-4 md:p-8">
      <h1 className="text-center text-2xl md:text-4xl font-bold py-4 text-[#F7EF8A]">
        CHI TIẾT ĐƠN HÀNG
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <div className="col-span-1 md:col-start-2 md:col-span-10 bg-gray-300 rounded-lg p-4 md:p-2">
          <h1 className="text-xl md:text-2xl text-center my-4">CHI TIẾT</h1>
          <div className="grid grid-cols-1 md:grid-cols-5 mt-4">
            <div className="col-span-1 md:col-span-5 bg-white">
              {order.status === "New" ? (
                <div className="my-4 text-lg md:text-2xl text-center">
                  Đang chờ phân công công việc . . .
                </div>
              ) : order.status === "Assigned" ||
                order.status === "Design Denied" ||
                order.status === "Waiting for customer's decision" ? (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {design.listURLImage && design.listURLImage.length > 0 ? (
                    <div className="col-span-1 md:col-span-6 flex flex-col items-center">
                      <img
                        src={selectedImage || design.listURLImage[0]}
                        alt="Chưa có hình ảnh"
                        className="rounded-lg w-full md:w-[300px] h-[300px] object-cover"
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
                    </div>
                  ) : (
                    <div className="col-span-1 md:col-span-12 text-center">
                      Chưa có hình ảnh
                    </div>
                  )}
                  <div className="col-span-1 md:col-span-6 text-lg md:text-xl">
                    <div className="flex flex-col justify-evenly h-full p-1">
                      <form>
                        <label className="text-lg md:text-2xl">Feedback</label>
                        <textarea
                          value={feedback}
                          onChange={handleChange}
                          required
                          className="w-full p-2 border border-gray-300 rounded"
                        />
                        <div className="flex flex-col md:flex-row justify-around mt-4">
                          <Button
                            className="w-full md:w-auto bg-green-400 p-2 font-bold"
                            onClick={handleApprove}
                          >
                            Approve
                          </Button>
                          <Button
                            className="w-full md:w-auto bg-red-400 p-2 font-bold"
                            onClick={handleDeny}
                          >
                            Deny
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {design.listURLImage && design.listURLImage.length > 0 ? (
                    <div className="col-span-1 md:col-span-6 flex flex-col items-center">
                      <img
                        src={selectedImage || design.listURLImage[0]}
                        alt=""
                        className="rounded-lg w-full md:w-[300px] h-[300px] object-cover"
                      />
                      <div className="flex flex-wrap justify-center mt-4">
                        {design.listURLImage.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt=""
                            className="rounded-lg cursor-pointer w-[100px] h-[100px] mx-1"
                            onClick={() => handleImageClick(url)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="col-span-1 md:col-span-12 text-center">
                      Chưa có hình ảnh
                    </div>
                  )}
                  <div className="col-span-1 md:col-span-6 text-lg md:text-xl">
                    <div className="h-full">
                      <div>LOẠI TRANG SỨC: {design.category}</div>
                      <div>LOẠI VÀNG: {design.materialName}</div>
                      <div>TRỌNG LƯỢNG: {design.materialWeight}</div>
                      <div>ĐÁ CHÍNH: {design.mainStoneId}</div>
                      <div>ĐÁ PHỤ: {design.subStoneId}</div>
                      <div>MÔ TẢ: {design.description}</div>
                      <div>TIẾN TRÌNH: {process ? process.status : "N/A"}</div>
                      <Stepper currentStep={getCurrentStep()} />
                      <div>
                        CẬP NHẬT LÚC:{" "}
                        {process
                          ? new Date(process.updatedAt).toDateString()
                          : "N/A"}
                      </div>
                      <button
                        onClick={handleShowModal}
                        className="bg-[#F7EF8A] w-full p-2 rounded-lg text-lg md:text-2xl hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f] mt-4"
                      >
                        XEM HÓA ĐƠN
                      </button>
                      <button
                        onClick={handleShowModal}
                        className="bg-[#F7EF8A] w-full p-2 rounded-lg text-lg md:text-2xl hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f] mt-4"
                      >
                        XEM GIẤY BẢO HÀNH
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="CHI TIẾT HÓA ĐƠN"
        open={isOpenModal}
        onOk={handleHideModal}
        onCancel={handleHideModal}
        width={"75%"}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>TÊN SẢN PHẨM</TableCell>
                <TableCell>VẬT LIỆU</TableCell>
                <TableCell>TIỀN VẬT LIỆU</TableCell>
                <TableCell>ĐÁ CHÍNH</TableCell>
                <TableCell>TIỀN ĐÁ CHÍNH</TableCell>
                <TableCell>ĐÁ PHỤ</TableCell>
                <TableCell>TIỀN ĐÁ PHỤ</TableCell>
                <TableCell>TIỀN CÔNG</TableCell>
                <TableCell>TỔNG TIỀN</TableCell>
                <TableCell>NGÀY TẠO HÓA ĐƠN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{design.designName}</TableCell>
                <TableCell>{invoice.materialName}</TableCell>
                <TableCell>{invoice.materialTotalCost}</TableCell>
                <TableCell>{invoice.mainStone}</TableCell>
                <TableCell>{invoice.mainStoneCost}</TableCell>
                <TableCell>{invoice.subStone}</TableCell>
                <TableCell>{invoice.subStoneCost}</TableCell>
                <TableCell>{invoice.produceCost}</TableCell>
                <TableCell>{invoice.invoiceTotalCost}</TableCell>
                <TableCell>
                  {new Date(invoice.invoiceCreatedAt).toDateString()}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Modal>
    </div>
  );
}

export default CartOrder;
