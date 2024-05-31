import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="items-center grid grid-cols-12 bg-black text-[#F7EF8A]">
        <Link to={"/"} className="col-start-2 col-span-3">
          <img
            src="./src/assets/images/logo.jpg"
            className="img-thumbnail"
            alt="Logo"
          />
        </Link>
        <form className="col-start-5 col-span-3 search-bar text-[#F7EF8A]">
          <input
            className="form-control w-full rounded-full p-2 bg-[#434343] placeholder-[#F7EF8A]"
            type="search"
            placeholder="Tìm kiếm..."
            aria-label="Search"
          />
        </form>
        <div className="col-start-10">
          {/* <i className="bi bi-facebook social-icons" />
          <i className="bi bi-instagram social-icons" /> */}
          <i className="fa-brands fa-instagram w-10" style={{color: '#f7ef8a'}} />
  
         
          <Link to={"/cart"} className="flex items-center">
            GIỎ HÀNG
            <i className="bi bi-cart3 social-icons ml-2" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Header;
