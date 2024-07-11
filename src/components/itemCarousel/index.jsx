import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import axiosInstance from "../../services/axiosInstance";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

function ItemCarousel({ items }) {
  const navigate = useNavigate();

  const handleClick = async (designID) => {
    try {
      const user = authService.getCurrentUser();
      if (!user) {
        navigate(`/register`);
      } else {
        try {
          const response = await axiosInstance.post(
            `requests/requestCompanyDesign/${user.id}/${designID}`
          );
          console.log(response.data);
          message.success("ĐÃ THÊM VÀO GIỎ HÀNG");
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="w-full"
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm mx-2">
            <img
              src={item.listURLImage}
              alt={item.designName}
              className="w-full h-[300px] object-cover"
            />
            <div className="bg-black p-6">
              <h2 className="text-2xl mb-2 text-white">{item.designName}</h2>
              <p className="text-white mb-4">{item.description}</p>
              <p className="text-xl text-[#F7EF8A]">{item.category}</p>
              <button
                onClick={() => handleClick(item.id)}
                className="mt-4 px-4 py-2 bg-[#F7EF8A] text-black rounded"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ItemCarousel;
