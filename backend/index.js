const express = require("express");
const app = express();
const port = process.env.port || 3001;

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
