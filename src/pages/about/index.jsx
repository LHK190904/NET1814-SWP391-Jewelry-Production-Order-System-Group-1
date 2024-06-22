import React from "react";

export default function About() {
  return (
    <div className="w-screen min-h-screen bg-[#434343]">
      <div className="grid grid-cols-12 grid-rows-9">
        <div className="grid col-start-2 col-span-4 row-start-4 text-xl text-white">
          <h1 className="text-[#F7EF8A] text-4xl">WELCOME TO LUXE,</h1>
          Your trusted partner in streamlining and optimizing jewelry production
          orders. Our platform is designed to bring efficiency, transparency,
          and ease to the intricate process of jewelry manufacturing.
        </div>
        <div className="grid col-start-7 col-span-2 row-start-3 row-span-3 ">
          <img src="./src/assets/images/about2.jpg" alt="" className="w-full" />
        </div>
        <div className="grid col-start-10 col-span-2 row-start-2 row-span-3">
          <img src="./src/assets/images/about3.jpg" alt="" />
        </div>
        <div className="grid col-start-9 col-span-2 row-start-4 row-span-4">
          <img src="./src/assets/images/about1.jpg" alt="" className="ml-20" />
        </div>
        <div className="grid col-start-2 col-span-4 row-start-6 row-span-1 text-xl text-white">
          <p className="text-[#F7EF8A] text-4xl">AT LUXE</p>
          Our mission is to revolutionize the jewelry production industry by
          providing a comprehensive order management system. We aim to empower
          designers, manufacturers, and retailers to collaborate seamlessly,
          ensuring that every piece of jewelry is crafted to perfection and
          delivered on time.
        </div>
        <div className="grid col-start-8 col-span-4 row-start-7 row-span-1 items-end">
          <p className="text-[#F7EF8A] text-4xl">WHAT WE OFFER</p>
          <ul className="text-xl text-white">
            <li>+ Efficient order tracking from design to delivery</li>
            <li>+ Real-time updates and notifications</li>
            <li>
              + Comprehensive database of designers, materials, and
              manufacturers
            </li>
            <li>+ Seamless communication channels for all stakeholders</li>
            <li>
              + Detailed analytics and reporting tools to optimize production
            </li>
          </ul>
        </div>
        <div className="grid col-start-2 col-span-4 row-start-8 row-span-1 text-white text-xl">
          <p className="text-[#F7EF8A] text-4xl">OUR STORY</p>
          Founded in 2024, JewelryPro was born out of a passion for both
          technology and fine jewelry. Our founders, a team of seasoned
          professionals in the jewelry and tech industries, recognized the need
          for a robust system to manage the complexities of jewelry production.
          With this vision, they set out to create a platform that bridges the
          gap between traditional craftsmanship and modern technology.
        </div>
      </div>
    </div>
  );
}
