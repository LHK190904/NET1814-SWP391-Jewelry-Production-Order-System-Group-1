import LatestTransaction from "./transactions";
import TopSelling from "./top-selling";
import SaleTrend from "./trend";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <div className="w-3/4 mx-auto">
        <SaleTrend />
      </div>
      <div className="flex justify-evenly m-4 p-4">
        <TopSelling />
        <LatestTransaction />
      </div>
    </div>
  );
}

export default Dashboard;
