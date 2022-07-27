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

// 食材の削除
app.post("/api/delete/foodList", (req, res) => {
  const id = req.body.id;
  const sql = "DELETE FROM foodlist WHERE foodId=?";
  connections.query(sql, id, (err, result) => {
    if (err) {
      throw err;
    }
    console.log(result);
    res.send("Delete Date!");
  });
});

// 献立の取得
app.get("/api/get/menuList", (req, res) => {
  const sqlSelect = "SELECT * FROM menulist";
  connections.query(sqlSelect, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// 献立の登録
app.post("/api/post/menuList", (req, res) => {
  const menuId = req.body.menuId;
  const name = req.body.name;
  const sqlInsert = "INSERT INTO menulist SET ?";
  connections.query(
    sqlInsert,
    {
      menuId: menuId,
      name: name,
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

// 食事とメニューidを登録
app.post("/api/post/meal_menu", (req, res) => {
  const mealId = req.body.mealId;
  const menuId = req.body.menuId;
  const sqlInsert = "INSERT INTO meal_menu SET ?";
  connections.query(
    sqlInsert,
    {
      mealId: mealId,
      menuId: menuId,
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

// 献立と食材idを登録
app.post("/api/post/menu_food", (req, res) => {
  const foodId = req.body.foodId;
  const menuId = req.body.menuId;
  const sqlInsert = "INSERT INTO menu_food SET ?";
  connections.query(
    sqlInsert,
    {
      menuId: menuId,
      foodId: foodId,
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

// 食事の取得
app.get("/api/get/meal", (req, res) => {
  const sqlSelect = "SELECT * FROM meallist";
  connections.query(sqlSelect, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// 食事の登録
app.post("/api/post/mealList", (req, res) => {
  const mealId = req.body.mealId;
  const date = req.body.date;
  const meal = req.body.meal;
  const sqlInsert = "INSERT INTO meallist SET ?";
  connections.query(
    sqlInsert,
    {
      mealId: mealId,
      date: date,
      meal: meal,
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

// 日付からその日の食事を取得
app.post("/api/post/targetMeal", (req, res) => {
  const date = req.body.date;
  const sqlSelect = "SELECT * FROM meallist WHERE date = ?";
  connections.query(sqlSelect, [date], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// 食事からメニューを取得
app.post("/api/post/targetMenu", (req, res) => {
  const mealId = req.body.mealId;
  const sqlSelect = "SELECT * FROM meal_menu WHERE mealId = ?";
  connections.query(sqlSelect, [mealId], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// メニューidからメニュー詳細を取得
app.post("/api/post/targetMenuDetail", (req, res) => {
  const menuId = req.body.menuId;
  const sqlSelect = "SELECT * FROM menulist WHERE menuId = ?";
  connections.query(sqlSelect, [menuId], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
