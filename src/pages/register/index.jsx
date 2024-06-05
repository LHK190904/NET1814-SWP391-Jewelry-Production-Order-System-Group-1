import React, { useState } from "react";

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Registered");
    handleCancel();
  }

  function handleCancel() {
    setUserName("");
    setPassword("");
    setAddress("");
  }
  return (
    <div className="flex items-center justify-center lg:min-h-screen bg-[#434343]">
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
                    required
                  />
                </div>
              </div>
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
