import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function SearchPage() {
  const { query } = useParams();
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const navigate = useNavigate();

  const handleNavigate = (designID) => {
    navigate(`/product-details/${designID}`);
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
        console.log("Filtered designs:", filtered);
        console.log("Keyword:", query);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDesigns();
  }, [query]);

  return (
    <div className="min-h-screen w-screen bg-[#434343] text-[#F7EF8A]">
      <div>
        <h1 className="text-center text-4xl py-4">
          KẾT QUẢ TÌM KIẾM CHO "{query}"
        </h1>
        {filteredDesigns.length > 0 ? (
          <div className="grid grid-cols-12">
            <div className="col-start-2 col-span-10">
              <div className="grid grid-cols-4 gap-4 my-4">
                {filteredDesigns.map((item, index) => (
                  <div className="col-auto" key={index}>
                    <img
                      src={`${item.listURLImage[0]}`}
                      alt=""
                      className="p-1 bg-white"
                    />
                    <div className="bg-black p-2 rounded-lg text-white">
                      <div className="text-[#F7EF8A] text-2xl">
                        {item.designName}
                      </div>
                      <div className="text-xl">{item.description}</div>
                      <div className="text-2xl">{item.category}</div>
                      <button
                        className="text-black text-xl font-bold w-full p-4 bg-[#F7EF8A] hover:bg-gradient-to-br hover:from-white hover:to-[#fcec5f]"
                        onClick={() => handleNavigate(item.id)}
                      >
                        XEM CHI TIẾT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="col-span-12 text-center text-2xl">
            KHÔNG TÌM THẤY SẢN PHẨM PHÙ HỢP
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
