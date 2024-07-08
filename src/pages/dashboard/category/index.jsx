import React from "react";

function SaleByCategory() {
  const data = [
    { id: 1, name: "Ring1", price: 10000, category: "ring", amount: 60 },
    { id: 2, name: "Ring2", price: 20000, category: "ring", amount: 100 },
    {
      id: 3,
      name: "Necklace1",
      price: 30000,
      category: "necklace",
      amount: 70,
    },
    {
      id: 4,
      name: "Necklace2",
      price: 40000,
      category: "necklace",
      amount: 50,
    },
    {
      id: 5,
      name: "Bracelet1",
      price: 50000,
      category: "bracelet",
      amount: 30,
    },
    {
      id: 6,
      name: "Bracelet2",
      price: 60000,
      category: "bracelet",
      amount: 40,
    },
    {
      id: 7,
      name: "Earrings1",
      price: 10000,
      category: "earrings",
      amount: 20,
    },
    {
      id: 8,
      name: "Earrings2",
      price: 20000,
      category: "earrings",
      amount: 120,
    },
  ];
  const sortedData = data.sort((a, b) => a.category.localeCompare(b.category));

  return (
    <div className="bg-white shadow rounded-lg p-2">
      <h2 className="text-4xl font-bold">SALE BY CATEGORY</h2>
      <div className="grid grid-cols-5 text-xl">
        <div className="col-span-1">ID</div>
        <div className="col-span-1">NAME</div>
        <div className="col-span-1">CATEGORY</div>
        <div className="col-span-1">PRICE</div>
        <div className="col-span-1">AMOUNT</div>
      </div>
      <ul className="mt-4">
        {sortedData.map((item) => (
          <div key={item.id} className="grid grid-cols-5">
            <span className="col-span-1">{item.id}</span>
            <span className="col-span-1">{item.name}</span>
            <span className="col-span-1">{item.category}</span>
            <span className="col-span-1">{item.price}</span>
            <span className="col-span-1">{item.amount}</span>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default SaleByCategory;
