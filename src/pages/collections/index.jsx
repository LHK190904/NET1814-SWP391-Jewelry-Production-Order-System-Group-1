import { useRef, useEffect, useState } from "react";
import Carousel from "../../components/carousel";
import ItemCarousel from "../../components/itemCarousel";
import { useLocation } from "react-router-dom";
import Designs from "../designs";
import axiosInstance from "../../services/axiosInstance";

const banners = [
  "./src/assets/images/banner/banner1.jpg",
  "./src/assets/images/banner/banner2.jpg",
  "./src/assets/images/banner/banner3.jpg",
  "./src/assets/images/banner/banner4.jpg",
  "./src/assets/images/banner/banner5.jpg",
];

export default function Collections() {
  const [collections, setCollections] = useState({});
  const designsRef = useRef(null);
  const location = useLocation();

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get(`design/getAllCompanyDesign`);
      const allProducts = response.data.result;

      // Group products by collection name excluding 'IDV-'
      const groupedProducts = allProducts.reduce((acc, product) => {
        if (!product.designName.startsWith("IDV-")) {
          const collectionName = product.designName.split("-")[0];
          if (!acc[collectionName]) {
            acc[collectionName] = [];
          }
          acc[collectionName].push(product);
        }
        return acc;
      }, {});

      setCollections(groupedProducts);
      console.log(groupedProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
    if (location.state?.scrollToDesigns) {
      designsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="min-h-screen w-screen bg-[#434343] text-[#F7EF8A]">
      <Carousel numberOfSlides={1} images={banners} autoplay={true} />
      <div className="grid grid-cols-12 bg-[#434343]">
        <div className="col-span-12 p-8 text-center text-4xl">
          Our Collections
        </div>
      </div>

      {Object.keys(collections).map((collectionName, index) => (
        <div key={index} className="grid grid-cols-12 bg-[#434343]">
          <div className="col-start-2 col-span-1 text-4xl">{`BỘ SƯU TẬP ${
            index + 1
          }`}</div>
          <div className="col-span-9 mb-10">
            <ItemCarousel
              items={collections[collectionName]}
              slidesPerView={3}
            />
          </div>
        </div>
      ))}
      <h1 className="col-span-12 text-center text-4xl mb-10">
        CÁC MẪU THIẾT KẾ KHÁC
      </h1>
      <div ref={designsRef} className="col-start-2 col-span-10">
        <Designs />
      </div>
    </div>
  );
}
