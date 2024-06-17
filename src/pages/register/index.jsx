import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const API_URL = "http://localhost:8080/cust/register_token";
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const payload = {
        userName,
        password,
        address,
        email,
      };
      const response = await axios.post(API_URL, payload);
      const token = response.data;
      const authenticated = response.data;
      if (authenticated) {
        const userData = { userName, password, token };
        localStorage.setItem("user", JSON.stringify(userData));
        console.log("Registration successfully");
        navigate("/");
      } else {
        console.log("Registration failed");
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setError("An error occurred during registration. Please try again.");
    } finally {
      handleCancel();
    }
  }

  function handleCancel() {
    setUserName("");
    setPassword("");
    setAddress("");
    setEmail("");
    setError("");
  }

  return (
    <div className="flex items-center justify-center lg:min-h-screen w-screen bg-[#434343]">
      <div className="bg-[#E9E9E9] shadow-md rounded-lg w-full max-w-lg text-center m-4">
        <h4 className="text-2xl font-semibold p-4 border-b">ĐĂNG KÝ</h4>
        <div className="p-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-1/4 text-right mr-4" htmlFor="userName">
                  Tên đăng nhập:
                </label>
                <div className="flex-grow">
                  <input
                    type="text"
                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                    id="userName"
                    placeholder="Tên đăng nhập"
                    onChange={(e) => setUserName(e.target.value)}
                    value={userName}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-right mr-4" htmlFor="password">
                  Mật khẩu:
                </label>
                <div className="flex-grow">
                  <input
                    type="password"
                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                    id="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-right mr-4" htmlFor="address">
                  Địa chỉ:
                </label>
                <div className="flex-grow">
                  <input
                    type="text"
                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                    id="address"
                    placeholder="Địa chỉ"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <label className="w-1/4 text-right mr-4" htmlFor="email">
                  Email:
                </label>
                <div className="flex-grow">
                  <input
                    type="email"
                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                    id="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>
              {error && <div className="text-red-500">{error}</div>}
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-1/2 bg-gray-800 text-[#F7EF8A] py-2 px-4 rounded-md"
                >
                  ĐĂNG KÝ
                </button>
                <button
                  type="button"
                  className="w-1/2 bg-white border border-gray-300 py-2 px-4 rounded-md"
                  onClick={handleCancel}
                >
                  HỦY
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
