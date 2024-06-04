// src/components/LoginForm.js
import React, { useState } from "react";
import authService from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";

function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.login(userName, password); // Correct variable name here
      if (user) {
        navigate("/");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  function handleCancel() {
    setUserName("");
    setPassword("");
    setErrorMessage("");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#434343]">
      <div className="bg-white shadow-md rounded-lg w-full max-w-lg text-center">
        <h4 className="text-base font-semibold p-4 border-b">ĐĂNG NHẬP</h4>
        <div className="p-6">
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="w-1/4 text-right mr-4" htmlFor="username">
                  Tài khoản:
                </label>
                <div className="flex-grow">
                  <input
                    type="text"
                    className="form-input w-full p-2 border border-gray-300 rounded-md"
                    id="username"
                    placeholder="Tài khoản"
                    onChange={(e) => setUserName(e.target.value)} // Update state
                    value={userName} // Correct variable name here
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
                    onChange={(e) => setPassword(e.target.value)} // Update state
                    value={password}
                    required
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="w-1/2 bg-gray-800 text-[#F7EF8A] py-2 px-4 rounded-md"
                >
                  ĐĂNG NHẬP
                </button>
                <button className="flex w-1/2 justify-center bg-white border border-gray-300 rounded-md py-2 px-2 gap-1 text-base">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png"
                    alt=""
                    width={20}
                  />
                  <span>ĐĂNG NHẬP VỚI GOOGLE</span>
                </button>
              </div>
              <Link to={"/register"} className="flex space-x-4 justify-center">
                ĐĂNG KÝ NGAY
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
