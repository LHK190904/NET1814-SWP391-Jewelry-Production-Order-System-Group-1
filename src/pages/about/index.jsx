import React from "react";
import Policies from "../../components/Policies";

export default function About() {
  return (
    <div className="w-screen min-h-screen bg-[#434343] p-8">
      <div className="max-w-screen-xl mx-auto grid grid-cols-12 gap-8">
        <div className="col-span-12 text-center text-white mb-12">
          <h1 className="text-[#F7EF8A] text-5xl mb-4">WELCOME TO LUXE</h1>
          <p className="text-xl">
            Your trusted partner in streamlining and optimizing jewelry
            production orders. Our platform is designed to bring efficiency,
            transparency, and ease to the intricate process of jewelry
            manufacturing.
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-4 flex justify-center">
          <img
            src="./src/assets/images/about/about1.jpg"
            alt=""
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-8 text-white">
          <h2 className="text-[#F7EF8A] text-4xl mb-4">AT LUXE</h2>
          <p className="text-xl mb-6">
            Our mission is to revolutionize the jewelry production industry by
            providing a comprehensive order management system. We aim to empower
            designers, manufacturers, and retailers to collaborate seamlessly,
            ensuring that every piece of jewelry is crafted to perfection and
            delivered on time.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8 text-white">
          <h2 className="text-[#F7EF8A] text-4xl mb-4">WHAT WE OFFER</h2>
          <ul className="text-xl list-disc list-inside mb-6">
            <li>Efficient order tracking from design to delivery</li>
            <li>Real-time updates and notifications</li>
            <li>
              Comprehensive database of designers, materials, and manufacturers
            </li>
            <li>Seamless communication channels for all stakeholders</li>
            <li>
              Detailed analytics and reporting tools to optimize production
            </li>
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-4 flex justify-center">
          <img
            src="./src/assets/images/about/about2.jpg"
            alt=""
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="col-span-12 lg:col-span-4 flex justify-center">
          <img
            src="./src/assets/images/about/about3.jpg"
            alt=""
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="col-span-12 lg:col-span-8 text-white">
          <h2 className="text-[#F7EF8A] text-4xl mb-4">OUR STORY</h2>
          <p className="text-xl">
            Founded in 2024, JewelryPro was born out of a passion for both
            technology and fine jewelry. Our founders, a team of seasoned
            professionals in the jewelry and tech industries, recognized the
            need for a robust system to manage the complexities of jewelry
            production. With this vision, they set out to create a platform that
            bridges the gap between traditional craftsmanship and modern
            technology.
          </p>
        </div>

        <div className=" col-start-2 col-span-10">
          <h1 className="text-center text-[#F7EF8A] text-4xl my-4">
            CHÍNH SÁCH ĐỔI TRẢ
          </h1>
          <Policies />
        </div>
      </div>
    </div>
  );
}
