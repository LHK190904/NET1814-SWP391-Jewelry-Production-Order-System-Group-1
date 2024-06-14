import React from "react";
import Carousel from "../../components/carousel";

export default function Home() {
  return (
    <div>
      <div className="w-full h-fit">
        <Carousel />
      </div>
      <div className="flex items-center justify-center h-screen bg-white">
        <h1 className="text-4xl font-bold text-gray-800">Home Page</h1>
      </div>
    </div>
  );
}
