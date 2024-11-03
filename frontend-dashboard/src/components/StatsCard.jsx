import React from "react";
import { ArrowUpIcon, ArrowDownIcon, MinusIcon } from "lucide-react";

export function StatsCard({ title, value, change, icon, trend = "neutral" }) {
  const getTrendIcon = () => {
    switch (trend) {
      case "up":
        return <ArrowUpIcon className="w-4 h-4 text-emerald-400" />;
      case "down":
        return <ArrowDownIcon className="w-4 h-4 text-red-400" />;
      default:
        return <MinusIcon className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <div className="glass-card rounded-2xl p-6 animate-in">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900">
          {icon}
        </div>
        {getTrendIcon()}
      </div>
      <p className="text-sm text-gray-400 mb-1">{title}</p>
      <p className="text-3xl font-bold stats-value mb-2">{value}</p>
      {change && <p className="text-sm text-gray-400">{change}</p>}
    </div>
  );
}
