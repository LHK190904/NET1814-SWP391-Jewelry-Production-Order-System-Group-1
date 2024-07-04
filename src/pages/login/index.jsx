import { useState, useEffect } from "react";
import authService, { getToken, setToken } from "../../services/authService";
import { Link, useNavigate } from "react-router-dom";
import { OAuthConfig } from "../../config/OAuthConfig";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await authService.login(userName, password);
      console.log(user);
      if (user) {
        setCurrentUser(user);
        if (user.title === "ADMIN") {
          navigate("/admin");
        } else if (user.title === "SALE_STAFF") {
          navigate("/saler/receive_requests");
        } else if (user.title === "MANAGER") {
          navigate("/manager/order");
        } else if (user.title === "DESIGN_STAFF") {
          navigate("/designer/process_orders");
        } else if (user.title === "PRODUCTION_STAFF") {
          navigate("/production-staff");
        } else {
          navigate("/");
        }
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleContinueWithGoogle = () => {
    const callbackUrl = OAuthConfig.redirectUri;
    const authUrl = OAuthConfig.authUri;
    const googleClientId = OAuthConfig.clientId;

    const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
        callbackUrl
    )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

    console.log(targetUrl);

    window.location.href = targetUrl;
  };

  const handleCancel = () => {
    setUserName("");
    setPassword("");
    setErrorMessage("");
  };

  const addPassword = (event) => {
    event.preventDefault();

    const body = {
      password: newPassword,
    };

    fetch("http://localhost:8080/cust/create-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(body),
    })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.code != 1000) throw new Error(data.message);

          setToken(data.result?.token);
          setCurrentUser(data.result);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
  };

  useEffect(() => {
    const accessToken = getToken();

    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  return (
      <div className="flex items-center justify-center w-screen lg:min-h-screen bg-[#434343]">
        <div className="bg-white shadow-md rounded-lg w-full max-w-lg text-center m-4">
          <h4 className="text-base font-semibold p-4 border-b">ĐĂNG NHẬP</h4>
          <div className="p-6">
            {errorMessage && (
                <div className="mb-4 text-red-500">{errorMessage}</div>
            )}
            <form className="space-y-6" onSubmit={handleLogin}>
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
                <div className="flex space-x-4">
                  <button
                      type="submit"
                      className="w-1/2 bg-gray-800 text-[#F7EF8A] hover:text-[#ddd012] py-2 px-4 rounded-md"
                  >
                    ĐĂNG NHẬP
                  </button>
                  <button
                      type="button"
                      className="flex w-1/2 justify-center bg-white border border-gray-300 rounded-md py-2 px-2 gap-1 text-base"
                      onClick={handleContinueWithGoogle}
                  >
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
                {currentUser?.noPassword && (
                    <div className="mt-4">
                      <h5 className="text-base font-semibold">Create Password</h5>
                      <form onSubmit={addPassword} className="space-y-4">
                        <div className="flex items-center">
                          <label className="w-1/4 text-right mr-4" htmlFor="newPassword">
                            Mật khẩu mới:
                          </label>
                          <div className="flex-grow">
                            <input
                                type="password"
                                className="form-input w-full p-2 border border-gray-300 rounded-md"
                                id="newPassword"
                                placeholder="Mật khẩu mới"
                                onChange={(e) => setNewPassword(e.target.value)}
                                value={newPassword}
                                required
                            />
                          </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gray-800 text-[#F7EF8A] hover:text-[#ddd012] py-2 px-4 rounded-md"
                        >
                          Tạo Mật Khẩu
                        </button>
                      </form>
                    </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
  );
}

export default Login;
