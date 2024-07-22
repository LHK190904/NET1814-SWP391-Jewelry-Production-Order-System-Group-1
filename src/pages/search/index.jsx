import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function SearchPage() {
  const { query } = useParams();
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const navigate = useNavigate();
  const [searchDesign, setSearchDesign] = useState({
    name: "",
    category: "",
    mainStone: "",
    subStone: "",
  });

  const handleNavigate = (designID) => {
    navigate(`/product-details/${designID}`);
  };

  const handleSearchSelect = async (type) => {
    try {
      const response = await axiosInstance.get(
        `design/getAllCompanyDesign?search=${searchDesign.name}&category=${searchDesign.category}&mainStone=${searchDesign.mainStone}&subStone=${searchDesign.subStone}`
      );
      setFilteredDesigns(response.data.result);
      console.log(response.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchDesigns = async () => {
      try {
        const response = await axiosInstance.get(`design/getAllCompanyDesign`);
        const designs = response.data.result;
        const filtered = designs.filter((design) =>
          design.designName.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredDesigns(filtered);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDesigns();
  }, [query]);

  return (
    <div className="min-h-screen w-full bg-[#434343] text-[#F7EF8A] p-4">
      <h1 className="text-center text-2xl md:text-4xl py-4">
        KẾT QUẢ TÌM KIẾM CHO "{query}"
      </h1>
      {filteredDesigns.length > 0 ? (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredDesigns.map((item, index) => (
              <div className="bg-black p-4 rounded-lg text-white" key={index}>
                <img
                  src={`${item.listURLImage[0]}`}
                  alt={item.designName}
                  className="w-full h-48 object-cover rounded-lg bg-white"
                />
                <div className="mt-2">
                  <div className="text-[#F7EF8A] text-xl md:text-2xl">
                    {item.designName}
                  </div>
                  <div className="text-lg md:text-xl">{item.description}</div>
                  <div className="text-md md:text-lg">{item.category}</div>
                  <button
                    className="mt-4 text-black text-lg md:text-xl rounded-lg font-bold w-full p-2 bg-[#F7EF8A] hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f]"
                    onClick={() => handleNavigate(item.id)}
                  >
                    XEM CHI TIẾT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-xl md:text-2xl">
          KHÔNG TÌM THẤY SẢN PHẨM PHÙ HỢP
        </div>
      )}
    </div>
  );
}

export default SearchPage;
