import React from "react";

export function DashboardCard({
  title,
  children,
  className = "",
  description,
  chartType = "",
}) {
  return (
    <div className={`glass-card rounded-2xl p-6  ${className}`}>
      <div className="flex items-center justify-between mb-6 flex-col">
        <div className="w-full">
          <h2 className="text-lg font-semibold text-white">{title}</h2>
        </div>
        <div className="w-full mt-2">
          <p className="text-sm font-normal text-white">
            Chart Type - <span className="font-light">{chartType}</span>
          </p>
        </div>
        <div className="w-full mt-2">
          <p className="text-xs font-light text-white">{description}</p>
        </div>
      </div>
      <div className="chart-container">{children}</div>
    </div>
  );
}
