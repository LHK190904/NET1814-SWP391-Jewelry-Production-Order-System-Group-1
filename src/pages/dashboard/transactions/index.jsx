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
      <h2 className="text-xl">LATEST TRANSACTIONS</h2>
      <ul className="mt-2">
        {data.map((item) => (
          <li key={item.id} className="flex justify-between py-2">
            <span>{item.id}</span>
            <span>{item.total}</span>
            <span>{item.description}</span>
            <span>{item.date}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LatestTransaction;
