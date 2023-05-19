const express = require("express");
const db = require("../../utils/db/index.js");
const router = express.Router();

// 收藏购物车操作-----------------------------------------------------------------------------------------------
// 获取某人的收藏夹列表
const userCart = router.get("/getCart", async function (req, res) {
  const id = req.query.id;
  const equ_ids = await new Promise((resolve, reject) => {
    db.query(`select * from collect where user_id =${id}`, (err, rows) => {
      resolve(rows.map((row) => row.equ_id));
    });
  });
  const data = [];
  for (let i = 0; i < equ_ids.length; i++) {
    let detail = await new Promise((resolve, reject) => {
      db.query(
        `select * from equipment where id =${equ_ids[i]}`,
        (err, rows) => {
          resolve(rows[0]);
        }
      );
    });
    data.push(detail);
  }
  res.send({
    selectId: equ_ids,
    data: data,
  });
});
// 对器材进行增加或者移除
const changeCart = router.post("/changeCart", async function (req, res) {
  const user_id = req.body.user_id;
  const equ_id = req.body.equ_id;
  const length = await new Promise((resolve, reject) => {
    db.query(
      `select * from collect where user_id =${user_id} and equ_id=${equ_id}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows.length);
      }
    );
  });
  if (length == 0) {
    db.query(
      `insert into collect(user_id,equ_id) values(${user_id},${equ_id})`,
      (err, rows) => {
        if (err) return console.log(err.message);
        res.send({
          code: rows.affectedRows > 0 ? 0 : 1,
          message: rows.affectedRows > 0 ? "添加成功" : "未知错误",
        });
      }
    );
  } else {
    db.query(
      `delete  from collect where user_id =${user_id} and equ_id=${equ_id}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        res.send({
          code: rows.affectedRows > 0 ? 0 : 1,
          message: rows.affectedRows > 0 ? "删除成功" : "未知错误",
        });
      }
    );
  }
});
// 删除收藏夹中的数据
const deleteCartEquipment = router.delete(
  "/delete/cartEquipment",
  async function (req, res) {
    const user_id = req.body.user_id;
    const array =
      typeof req.body.equipments == "string"
        ? JSON.parse(req.body.equipments)
        : req.body.equipments;
    for await (el of array) {
      await new Promise((resolve, reject) => {
        db.query(
          `delete from collect where user_id =${user_id} and equ_id=${el}`,
          (err, rows) => {
            if (err) return console.log(err.message);
            resolve();
          }
        );
      });
    }
    res.send({
      code: 0,
      message: "移除成功",
    });
  }
);
module.exports = {
  userCart,
  changeCart,
  deleteCartEquipment,
};
