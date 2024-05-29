import React, { useState } from "react";

function LoginForm() {
  const [fullName, setFullname] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Logged in")
    handdleCancel();
  }

  function handleCancel() {
    setFullname("");
    setPassword("");
  }

  return (
    <div className="container">
      <div className="card text-center">
        <h4 className="card-title">ĐĂNG NHẬP</h4>
        <div className="card-body">
          <form className="form-horizontal" action="POST">
            <div className="form-group">
              <div className="row">
                <label
                  className="control-label col-lg-1 offset-lg-3 align-self-center"
                  htmlFor="fullName"
                >
                  Tài khoản:
                </label>
                <div className="col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="Tài khoản"
                    onChange={(e) => setFullname(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <label
                  className="control-label col-lg-1 offset-lg-3 align-self-center"
                  htmlFor="phoneNumb"
                >
                  Mật khẩu:
                </label>
                <div className="col-lg-6">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Mật khẩu"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <button
                  type="submit"
                  className="btn col-lg-4 offset-lg-2 bg-dark"
                  style={{ color: "#d6c33a" }}
                  onSubmit={(e) => handleSubmit(e.target.value)}
                >
                  ĐĂNG NHẬP
                </button>
                <button
                  type="cancel"
                  className="btn col-lg-4 border"
                  onChange={(e) => handleCancel(e.target.value)}
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
export default LoginForm;
