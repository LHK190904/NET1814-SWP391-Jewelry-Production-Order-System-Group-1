import SaleOverview from "./overview";
import LatestTransaction from "./transactions";
import SaleByCategory from "./category";
import TopSelling from "./top-selling";
import SaleTrend from "./trend";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <div className="flex justify-evenly p-2">
        <SaleTrend />
        <SaleOverview />
      </div>
      <div className="grid grid-cols-12 gap-4 m-4">
        <div className="col-start-1 col-span-4 ">
          <LatestTransaction />
        </div>
        <div className="col-span-4">
          <SaleByCategory />
        </div>
        <div className="col-span-4 ">
          <TopSelling />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
