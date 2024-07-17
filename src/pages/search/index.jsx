import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";

function SearchPage() {
  const { query } = useParams();
  const [filteredDesigns, setFilteredDesigns] = useState([]);
  const [collections, setCollections] = useState({});

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
            <div className="col-start-2 col-span-10 bg-white">ItemCarousel</div>
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
