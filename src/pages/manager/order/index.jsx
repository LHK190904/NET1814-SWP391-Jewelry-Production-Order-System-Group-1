import { Button, Modal, Select, message } from "antd"; // Import Button, Modal, Select, and message components from Ant Design
import React, { useState } from "react"; // Import React and useState hook
import { Link, useNavigate } from "react-router-dom";

const { Option } = Select; // Destructure Option component from Select

function ManagerOrder() {
  // State for modal visibility
  const [isOpenModal, setOpenModal] = useState(false);
  // State for tracking the selected order ID
  const [selectedOrder, setSelectedOrder] = useState(null);
  // State for storing selected design staff for each order
  const [designStaff, setDesignStaff] = useState({});
  // State for storing selected production staff for each order
  const [productionStaff, setProductionStaff] = useState({});
  // State for keeping track of assigned staff to prevent re-assignment
  const [assignedStaff, setAssignedStaff] = useState({
    design: [],
    production: [],
  });

  // State for managing order data
  const [data, setData] = useState([
    {
      orderID: 1,
      assign: "assign",
      problem: "Skill issues",
      status: "Unassigned",
    },
    {
      orderID: 2,
      assign: "assign",
      problem: "Skill issues",
      status: "Unassigned",
    },
    {
      orderID: 3,
      assign: "assign",
      problem: "Skill issues",
      status: "Unassigned",
    },
  ]);

  // List of available design staff members
  const designStaffList = [
    "Design Staff 1",
    "Design Staff 2",
    "Design Staff 3",
    "Design Staff 4",
    "Design Staff 5",
  ];
  // List of available production staff members
  const productionStaffList = [
    "Production Staff 1",
    "Production Staff 2",
    "Production Staff 3",
    "Production Staff 4",
    "Production Staff 5",
  ];

  // Function to handle the click event of the "Assign Job" button
  const handleAssignClick = (orderID) => {
    setSelectedOrder(orderID); // Set the selected order ID
    handleShowModal(); // Show the modal
  };

  // Function to show the modal
  const handleShowModal = () => {
    setOpenModal(true);
  };

  // Function to hide the modal
  const handleHideModal = () => {
    setOpenModal(false);
    setSelectedOrder(null); // Clear the selected order ID
  };

  // Function to handle the OK button click of the modal
  const handleOkModal = () => {
    handleHideModal();
  };

  // Function to handle the submit button click of each row
  const handleSubmit = (orderID) => {
    const updatedDesignStaff = designStaff[orderID]; // Get the selected design staff for the order
    const updatedProductionStaff = productionStaff[orderID]; // Get the selected production staff for the order

    // Check if both design and production staff have been selected
    if (!updatedDesignStaff || !updatedProductionStaff) {
      message.error("Please select both design and production staff.");
      return; // Exit the function if either is not selected
    }

    console.log(`Order ID: ${orderID}`);
    console.log(`Design Staff: ${updatedDesignStaff}`);
    console.log(`Production Staff: ${updatedProductionStaff}`);

    // Update the assigned staff state
    setAssignedStaff((prev) => ({
      design: [...prev.design, updatedDesignStaff],
      production: [...prev.production, updatedProductionStaff],
    }));

    // Update the status of the specific order to "Assigned"
    setData((prevData) =>
      prevData.map((item) =>
        item.orderID === orderID ? { ...item, status: "Assigned" } : item
      )
    );

    // Close the modal
    handleHideModal();
  };

  const navigate = useNavigate();

  const handleNavigateClick = (path) => {
    if (location.pathname !== path) {
      navigate(path);
    }
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen">
      <h1 className="text-center text-[#F7EF8A] text-2xl ">
        REQUEST MANAGEMENT
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
      <div className="grid grid-cols-5 w-3/4 mx-auto bg-white p-4 rounded-lg">
        <div className="col-span-1 bg-gray-400 p-2 font-bold">ORDER ID</div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          STAFF
        </div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold">PROBLEM</div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold text-center">
          STATUS
        </div>
        <div className="col-span-1 bg-gray-400 p-2 font-bold"></div>
        {/* Iterate over the data to display each row */}
        {data.map((item) => (
          <React.Fragment key={item.orderID}>
            <div className="col-span-1 border p-2">{item.orderID}</div>
            <div className="col-span-1 border p-2 text-center">
              <Button
                type="link"
                onClick={() => handleAssignClick(item.orderID)}
              >
                Assign Job
              </Button>
            </div>
            <div className="col-span-1 border p-2">{item.problem}</div>
            <div className="col-span-1 border p-2 text-center">
              {item.status}
            </div>
            <div className="col-span-1 border p-2">
              <Button type="link" onClick={() => handleSubmit(item.orderID)}>
                Submit
              </Button>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Modal
        title="Assign Job"
        visible={isOpenModal}
        onOk={handleOkModal}
        onCancel={handleHideModal}
      >
        {/* Design staff selection */}
        <div className="flex justify-between mb-4">
          <label>DESIGN STAFF</label>
          <Select
            value={designStaff[selectedOrder]}
            onChange={(value) =>
              setDesignStaff((prev) => ({ ...prev, [selectedOrder]: value }))
            }
            style={{ width: "60%" }}
          >
            {designStaffList
              .filter((staff) => !assignedStaff.design.includes(staff))
              .map((staff) => (
                <Option key={staff} value={staff}>
                  {staff}
                </Option>
              ))}
          </Select>
        </div>
        <div className="flex justify-between">
          <label>PRODUCTION STAFF</label>
          <Select
            value={productionStaff[selectedOrder]}
            onChange={(value) =>
              setProductionStaff((prev) => ({
                ...prev,
                [selectedOrder]: value,
              }))
            }
            style={{ width: "60%" }}
          >
            {productionStaffList
              .filter((staff) => !assignedStaff.production.includes(staff))
              .map((staff) => (
                <Option key={staff} value={staff}>
                  {staff}
                </Option>
              ))}
          </Select>
        </div>
      </Modal>
    </div>
  );
}

export default ManagerOrder;