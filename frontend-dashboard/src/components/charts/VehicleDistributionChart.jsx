import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-lg bg-gray-800">
        <p className="text-sm font-medium text-gray-300 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const VehicleDistributionChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          dataKey="year"
          stroke="#94A3B8"
          tick={{ fill: "#94A3B8" }}
          tickLine={{ stroke: "#94A3B8" }}
        />
        <YAxis
          stroke="#94A3B8"
          tick={{ fill: "#94A3B8" }}
          tickLine={{ stroke: "#94A3B8" }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            color: "#94A3B8",
          }}
        />
        <Bar
          dataKey="BEV"
          name="Battery Electric (BEV)"
          fill="url(#bevGradient)"
          stackId={"vehicle"}
        />
        <Bar
          dataKey="PHEV"
          name="Plug-in Hybrid (PHEV)"
          fill="url(#phevGradient)"
          stackId={"vehicle"}
        />
        <defs>
          <linearGradient id="bevGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#34D399" stopOpacity={0.3} />
          </linearGradient>
          <linearGradient id="phevGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.3} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};
