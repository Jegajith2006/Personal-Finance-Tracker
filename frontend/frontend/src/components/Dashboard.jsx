import React from "react";
import { useTransactions } from "../context/TransactionContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./Dashboard.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { transactions } = useTransactions();

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((a, t) => a + t.amount, 0);

  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((a, t) => a + Math.abs(t.amount), 0);

  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Finance Overview",
        data: [income, expense],
        backgroundColor: ["#28a745", "#dc3545"],
        hoverOffset: 10
      }
    ]
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div className="summary-container">
        <div className="summary-box">
          <h3>Income</h3>
          <p>₹{income}</p>
        </div>
        <div className="summary-box">
          <h3>Expense</h3>
          <p>₹{expense}</p>
        </div>
      </div>

      <h3>Income vs Expense Chart</h3>
      <div className="chart">
      <Pie data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
