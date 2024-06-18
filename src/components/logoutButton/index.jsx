import React from "react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <button onClick={handleLogout} className="text-[#F7EF8A]">
      ĐĂNG XUẤT
    </button>
  );
}

export default LogoutButton;
