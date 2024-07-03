import React from "react";
import ItemCarousel from "../../components/ItemCarousel";

function Designs() {
  const products = [
    {
      id: 1,
      name: "Item 1",
      description: "This is the description for item 1.",
      price: "$100",
      imageUrl: "./src/assets/images/product/diamond_bracelet1.jpg",
    },
    {
      id: 2,
      name: "Item 2",
      description: "This is the description for item 2.",
      price: "$200",
      imageUrl: "./src/assets/images/product/diamond_earrings1.jpg",
    },
    {
      id: 3,
      name: "Item 3",
      description: "This is the description for item 3.",
      price: "$300",
      imageUrl: "./src/assets/images/product/diamond_necklace1.jpg",
    },
    {
      id: 4,
      name: "Item 4",
      description: "This is the description for item 4.",
      price: "$400",
      imageUrl: "./src/assets/images/product/diamond_ring1.jpg",
    },
    {
      id: 5,
      name: "Item 5",
      description: "This is the description for item 5.",
      price: "$500",
      imageUrl: "./src/assets/images/product/gold_bracelet1.jpg",
    },
    {
      id: 6,
      name: "Item 6",
      description: "This is the description for item 6.",
      price: "$600",
      imageUrl: "./src/assets/images/product/gold_earrings1.jpg",
    },
    {
      id: 7,
      name: "Item 7",
      description: "This is the description for item 7.",
      price: "$700",
      imageUrl: "./src/assets/images/product/gold_necklace1.jpg",
    },
    {
      id: 8,
      name: "Item 8",
      description: "This is the description for item 8.",
      price: "$800",
      imageUrl: "./src/assets/images/product/gold_ring1.jpg",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-12 ">
        <div className="col-span-12 text-white">
          <ItemCarousel items={products} slidesPerView={5} />
        </div>
      </div>
    </div>
  );
}

export default Designs;
