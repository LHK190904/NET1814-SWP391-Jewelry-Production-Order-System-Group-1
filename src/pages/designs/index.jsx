import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Designs() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://664ef13afafad45dfae19e02.mockapi.io/Movie"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#434343] p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Designs Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/product-details/${product.id}`}
            className="no-underline"
          >
            <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-sm">
              <h2 className="text-2xl font-bold mb-2">
                {product.product_name}
              </h2>
              <p className="text-gray-700 mb-1">Price: {product.price}</p>
              <p className="text-gray-700 mb-1">Material: {product.material}</p>
              <p className="text-gray-700 mb-1">Type: {product.type}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
