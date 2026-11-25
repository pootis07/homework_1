const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

let tips = [
  { id: 1, text: "Read the full recipe before you start." },
  { id: 2, text: "Prepare and measure your ingredients first." },
  { id: 3, text: "Keep your cooking area clean and organized." },
  { id: 4, text: "Taste your food before serving." },
  { id: 5, text: "Clean as you cook to make the final cleanup easier." },
  { id: 6, text: "Use a sharp knife and a stable cutting board." }
];

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/api/tips", (req, res) => {
  res.json(tips);
});

app.get("/api/tips/:id", (req, res) => {
  const tip = tips.find((item) => item.id === Number(req.params.id));
  if (!tip) return res.status(404).json({ error: "Tip not found" });
  res.json(tip);
});

app.post("/api/tips", (req, res) => {
  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  if (!text) return res.status(400).json({ error: "Tip text is required" });

  const nextId = tips.length ? Math.max(...tips.map((tip) => tip.id)) + 1 : 1;
  const tip = { id: nextId, text };
  tips.push(tip);
  res.status(201).json(tip);
});

app.put("/api/tips/:id", (req, res) => {
  const tip = tips.find((item) => item.id === Number(req.params.id));
  if (!tip) return res.status(404).json({ error: "Tip not found" });

  const text = typeof req.body.text === "string" ? req.body.text.trim() : "";
  if (!text) return res.status(400).json({ error: "Tip text is required" });

  tip.text = text;
  res.json(tip);
});

app.delete("/api/tips/:id", (req, res) => {
  const id = Number(req.params.id);
  const exists = tips.some((tip) => tip.id === id);
  if (!exists) return res.status(404).json({ error: "Tip not found" });

  tips = tips.filter((tip) => tip.id !== id);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
