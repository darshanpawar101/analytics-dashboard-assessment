import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div key={label} className="glass-card p-4 rounded-lg bg-gray-800">
        <p className="text-sm font-medium text-gray-300 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <>
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
            <p
              key={`info-${index}`}
              className="text-sm"
              style={{ color: entry.color }}
            >
              {entry.dataKey} Count:{" "}
              {entry.dataKey === "BEV"
                ? entry.payload.BEVcount
                : entry.payload.PHEVcount}
            </p>
          </>
        ))}
      </div>
    );
  }
  return null;
};

export const VehicleMSRPLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={600}>
      <LineChart data={data}>
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
        <Line
          type="monotone"
          dataKey="BEV"
          name="Battery Electric (BEV)"
          stroke="#8884d8"
        />
        <Line
          type="monotone"
          dataKey="PHEV"
          name="Plug-in Hybrid Electric (PHEV)"
          stroke="#82ca9d"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
