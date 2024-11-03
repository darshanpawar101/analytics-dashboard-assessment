import {
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Legend,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-lg bg-gray-800">
        {payload.map((entry, index) => (
          <>
            <p className="text-sm font-medium text-gray-300 mb-2">
              {entry.payload.name}
            </p>
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          </>
        ))}
      </div>
    );
  }
  return null;
};

export const VehicleElectricUsageBarChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis
          type="number"
          // dataKey="name"
          stroke="#94A3B8"
          tick={{ fill: "#94A3B8" }}
          tickLine={{ stroke: "#94A3B8" }}
        />
        <YAxis
          type="category"
          dataKey="name"
          hide
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
          dataKey="value"
          name="Electric Usage Count"
          fill="url(#providerGradient)"
        />
        <defs>
          <linearGradient id="providerGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34D399" stopOpacity={0.8} />
            <stop offset="100%" stopColor="#34D399" stopOpacity={0.3} />
          </linearGradient>
        </defs>
      </BarChart>
    </ResponsiveContainer>
  );
};
