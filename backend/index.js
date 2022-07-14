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

// 食材一覧を取得する
app.get("/api/foodList", (req, res) => {
  const sqlSelect = "SELECT * FROM foodlist";
  // query... mysqlにデータを問い合わせるメソッド
  connections.query(sqlSelect, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// 食材を登録する
app.post("/api", (req, res) => {
  console.log(req.body);
  res.send("Received POST Data!");
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
