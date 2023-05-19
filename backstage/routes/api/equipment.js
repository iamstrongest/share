const express = require("express");

const router = express.Router();

const db = require("../../utils/db/index.js");
// 体育器材操作-----------------------------------------------------------------------------------------------

// 展示所有分类
const getTypes = router.get("/types", (req, res) => {
  db.query("select type from equipment", (err, rows) => {
    let types = [...new Set(rows.map((row) => row.type))];
    res.send({
      data: types,
    });
  });
});

// 展示某分类下的器材，默认加载4个
const getData = router.get("/type", (req, res) => {
  const type = req.query.type;
  const number = 4;
  db.query(`select * from equipment where type='${type}'`, (err, rows) => {
    res.send({
      data: rows,
    });
  });
});

// 展示搜索，模糊查询
const search = router.get("/search", (req, res) => {
  let name = req.query.name;
  db.query(
    `select * from equipment where name like '%${name}%'`,
    (err, rows) => {
      res.send({
        code: rows.length > 0 ? 0 : 1,
        data: rows,
        message: rows.length > 0 ? "搜索成功" : "暂无内容",
      });
    }
  );
});

// 随机推荐
const randomList = router.get("/random", (req, res) => {
  let page = req.query.page;
  // 一次展示4条数据;
  let number = 4;
  db.query(`select * from equipment`, (err, rows) => {
    res.send({
      code: 0,
      length: rows.length,
      data: rows.slice((page - 1) * number, page * number),
    });
  });
});

module.exports = {
  getTypes,
  getData,
  search,
  randomList,
};
