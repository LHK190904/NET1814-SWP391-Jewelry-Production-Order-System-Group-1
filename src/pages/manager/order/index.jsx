import { Button, Form, Modal, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../../services/axiosInstance";

function ManagerOrder() {
  const [isOpenModal, setOpenModal] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [designStaffList, setDesignStaffList] = useState([]);
  const [productionStaffList, setProductionStaffList] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowModal = () => {
    setOpenModal(true);
  };

  const handleHideModal = () => {
    setOpenModal(false);
    setSelectedOrder(null);
  };

  const fetchData = async () => {
    try {
      const orderResponse = await axiosInstance.get(
        `request-orders/getAllNewRequestOrder`
      );
      setOrderList(orderResponse.data.result);
      console.log(orderResponse.data.result);

      const designResponse = await axiosInstance.get(
        `request-orders/getUserByRole/DESIGN_STAFF`
      );
      setDesignStaffList(designResponse.data.result);
      console.log(designResponse.data.result);

      const productionResponse = await axiosInstance.get(
        `request-orders/getUserByRole/PRODUCTION_STAFF`
      );
      setProductionStaffList(productionResponse.data.result);
      console.log(productionResponse.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const designStaffId =
        selectedOrder && selectedOrder.designID === null
          ? values.designStaff
          : "0";
      const url = `request-orders/${selectedOrder.id}/${designStaffId}/${values.productionStaff}`;
      console.log("Submitting to URL:", url);
      await axiosInstance.put(url);
      message.success("Staff assigned successfully");
      handleHideModal();
    } catch (error) {
      console.error("Error assigning staff:", error);
      console.error("Error details:", error.response?.data);
      message.error("Failed to assign staff");
    }
  };

  const navigate = useNavigate();

  const handleNavigateClick = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  const handleAssignClick = (order) => {
    setSelectedOrder(order);
    handleShowModal();
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <h1 className="text-center text-[#F7EF8A] text-4xl font bold">
        ORDER MANAGEMENT
      </h1>
      <div className="grid grid-cols-8 gap-1 mb-1 text-white">
        <button
          onClick={() => handleNavigateClick("/manager/request")}
          className="col-start-2 col-span-1 p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
        >
          Request
        </button>
        <button
          onClick={() => handleNavigateClick("/manager/order")}
          className="col-span-1 p-1 rounded-lg bg-blue-400 hover:bg-blue-500"
        >
          Order
        </button>
        <input
          type="search"
          placeholder="Search . . ."
          className="col-start-5 col-span-2 px-2 p-1 rounded-lg"
        />
        <button className="p-1 rounded-lg bg-blue-400 hover:bg-blue-500">
          Filter
        </button>
      </div>
      <div className="grid grid-cols-3 w-3/4 mx-auto bg-white p-4 rounded-lg">
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          ORDER ID
        </div>
        <div className="col-span-2 bg-gray-400 p-2 font-bold text-center">
          STAFF
        </div>

        {orderList.map((item) => (
          <React.Fragment key={item.id}>
            <div className="col-span-1 border p-2 text-center">{item.id}</div>
            <div className="col-span-2 border p-2 text-center">
              <Button type="link" onClick={() => handleAssignClick(item)}>
                Assign Job
              </Button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Modal
        title="Assign Job"
        open={isOpenModal}
        onCancel={handleHideModal}
        footer={null}
      >
        <Form
          initialValues={{
            designStaff: "",
            productionStaff: "",
          }}
          onFinish={handleSubmit}
        >
          {selectedOrder && selectedOrder.designID === null ? (
            <Form.Item
              name="designStaff"
              label="Design Staff"
              rules={[
                {
                  required: true,
                  message: "Please select a design staff member",
                },
              ]}
            >
              <Select>
                {designStaffList.map((staff) => (
                  <Select.Option key={staff.id} value={staff.id}>
                    {staff.userName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          ) : null}
          <Form.Item
            name="productionStaff"
            label="Production Staff"
            rules={[
              {
                required: true,
                message: "Please select a production staff member",
              },
            ]}
          >
            <Select>
              {productionStaffList.map((staff) => (
                <Select.Option key={staff.id} value={staff.id}>
                  {staff.userName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Assign
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManagerOrder;
