import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="p-4 bg-[#2A2A2A] text-[#F7EF8A] font-bold z-10 w-full sticky top-0">
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
  );
}