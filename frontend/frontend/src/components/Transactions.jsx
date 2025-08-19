import React, { useState } from "react";
import { useTransactions } from "../context/TransactionContext";
import "./Transactions.css";

function Transactions() {
  const { transactions, addTransaction, updateTransaction, deleteTransaction } = useTransactions();

  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income");

  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editType, setEditType] = useState("income");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    const finalAmount = type === "expense" ? -Math.abs(Number(amount)) : Number(amount);

    addTransaction({
      amount: finalAmount,
      category,
      type,
    });

    setAmount("");
    setCategory("");
    setType("income");
  };

  const startEdit = (t) => {
    setEditingId(t._id);
    setEditAmount(Math.abs(t.amount));
    setEditCategory(t.category);
    setEditType(t.type);
  };

  const saveEdit = (id) => {
    const updatedAmount = editType === "expense" ? -Math.abs(Number(editAmount)) : Number(editAmount);
    updateTransaction(id, { amount: updatedAmount, category: editCategory, type: editType });
    setEditingId(null);
  };

  return (
    <div className="transactions-container">
      <h2>Add Transaction</h2>
      <form className="transactions-form" onSubmit={handleSubmit}>
        <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add</button>
      </form>

      <h3>Transactions</h3>
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr key={t._id}>
              <td>
                {editingId === t._id ? (
                  <input value={editCategory} onChange={(e) => setEditCategory(e.target.value)} />
                ) : (
                  t.category
                )}
              </td>
              <td className={t.type === "income" ? "income" : "expense"}>
                {editingId === t._id ? (
                  <select value={editType} onChange={(e) => setEditType(e.target.value)}>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                ) : (
                  t.type.charAt(0).toUpperCase() + t.type.slice(1)
                )}
              </td>
              <td className={t.type === "income" ? "income" : "expense"}>
                {editingId === t._id ? <input type="number" value={editAmount} onChange={(e) => setEditAmount(e.target.value)} /> : `₹${Math.abs(t.amount)}`}
              </td>
              <td>
                {editingId === t._id ? (
                  <button className="save-btn" onClick={() => saveEdit(t._id)}>Save</button>
                ) : (
                  <button className="edit-btn" onClick={() => startEdit(t)}>Edit</button>
                )}
                <button className="delete-btn" onClick={() => deleteTransaction(t._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;
