import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

function Navigator() {
  return (
    <div className="container-fluid bg-black">
      <div className="row">
        <a className="navbar-brand col-lg-2 offset-lg-1" href="#Home">
          <img
            src="./assets/images/logo.jpg"
            className="img-thumbnail"
            alt="Logo"
          />
        </a>
        <div className="col-lg-2"></div>
        <form className="form-inline mx-auto search-bar col-lg-3 align-self-center">
          <input
            className="form-control mr-sm-2 "
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
        </form>
        <div className="col-lg-3 align-self-center" id="icons">
          <i className="bi bi-facebook social-icons" />
          <i className="bi bi-instagram social-icons" />
          <a href="#Cart">
            GIỎ HÀNG
            <i className="bi bi-cart3 social-icons" />
          </a>
        </div>
      </div>
      <div className="row bg-dark">
        <nav>
          <ul>
            <li>
              <a href="#Home">TRANG CHỦ</a>
            </li>
            <li>
              <a href="#About">THÔNG TIN</a>
            </li>
            <li>
              <a href="#Login">THIẾT KẾ</a>
            </li>
            <li>
              <a href="#Collection">BỘ SƯU TẬP</a>
            </li>
            <li>
              <a href="#Blog">BLOG</a>
            </li>
            <li>
              <a href="#Login">ĐĂNG NHẬP</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
export default Navigator;
