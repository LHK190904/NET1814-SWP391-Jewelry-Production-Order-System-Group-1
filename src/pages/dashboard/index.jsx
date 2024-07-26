import LatestTransaction from "./transactions";
import TopSelling from "./top-selling";
import SaleTrend from "./trend";
import Overview from "./overview";

function Dashboard() {
  return (
    <div className="w-screen min-h-screen bg-gray-100">
      <div>
        <Overview />
      </div>
      <div>
        <SaleTrend />
      </div>
      <div>
        <LatestTransaction />
      </div>
      <div>
        <TopSelling />
      </div>
    </div>
  );
}

export default Dashboard;
