const mysql = require("mysql");
// 连接musql数据库
const db = mysql.createPool({
  host: "127.0.0.1",
  user: "root", //自己mysql的账号(此账号仅供参考)
  password: "123456", //自己mysql的密码(此密码仅供参考)
  port: "3306",
  // 连接数据库
  database: "share",
});

module.exports = db;
