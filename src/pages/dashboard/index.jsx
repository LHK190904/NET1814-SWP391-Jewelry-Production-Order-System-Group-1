import React from "react";
import SaleOverview from "./overview";
import LatestTransaction from "./transactions";
import SaleByCategory from "./category";
import TopSelling from "./top-selling";
import SaleTrend from "./trend";

function Dashboard() {
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SaleTrend />
        <SaleOverview />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <LatestTransaction />
        <SaleByCategory />
        <TopSelling />
      </div>
    </div>
  );
}

export default Dashboard;
