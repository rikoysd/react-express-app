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

// ユーザー一覧を取得
app.get("/api/get/user", (req, res) => {
  const sqlSelect = "SELECT * FROM user";
  connections.query(sqlSelect, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// ユーザーを登録する
app.post("/api/post/user", (req, res) => {
  const userId = req.body.userId;
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const sqlInsert = "INSERT INTO user SET ?";
  connections.query(
    sqlInsert,
    {
      userId: userId,
      mailAddress: mailAddress,
      password: password,
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

// ユーザーidと食材idを登録
app.post("/api/post/user_food", (req, res) => {
  const userId = req.body.userId;
  const foodId = req.body.foodId;
  const sqlInsert = "INSERT INTO user_food SET ?";
  connections.query(
    sqlInsert,
    {
      userId: userId,
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

// 日付から食事一覧を取得
app.post("/api/post/mealListByDate", (req, res) => {
  const date = req.body.date;
  const sqlSelect =
    "SELECT meal_menu.mealId, meallist.date, meallist.meal, menulist.name from meallist LEFT OUTER JOIN meal_menu ON meallist.mealId = meal_menu.mealId LEFT OUTER JOIN menulist ON meal_menu.menuId = menulist.menuId WHERE meallist.date = ? ORDER BY meal_menu.mealId;";
  connections.query(sqlSelect, [date], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// メールアドレスとパスワードからユーザー情報を取得
app.post("/api/post/userById", (req, res) => {
  const mailAddress = req.body.mailAddress;
  const password = req.body.password;
  const sqlSelect = "SELECT * FROM user WHERE mailAddress = ? AND password = ?";
  connections.query(sqlSelect, [mailAddress, password], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// ユーザーidから食材一覧を取得
app.post("/api/post/foodListById", (req, res) => {
  const userId = req.body.userId;
  const sqlSelect =
    "SELECT * FROM user_food LEFT OUTER JOIN foodlist ON user_food.foodId = foodlist.foodId WHERE user_food.userId = ?";
    connections.query(sqlSelect,[userId],(err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
