const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use("/public", express.static("./public"));
//使用生成在tmp下的二进制图片
// app.use("/public", express.static("./tmp"));
app.use(express.json({ extended: true, limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(
  bodyParser.urlencoded({
    extended: false, // 为true时将使用qs库处理数据，通常不需要
  })
);
// 配置跨越请求
const cors = require("cors");

app.use(cors());

const router = require("./routes/index.js");

app.use("/api", router);
app.listen(3003, function () {
  console.log("http://127.0.0.1:3003 为您服务");
});
