import { Battery, Car, DollarSign, Plug, Zap } from "lucide-react";
import { DashboardCard } from "./components/DashboardCard";
import { StatsCard } from "./components/StatsCard";
import { VehicleDistributionChart } from "./components/charts/VehicleDistributionChart";
import { VehicalDistributionPieChart } from "./components/charts/VehicalDistributionPieChart";
import { VehicleDistrictAreaBarChart } from "./components/charts/VehicleDistrictAreaBarChart";
import { VehicleElectricUsageBarChart } from "./components/charts/VehicleElectricUsageBarChart";
import { VehicleMSRPLineChart } from "./components/charts/VehicleMSRPLineChart";

// import evData from "./data/evParsedData.json";
import evData from "./data/evParsedDataLarge.json";

import {
  getBarChartData,
  getBarChartDistrictAreaData,
  getLineChartData,
  getLineChartElectricUsageData,
  getPieChartData,
} from "./utils";

function App() {
  const data = evData;
  const vehicleDistributionChartData = getBarChartData(data);
  const vehicleDistributionPieChartData = getPieChartData(data);
  const vehicleMSRPLineChartData = getLineChartData(data);
  const vehicleElectricUsageBarChartData = getLineChartElectricUsageData(data);
  const vehicleDistrictAreaBarChartData = getBarChartDistrictAreaData(data);

  const totalEVs = data?.length;
  const avgRange = Math.round(
    data.reduce((acc, curr) => acc + (curr.range || 0), 0) /
      data.filter((v) => v.range > 0).length
  );
  const bevPercentage = Math.round(
    (data.filter((v) => v.type === "Battery Electric Vehicle (BEV)").length /
      totalEVs) *
      100
  );
  const phevPercentage = Math.round(
    (data.filter((v) => v.type === "Plug-in Hybrid Electric Vehicle (PHEV)")
      .length /
      totalEVs) *
      100
  );

  return (
    <>
      <div
        className={`min-h-screen w-full bg-gradient-to-br from-gray-900  via-gray-800 to-gray-900 p-4 text-white`}
      >
        <div className=" w-full mx-auto px-48 py-8">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              EV Analytics Dashboard
            </h1>
            <p className="text-gray-400">
              Comprehensive analysis of electric vehicle adoption
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Status Cards */}
            <StatsCard
              title="Total EVs"
              value={totalEVs}
              change="+12.5% from last month"
              trend="up"
              icon={<Car />}
            />
            <StatsCard
              title="Average Range"
              value={`${avgRange} mi`}
              change="+5% from last year"
              icon={<Battery />}
            />
            <StatsCard
              title="BEV Percentage"
              value={`${bevPercentage}%`}
              change="Leading vehicle type"
              trend="up"
              icon={<Zap />}
            />
            <StatsCard
              title="PHEV Percentage"
              value={`${phevPercentage}%`}
              trend="down"
              change="Vehicle type"
              icon={<Plug />}
            />
            <StatsCard
              title="Avg. MSRP"
              value="$52,450"
              change="-2% from last quarter"
              trend="up"
              icon={<DollarSign />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <DashboardCard
              title="Vehicle Distribution Chart By Type & Year"
              className="lg:col-span-2"
              chartType="Stacked Bar Chart"
              description="Below Stacked Bar Chart Visualize the distribution of Battery Electric Vehicles (BEV) vs. Plug-in Hybrid Electric Vehicles (PHEV) over the years from (1998 to 2024). This shows trends in EV type preference and growth over time."
            >
              <VehicleDistributionChart data={vehicleDistributionChartData} />
            </DashboardCard>
            <DashboardCard
              title="Electric Vehicle Distribution by Manufacturer"
              chartType="Pie/Donat Chart"
              description="Below Pie Chart Visualize the market share of different manufacturers. Brands market share within the EV market."
            >
              <VehicalDistributionPieChart
                data={vehicleDistributionPieChartData}
              />
            </DashboardCard>

            <DashboardCard
              title="Average Base MSRP by Vehicle Type and Model Year"
              chartType="Line Chart"
              description="Below Line Chart Visualize how the base MSRP varies by EV type over different model years. This provides insights into how the cost of EVs is changing over time."
            >
              <VehicleMSRPLineChart data={vehicleMSRPLineChartData} />
            </DashboardCard>
            <DashboardCard
              title="Electric Utility Providers and EV Population"
              chartType="Horizontal Bar Chart"
              className="lg:col-span-2"
              description="Below Horizontal Bar Chart Visualize the number of EVs associated with each electric utility provider. This helps understand the distribution of EVs infrastructure needs."
            >
              <VehicleElectricUsageBarChart
                data={vehicleElectricUsageBarChartData}
              />
            </DashboardCard>
            <DashboardCard
              title="Legislative Districts with High EV Density"
              chartType="Bar Chart"
              className="lg:col-span-2"
              description="Below Bar Chart Visualize the legislative districts with higher numbers of registered EVs. This helps in regional policies and infrastructure planning."
            >
              <VehicleDistrictAreaBarChart
                data={vehicleDistrictAreaBarChartData}
              />
            </DashboardCard>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
