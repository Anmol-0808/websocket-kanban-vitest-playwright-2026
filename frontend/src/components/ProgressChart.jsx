import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

function ProgressChart({ tasks }) {
  const todo = tasks.filter((t) => t.status === "todo").length;
  const inProgress = tasks.filter((t) => t.status === "in-progress").length;
  const done = tasks.filter((t) => t.status === "done").length;

  const total = tasks.length;
  const completion = total === 0 ? 0 : Math.round((done / total) * 100);

  const data = [
    { name: "Todo", value: todo, color: "#ef4444" },         // red
    { name: "Progress", value: inProgress, color: "#ffd600" }, // yellow
    { name: "Completed", value: done, color: "#22c55e" },      // green
  ];

  return (
    <div className="progress-card">
      <h3>Progress</h3>
      <p className="completion-text">{completion}% done</p>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={data}>
            <XAxis hide />
            <YAxis hide />
            <Bar dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProgressChart;
