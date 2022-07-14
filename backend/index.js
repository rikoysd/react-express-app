const express = require("express");
const mysql = require("mysql2");
const app = express();
const port = process.env.port || 3001;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

const connections = mysql.createConnection({
  host: "localhost",
  user: "appuser001",
  password: "app001",
  database: "refrigerator",
});

connections.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("Connected");
});

// 取得
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 送信
app.post("/api", (req, res) => {
  console.log(req.body);
  res.send("Received POST Data!");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
