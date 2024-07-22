import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import PayPalButton from "../../components/paypalButton";

const Payment = () => {
  const [amount, setAmount] = useState("");
  const [isPayPalReady, setIsPayPalReady] = useState(false);

  const handleSuccess = (order) => {
    message.success("Thanh toán thành công!");
    console.log("Order:", order);
  };

  const handleError = (err) => {
    message.error("Có lỗi xảy ra khi thanh toán");
    console.error("PayPal Error:", err);
  };

  const handleFormSubmit = (values) => {
    setAmount(values.amount);
    setIsPayPalReady(true);
  };

  return (
    <div className="w-screen min-h-screen bg-[#434343] text-[#F7EF8A]">
      <div className="grid grid-cols-12">
        <div className="col-span-12 text-center text-4xl my-10 font-bold">
          Thanh Toán
        </div>
        <div className="col-start-4 col-span-6">
          <Form onFinish={handleFormSubmit}>
            <Form.Item
              name="amount"
              label="Số tiền"
              rules={[{ required: true, message: "Vui lòng nhập số tiền" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Thanh Toán
              </Button>
            </Form.Item>
          </Form>
          {isPayPalReady && (
            <PayPalButton
              amount={amount}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Payment;
