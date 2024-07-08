import React from "react";

function LatestTransaction() {
  const data = [
    {
      id: 1,
      description: "Payment for Order O1",
      total: 10000,
      date: "Apr 23, 2024",
    },
    {
      id: 2,
      description: "Payment for Order O2",
      total: 20000,
      date: "Apr 23, 2024",
    },
    {
      id: 3,
      description: "Payment for Order O3",
      total: 30000,
      date: "Apr 23, 2024",
    },
    {
      id: 4,
      description: "Payment for Order O4",
      total: 40000,
      date: "Apr 23, 2024",
    },
  ];
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-4xl font-bold">LATEST TRANSACTIONS</h2>
      <div className="grid grid-cols-5 text-xl">
        <div className="col-span-1">ID</div>
        <div className="col-span-1">TOTAL</div>
        <div className="col-span-2">DESCRIPTION</div>
        <div className="col-span-1">DATE</div>
      </div>
      <ul className="mt-2">
        {data.map((item) => (
          <div key={item.id} className="grid grid-cols-5">
            <div className="col-span-1">{item.id}</div>
            <div className="col-span-1">{item.total}</div>
            <div className="col-span-2">{item.description}</div>
            <div className="col-span-1">{item.date}</div>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default LatestTransaction;
