import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TransactionContext = createContext();
export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/transactions")
      .then(res => setTransactions(res.data))
      .catch(err => console.log(err));
  }, []);

  const addTransaction = async (t) => {
    const res = await axios.post("http://localhost:5000/transactions", t);
    setTransactions([...transactions, res.data]);
  };

  const deleteTransaction = async (id) => {
    await axios.delete(`http://localhost:5000/transactions/${id}`);
    setTransactions(transactions.filter(t => t._id !== id));
  };

  const updateTransaction = async (id, updatedData) => {
    const res = await axios.put(`http://localhost:5000/transactions/${id}`, updatedData);
    setTransactions(transactions.map(t => (t._id === id ? res.data : t)));
  };

  return (
   <TransactionContext.Provider
  value={{ transactions, addTransaction, updateTransaction, deleteTransaction }}
>
  {children}
</TransactionContext.Provider>

  );
};
