import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-black text-[#d6c33a]">
      <div className="items-center grid grid-cols-12">
        <a className="col-start-2 col-span-3 " href="#Home">
          <img
            src="./src/assets/images/logo.jpg"
            className="img-thumbnail"
            alt="Logo"
          />
        </a>
        <form className="col-start-5 col-span-3 search-bar text-black">
          <input
            className="form-control w-full rounded-lg p-2"
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
        </form>
        <div className="col-start-10">
          <i className="bi bi-facebook social-icons" />
          <i className="bi bi-instagram social-icons" />
          <Link to={"/cart"} className="flex items-center">
            GIỎ HÀNG
            <i className="bi bi-cart3 social-icons ml-2" />
          </Link>
        </div>
      </div>
      <div className="p-4 bg-[#2A2A2A] text-[#d6c33a]">
        <nav>
          <ul className="flex justify-around">
            <li>
              <Link to={"/"}>TRANG CHỦ</Link>
            </li>
            <li>
              <Link to={"/about"}>THÔNG TIN</Link>
            </li>
            <li>
              <Link to={"/designs"}>THIẾT KẾ</Link>
            </li>
            <li>
              <Link to={"/collections"}>BỘ SƯU TẬP</Link>
            </li>
            <li>
              <Link to={"/blog"}>BLOG</Link>
            </li>
            <li>
              <Link to={"/login"}>ĐĂNG NHẬP</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
