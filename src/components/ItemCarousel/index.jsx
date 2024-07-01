import React from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

function ItemCarousel({ items, slidesPerView = 4 }) {
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="w-full"
      slidesPerView={slidesPerView}
    >
      {items.map((item, index) => (
        <SwiperSlide key={index} className="flex justify-center">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-sm">
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="bg-black p-6">
              <h2 className="text-2xl mb-2">{item.name}</h2>
              <p className="text-white mb-4">{item.description}</p>
              <p className="text-xl text-[#F7EF8A] ">{item.price}</p>
              <button className="mt-4 px-4 py-2 bg-[#F7EF8A] text-black rounded">
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
