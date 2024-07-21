import { Form, Input, Button, message } from "antd";
import React, { useState } from "react";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleSubmitStep1 = () => {
    handleNextStep();
  };

  const handleSubmitStep2 = () => {
    if (formData.newPassword === formData.confirmPassword) {
      console.log("New Password:", formData.newPassword);
      console.log("Confirm Password:", formData.confirmPassword);
      message.success("Đổi mật khẩu thành công");
    } else {
      message.error("Mật khẩu không trùng khớp");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-[#434343] min-h-screen w-screen flex items-center justify-center p-4">
      {step === 1 ? (
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl mb-4">Step 1: Enter your email</h2>
          <Form onFinish={handleSubmitStep1}>
            <label>Email:</label>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập email đã được đăng ký!",
                },
              ]}
            >
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                name="email"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#F7EF8A] text-black text-xl hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f] rounded-lg p-2"
              >
                XÁC NHẬN
              </button>
            </Form.Item>
          </Form>
        </div>
      ) : step === 2 ? (
        <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
          <h2 className="text-2xl mb-4">
            Step 2: Enter new password and confirm
          </h2>
          <Form onFinish={handleSubmitStep2}>
            <label>Email:</label>
            <Form.Item>
              <Input
                value={formData.email}
                readOnly
                className="w-full p-2 border rounded bg-gray-100"
              />
            </Form.Item>
            <label>Mật khẩu mới:</label>
            <Form.Item
              name="newPassword"
              rules={[
                { required: true, message: "Please enter your new password!" },
              ]}
            >
              <Input.Password
                value={formData.newPassword}
                onChange={handleInputChange}
                name="newPassword"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
            <label>Xác nhận lại mật khẩu:</label>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password!",
                },
              ]}
            >
              <Input.Password
                value={formData.confirmPassword}
                onChange={handleInputChange}
                name="confirmPassword"
                className="w-full p-2 border rounded"
              />
            </Form.Item>
            <Form.Item>
              <button
                type="primary"
                htmlType="submit"
                className="w-full bg-[#F7EF8A] text-black text-xl hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f] rounded-lg p-2"
              >
                XÁC NHẬN
              </button>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default ForgotPassword;
