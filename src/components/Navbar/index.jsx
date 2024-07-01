import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleDesignsClick = () => {
    navigate("/collections", { state: { scrollToDesigns: true } });
  };

  return (
    <div className="p-4 bg-[#2A2A2A] w-screen text-[#F7EF8A] font-bold z-10 sticky top-0">
      <nav>
        <ul className="flex justify-around gap-4">
          <li>
            <Link to={"/"} className="hover:text-[#ddd012]">
              TRANG CHỦ
            </Link>
          </li>
          <li>
            <Link to={"/about"} className="hover:text-[#ddd012]">
              THÔNG TIN
            </Link>
          </li>
          <li>
            <Link to={"/collections"} className="hover:text-[#ddd012]">
              BỘ SƯU TẬP
            </Link>
          </li>
          <li>
            <button
              onClick={handleDesignsClick}
              className="hover:text-[#ddd012]"
            >
              THIẾT KẾ
            </button>
          </li>
          <li>
            <Link to={"/blog"} className="hover:text-[#ddd012]">
              BLOG
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}