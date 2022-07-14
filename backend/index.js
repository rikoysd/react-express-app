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
app.get("/api/get/foodList", (req, res) => {
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
app.post("/api/post/foodList", (req, res) => {
  const foodId = req.body.id;
  const name = req.body.name;
  const purchaseDate = req.body.purchaseDate;
  const qSelect = req.body.qSelect;
  const quantity = req.body.quantity;
  const bestBefore = req.body.bestBefore;
  const sqlInsert = "INSERT INTO foodlist SET ?";
  connections.query(
    sqlInsert,
    {
      foodId: foodId,
      name: name,
      purchaseDate: purchaseDate,
      qSelect: qSelect,
      quantity: quantity,
      bestBefore: bestBefore,
    },
    (err, result) => {
      if (err) {
        throw err;
      }
      console.log(result);
      res.send("Received POST Data!");
    }
  );
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
