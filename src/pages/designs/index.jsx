import React, { useEffect } from "react";
import axios from "axios";

export default function Designs() {
  const [product, setProduct] = [];

  const fectchProduct = async () => {
    const response = await axios.get("");
    setProduct(response.data);
  };

  useEffect(() => {
    fectchProduct();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-[#434343]">
      <h1 className="text-4xl font-bold text-white">Designs Page</h1>
    </div>
  );
}
