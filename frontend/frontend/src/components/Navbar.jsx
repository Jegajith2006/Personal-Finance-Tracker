import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Finance Tracker</h1>
      <div>
        <Link to="/">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
      </div>
    </nav>
  );
};

export default Navbar;
