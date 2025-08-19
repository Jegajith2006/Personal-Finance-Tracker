import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TransactionProvider } from "./context/TransactionContext";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transactions";

function App() {
  return (
    <TransactionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Router>
    </TransactionProvider>
  );
}

export default App;
