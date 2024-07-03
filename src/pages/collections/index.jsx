import  { useRef, useEffect } from "react";
import Carousel from "../../components/carousel";
import ItemCarousel from "../../components/ItemCarousel";
import { useLocation } from "react-router-dom";
import Designs from "../designs";

const banners = [
  "./src/assets/images/banner/banner1.jpg",
  "./src/assets/images/banner/banner2.jpg",
  "./src/assets/images/banner/banner3.jpg",
  "./src/assets/images/banner/banner4.jpg",
  "./src/assets/images/banner/banner5.jpg",
];

const collection1 = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the description for item 1.",
    price: "$100",
    imageUrl: "./src/assets/images/collection/pnj1/ringF.png",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the description for item 2.",
    price: "$200",
    imageUrl: "./src/assets/images/collection/pnj1/ringM.png",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is the description for item 3.",
    price: "$300",
    imageUrl: "./src/assets/images/collection/pnj1/necklaceF.png",
  },
  {
    id: 4,
    name: "Item 4",
    description: "This is the description for item 4.",
    price: "$400",
    imageUrl: "./src/assets/images/collection/pnj1/necklaceM.png",
  },
  {
    id: 5,
    name: "Item 5",
    description: "This is the description for item 5.",
    price: "$500",
    imageUrl: "./src/assets/images/collection/pnj1/earrings.png",
  },
  {
    id: 6,
    name: "Item 6",
    description: "This is the description for item 6.",
    price: "$600",
    imageUrl: "./src/assets/images/collection/pnj1/braceletM.png",
  },
  {
    id: 7,
    name: "Item 7",
    description: "This is the description for item 7.",
    price: "$700",
    imageUrl: "./src/assets/images/collection/pnj1/braceletF.png",
  },
];

const collection2 = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the description for item 1.",
    price: "$100",
    imageUrl: "./src/assets/images/collection/pnj2/ringF.png",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the description for item 2.",
    price: "$200",
    imageUrl: "./src/assets/images/collection/pnj2/ringM.png",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is the description for item 3.",
    price: "$300",
    imageUrl: "./src/assets/images/collection/pnj2/necklaceF.png",
  },
  {
    id: 4,
    name: "Item 4",
    description: "This is the description for item 4.",
    price: "$400",
    imageUrl: "./src/assets/images/collection/pnj2/earrings.png",
  },
  {
    id: 5,
    name: "Item 5",
    description: "This is the description for item 5.",
    price: "$500",
    imageUrl: "./src/assets/images/collection/pnj2/braceletF.png",
  },
];

const collection3 = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the description for item 1.",
    price: "$100",
    imageUrl: "./src/assets/images/collection/pnj3/ringF.png",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the description for item 2.",
    price: "$200",
    imageUrl: "./src/assets/images/collection/pnj3/ringM.png",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is the description for item 3.",
    price: "$300",
    imageUrl: "./src/assets/images/collection/pnj3/necklaceF.png",
  },
  {
    id: 4,
    name: "Item 4",
    description: "This is the description for item 4.",
    price: "$400",
    imageUrl: "./src/assets/images/collection/pnj3/earrings.png",
  },
  {
    id: 5,
    name: "Item 5",
    description: "This is the description for item 5.",
    price: "$500",
    imageUrl: "./src/assets/images/collection/pnj3/braceletF.png",
  },
  {
    id: 6,
    name: "Item 6",
    description: "This is the description for item 6.",
    price: "$600",
    imageUrl: "./src/assets/images/collection/pnj3/braceletM.png",
  },
];

const collection4 = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the description for item 1.",
    price: "$100",
    imageUrl: "./src/assets/images/collection/pnj4/ringF.png",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the description for item 2.",
    price: "$200",
    imageUrl: "./src/assets/images/collection/pnj4/ringM.png",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is the description for item 3.",
    price: "$300",
    imageUrl: "./src/assets/images/collection/pnj4/necklace.png",
  },
  {
    id: 4,
    name: "Item 4",
    description: "This is the description for item 4.",
    price: "$400",
    imageUrl: "./src/assets/images/collection/pnj4/earrings.png",
  },
  {
    id: 5,
    name: "Item 5",
    description: "This is the description for item 5.",
    price: "$500",
    imageUrl: "./src/assets/images/collection/pnj4/bracelet.png",
  },
];

const collection5 = [
  {
    id: 1,
    name: "Item 1",
    description: "This is the description for item 1.",
    price: "$100",
    imageUrl: "./src/assets/images/collection/pnj5/ringF.png",
  },
  {
    id: 2,
    name: "Item 2",
    description: "This is the description for item 2.",
    price: "$200",
    imageUrl: "./src/assets/images/collection/pnj5/ringM.png",
  },
  {
    id: 3,
    name: "Item 3",
    description: "This is the description for item 3.",
    price: "$300",
    imageUrl: "./src/assets/images/collection/pnj5/necklace.png",
  },
  {
    id: 4,
    name: "Item 4",
    description: "This is the description for item 4.",
    price: "$400",
    imageUrl: "./src/assets/images/collection/pnj5/earrings.png",
  },
  {
    id: 5,
    name: "Item 5",
    description: "This is the description for item 5.",
    price: "$500",
    imageUrl: "./src/assets/images/collection/pnj5/braceletF.png",
  },
  {
    id: 6,
    name: "Item 6",
    description: "This is the description for item 6.",
    price: "$600",
    imageUrl: "./src/assets/images/collection/pnj5/braceletM.png",
  },
];

export default function Collections() {
  const designsRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
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
      <div className="grid grid-cols-12 bg-[#434343]">
        <div className="col-start-2 col-span-1 text-4xl">BỘ SƯU TẬP 1</div>
        <div className="col-span-10 mb-10">
          <ItemCarousel items={collection1} slidesPerView={3} />
        </div>
        <div className="col-start-2 col-span-1 text-4xl">BỘ SƯU TẬP 2</div>
        <div className="col-span-10 mb-10">
          <ItemCarousel items={collection2} slidesPerView={3} />
        </div>
        <div className="col-start-2 col-span-1 text-4xl">BỘ SƯU TẬP 3</div>
        <div className="col-span-10 mb-10">
          <ItemCarousel items={collection3} slidesPerView={3} />
        </div>
        <div className="col-start-2 col-span-1 text-4xl">BỘ SƯU TẬP 4</div>
        <div className="col-span-10 mb-10">
          <ItemCarousel items={collection4} slidesPerView={3} />
        </div>
        <div className="col-start-2 col-span-1 text-4xl">BỘ SƯU TẬP 5</div>
        <div className="col-span-10 mb-10">
          <ItemCarousel items={collection5} slidesPerView={3} />
        </div>
        <h1 className="col-span-12 text-center text-4xl mb-10">
          CÁC MẪU THIẾT KẾ KHÁC
        </h1>
        <div ref={designsRef} className="col-start-2 col-span-10">
          <Designs />
        </div>
      </div>
    </div>
  );
}
