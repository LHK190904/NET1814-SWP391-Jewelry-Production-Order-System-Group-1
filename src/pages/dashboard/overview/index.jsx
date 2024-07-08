import React from "react";

function SaleOverview() {
  const totalSales = [1000, 2000, 3000, 4000, 5000];
  const totalOrders = [1000, 2000, 3000, 4000, 5000];
  const completedOrders = [1000, 2000, 3000, 4000, 5000];
  const canceledOrders = [1000, 2000, 3000, 4000, 5000];

  const handleCalculateDiff = (arr) => {
    const last = arr[arr.length - 1];
    const secondLast = arr[arr.length - 2];
    return last > secondLast ? last - secondLast : 0;
  };

  return (
    <div className="grid grid-cols-12 bg-white rounded-lg p-2 gap-2">
      <div className="col-span-6">
        <h1 className="text-xl font-bold">TOTAL SALES</h1>
        <p className="text-2xl">{totalSales[totalSales.length - 1]}</p>
        <p className="text-green-400 text-xl">
          {handleCalculateDiff(totalSales)}
        </p>
      </div>
      <div className="col-span-6">
        <h1 className="text-xl font-bold">TOTAL ORDERS</h1>
        <p className="text-2xl">{totalOrders[totalOrders.length - 1]}</p>
        <p className="text-red-400 text-xl">
          {handleCalculateDiff(totalOrders)}
        </p>
      </div>
      <div className="col-span-6">
        <h1 className="text-xl font-bold">COMPLETED ORDERS</h1>
        <p className="text-2xl">
          {completedOrders[completedOrders.length - 1]}
        </p>
        <p className="text-green-400 text-xl">
          {handleCalculateDiff(completedOrders)}
        </p>
      </div>
      <div className="col-span-6">
        <h1 className="text-xl font-bold">CANCELED ORDERS</h1>
        <p className="text-2xl">{canceledOrders[canceledOrders.length - 1]}</p>
        <p className="text-green-400 text-xl">
          {handleCalculateDiff(canceledOrders)}
        </p>
      </div>
    </div>
  );
}

export default SaleOverview;
