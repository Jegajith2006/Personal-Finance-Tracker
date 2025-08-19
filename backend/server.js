const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/finance', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log("MongoDB connection error:", err));

// Transaction Schema
const transactionSchema = new mongoose.Schema({
  amount: Number,
  category: String,
  type: String
});

const Transaction = mongoose.model("Transaction", transactionSchema);

// Routes
app.get("/transactions", async (req, res) => {
  const transactions = await Transaction.find();
  res.json(transactions);
});

app.post("/transactions", async (req, res) => {
  const newTransaction = await Transaction.create(req.body);
  res.json(newTransaction);
});

app.put("/transactions/:id", async (req, res) => {
  const updated = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

app.delete("/transactions/:id", async (req, res) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});




// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
