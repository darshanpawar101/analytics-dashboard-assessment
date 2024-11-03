import {
  ResponsiveContainer,
  Tooltip,
  Legend,
  PieChart,
  Cell,
  Pie,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-4 rounded-lg bg-gray-800">
        <p className="text-sm font-medium text-gray-300">{payload[0].name}</p>
        <p
          className="text-lg font-semibold"
          style={{ color: payload[0].payload.fill }}
        >
          {payload[0].value} vehicles
        </p>
      </div>
    );
  }
  return null;
};

export const VehicalDistributionPieChart = ({ data }) => {
  const COLORS = [
    "#FF6F61",
    "#6FA3EF",
    "#F7C6C7",
    "#F2B84B",
    "#5DD5B2",
    "#FFABAB",
    "#FFE6A1",
    "#A1D4FF",
    "#FFC3A0",
    "#B4E7F8",
  ];

  return (
    <ResponsiveContainer width="100%" height={600}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={120}
          outerRadius={180}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{
            paddingTop: "20px",
            color: "#94A3B8",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
