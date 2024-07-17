import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import axiosInstance from "../../services/axiosInstance";

function Header() {
  const [user, setUser] = useState(null);
  const [designs, setDesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const navigate = useNavigate();

  const fetchDesigns = async () => {
    try {
      const response = await axiosInstance.get(`design/getAllCompanyDesign`);
      setDesigns(response.data.result);
      setFilteredDesigns(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDesigns();
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.length > 0) {
      const filtered = designs.filter((design) =>
        design.designName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDesigns(filtered);
    } else {
      setFilteredDesigns(designs);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search/${searchQuery.toLowerCase()}`);
    setSearchQuery("");
  };

  const handleSearchSelect = (designID) => {
    navigate(`/product-details/${designID}`);
    setSearchQuery("");
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    navigate("/");
  };

  return (
    <div>
      <div className="grid lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-12 bg-black text-[#F7EF8A] items-center w-screen">
        <Link
          to={"/"}
          className="lg:col-start-2 lg:col-span-2 md:col-start-2 md:col-span-2 sm:col-start-2 sm:col-span-2"
        >
          <img
            className="lg:h-52 lg:w-54 "
            src="./src/assets/images/logo.png"
            alt="Logo"
          />
        </Link>
        <form
          className="lg:col-start-5 lg:col-span-4 md:col-start-5 md:col-span-3 sm:col-start-5 sm:col-span-3 search-bar text-[#F7EF8A] mx-3 relative"
          onSubmit={handleSearchSubmit}
        >
          <input
            className="form-control w-full rounded-full p-2 bg-[#434343] placeholder-[#F7EF8A]"
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <ul className="absolute z-20 bg-white w-full mt-1 rounded-lg text-black max-h-60 overflow-auto">
              {filteredDesigns.map((design) => (
                <li
                  key={design.id}
                  onClick={() => handleSearchSelect(design.id)}
                  className="p-2 hover:bg-gray-200 cursor-pointer"
                >
                  {design.designName}
                </li>
              ))}
            </ul>
          )}
        </form>

        <div className="xl:col-start-9 lg:col-start-10 md:col-start-9 sm:col-start-9 flex gap-1 xl:gap-10 lg:gap-4 md:gap-8 sm:gap-4 items-center">
          <Link to={"/cart/request"} className=" flex items-center">
            <span className="hover:text-[#ddd012]">GIỎ HÀNG</span>
            <img
              className="w-6 h-6"
              alt=""
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAADR0lEQVR4nO2Zy2sUQRCHSw0oInrVRBEf0fgAEfHiP6AioidvQgxJNCIiAcHbnjTTNRshInjwoGI00SAiUTx5UI/iyYuCEEiMuu5M1yxmuycR09IzvVEkL5Oe2R3wg77sbtf0b7uquqoH4D81RsjdI5LYJ0moZhqCM5KEryRhs1JqCdQiknB0NhHTjN6aFCMJR34vkg3//b1edLnI6iVhmyD8bnboJNQaoe8ejsWwYenjodl+KwPWHgnm+BayjFI9yyVHT4sJPWcHZBlJ2Gt2pQOyjCRsM0L6IcuEpfy2WAgr1GT2WkjKDov5JsgykvB+tCs+OwNZRgZ42pw7fZBlwmK+yQj58j9OagXJsf8fa7QkxmsbQjqqLURw9nHRQkLP3VmJE0gZSXg7FoK5RRvTQS45fo3OkxLbbmWF80AVcqt0FS44m5RB12awgeQ4EO1KwNqtGJwHkliLcasXYAvJnXPGve5ZMzoHOsCt90TjvrvbCPkMKRCWWKN2KUGspEZzK60ZjuOEFUycNELCSMLLJshv2jfO8ZHZlVZIEKVyS6MuVgvxnQPWHxBy97wRchcSRAbOQRMbHxIpi8Z51x5zQI1ACpWE4HgpkQeY8yTq42WAWxJ5BnfWCGJCcPwp/PwGSArJ8bFxr5Zk7LOz0W4Qew5JUia8YITcScK+5PgmEhK4JyBJxii/d6YLvsUy7ju7zB2Br4ZyKyDx1MiZH4txN9m0LTnrNm51HdJAED4x2avZlk2lcnW6utZ2y0F+H6SBIOw0ef6WLZshx2NmN95BWuh/zOT5IdvZUBB2Qloo9XCZeY9iuQvEH2MFXAtpIggHLbeyk4LYtVRFxELYReMKNyDLlAN3v3GH95BllMrV6aYnSpdFVg9ZRkydJ84pyDKSWKspV15CllFez+qpcoWjI7i7UadmyCJlYscFZxP2UjGr3u6G3D1q8TyZGPt2dV1VhOjexJwpg2Wvu0EPQezpbO9VJLG+medgb/oq4kXFVavX3VD5TLepld5i2jk8jq3p5gjCAKrB1HniOevnuyixgDmJU7nv0q6hF6aHIHxmstmArTnpvMau3K78ObT7BFe22poDaaB9XXL2QLtM5Db69n6OBS1kjuYXKOSft6HRrUkAAAAASUVORK5CYII="
            ></img>
          </Link>
        </div>
        <div className=" col-start-11 sm:col-start-10 lg:col-start-11 xl:col-start-10">
          {user ? (
            <div className="flex items-center gap-2">
              <img
                className="inline-block h-8 w-8 rounded-full ring-2 ring-[#F7EF8A] "
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span>{user.username}</span>
              <button
                onClick={handleLogout}
                className="text-[#F7EF8A] hover:text-[#ddd012]"
              >
                ĐĂNG XUẤT
              </button>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="text-[#F7EF8A] hover:text-[#ddd012] mr-4"
            >
              ĐĂNG NHẬP
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
