import React from "react";

function TopSelling() {
  const data = [
    { id: 1, name: "R1", price: 10000, amount: 10 },
    { id: 2, name: "R2", price: 20000, amount: 20 },
    { id: 3, name: "R3", price: 30000, amount: 30 },
    { id: 4, name: "R4", price: 40000, amount: 40 },
  ];
  return (
    <div className="bg-white shadow rounded-lg">
      <h2 className="text-xl">TOP SELLING PRODUCTS</h2>
      <ul className="mt-4">
        {data.map((item) => (
          <li key={item.id}>
            <span>{item.id}</span>
            <span>{item.name}</span>
            <span>{item.amount}</span>
            <span>{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopSelling;
