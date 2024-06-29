import React from "react";

function SaleByCategory() {
  const data = [
    { id: 1, name: "R1", price: 10000, category: "ring" },
    { id: 2, name: "R2", price: 20000, category: "ring" },
    { id: 3, name: "N1", price: 30000, category: "necklace" },
    { id: 4, name: "N2", price: 40000, category: "necklace" },
    { id: 5, name: "B1", price: 50000, category: "bracelet" },
    { id: 6, name: "B2", price: 60000, category: "bracelet" },
  ];
  return (
    <div className="bg-white shadow rounded-lg">
      <h2 className="text-xl">SALE BY CATEGORY</h2>
      <ul className="mt-4">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between mt-4">
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.price}</span>
            <span>{item.category}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SaleByCategory;
