import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authService.logout();
    navigate("/");
  };

  return (
    <button
      className="bg-red-500 text-black rounded-md p-1"
      onClick={handleLogout}
    >
      ĐĂNG XUẤT
    </button>
  );
}

export default LogoutButton;
