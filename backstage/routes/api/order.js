const express = require("express");
const db = require("../../utils/db/index.js");
const router = express.Router();

// 创建订单
const createOrder = router.post("/create/order", (req, res) => {
  const { phone, payName, user_id, nums, prices, ids } = req.body;
  const payTime = Date.now();
  const pay_status = 1;
  let idList;
  let numList;
  if (ids.includes("-")) {
    idList = ids.split("-");
  } else {
    idList = [parseInt(ids)];
  }
  if (nums.includes("-")) {
    numList = nums.split("-");
  } else {
    numList = [parseInt(nums)];
  }
  db.query(
    `select * from share.order where user_id=${user_id}`,
    async (err, rows) => {
      if (err) return console.log(err.message);
      // 查看用户是否有订单未结算
      const array = rows.filter((item) => item.pay_status == 1);
      if (array.length == 0) {
        const sql = `insert into share.order(phone, payName, user_id, nums,pay_status,payTime,prices,idList) values(${phone},'${payName}',${user_id},'${nums}',${pay_status},${payTime},'${prices}','${ids}')`;
        db.query(sql, (err, rows) => {
          if (err) return console.log(err.message);
          db.query(
            `select id from share.order where user_id=${user_id} and payTime=${payTime}`,
            async (err, results) => {
              if (err) return console.log(err.message);
              for (let i = 0; i < idList.length; i++) {
                await new Promise((resolve, reject) => {
                  db.query(
                    `SELECT restNum from equipment where id=${idList[i]}`,
                    (err, result) => {
                      db.query(
                        `update equipment set restNum=${
                          result[0].restNum - numList[i]
                        } where id=${idList[i]}`,
                        (err, result) => {
                          if (err) return console.log(err.message);
                          resolve();
                        }
                      );
                    }
                  );
                });
              }
              // 查看用户是否有订单未结算
              res.send({
                code: 0,
                order_id: results[0].id,
                message: "创建订单成功",
              });
            }
          );
        });
      } else {
        // 让用户先结算未确认归还的订单
        res.send({
          code: 1,
          message: "请您先结算未确认归还的订单再进行租借",
        });
      }
    }
  );
});

// 取消创建订单
const cancleOrder = router.post("/cancle/order", (req, res) => {
  const id = req.body.order_id;
  db.query(`select * from share.order where id=${id}`, (err, rows) => {
    if (err) return console.log(err.message);
    // 查看用户是否有订单未结算
    if (rows.length > 0) {
      const sql = `delete from share.order where id=${id}`;
      db.query(sql, (err, rows) => {
        if (err) return console.log(err.message);
        res.send({
          message:
            rows.affectedRows > 0 ? "取消订单支付成功" : "取消订单支付失败",
        });
      });
    }
  });
});

// 传入参数用户id,查询用户历史订单
const userOrder = router.get("/order", (req, res) => {
  const user_id = req.query.user_id;
  db.query(
    `select * from share.order where user_id=${user_id}`,
    (err, rows) => {
      if (err) return console.log(err.message);
      // 2为已确认归还的订单
      const fullPayList = rows.filter((row) => row.pay_status == 2).reverse();
      // 1为未确认归还的订单
      const partPayList = rows.filter((row) => row.pay_status == 1);
      res.send({
        // 已归还，确认完全支付
        fullPayList,
        // 未归还，确认了1小时之内的支付，完成了部分支付
        partPayList,
      });
    }
  );
});
// 结算还没有归还的订单

const returnOrder = router.put("/return/order", (req, res) => {
  const id = parseInt(req.body.id);
  const user_id = parseInt(req.body.user_id);
  const payTime = parseInt(req.body.payTime);
  const prices = req.body.prices;
  const nums = req.body.nums;
  const ids = req.body.idList;
  let idList;
  if (ids.includes("-")) {
    idList = ids.split("-");
  } else {
    idList = [parseInt(ids)];
  }
  // 器材单价集合
  let pricesArr = [];
  // 用于结算更新order表的数量集合
  let numbsArr = [];
  // 用于归还equipment的数量集合
  let numArray = [];
  if (prices.includes("-")) {
    pricesArr = prices.split("-");
    pricesArr = pricesArr.map((i) => +i);
  } else {
    pricesArr = +prices;
  }
  if (nums.includes("-")) {
    numbsArr = nums.split("-");
    numbsArr = numbsArr.map((i) => +i);
    numArray = nums.split("-");
    numArray = numbsArr.map((i) => +i);
  } else {
    numArray = [+nums];
  }
  const returnTime = Date.now();
  const h = parseInt((returnTime - payTime) / 1000 / 3600);
  let allSinglePrices = 0;
  if (typeof numbsArr == "object") {
    numbsArr.forEach((item, index) => {
      allSinglePrices += item * pricesArr[index];
    });
  } else {
    allSinglePrices = pricesArr * numbsArr;
  }

  // 减信用分
  let credit = 0;
  // 加信用分
  // 没超过1小时按1小时计算

  function judgeUseTime(h) {
    let needPay;
    if (h == 0) {
      needPay = allSinglePrices;
    } else {
      needPay = (h + 1) * allSinglePrices;
    }
    return needPay;
  }
  const cost = judgeUseTime(h);
  switch (true) {
    case cost >= 0 && 6 >= cost:
      credit = 5; //使用时间0-6小时加信用分
      break;
    case cost >= 7 && 12 >= cost:
      credit = -5; //超过7-12小时扣5信用分
      break;
    case cost >= 13 && 24 >= cost:
      credit = -10; //超过13-24小时扣15信用分
      break;
    default: //超过24小时扣15信用分
      credit = -20;
      break;
  }
  // 修改订单;
  // 先查询user表,再修改
  db.query(`select * from user where id=${user_id}`, (err, rows) => {
    if (err) return console.log(err.message);
    // 信誉分小于100，进行操作
    if (60 <= rows[0].credit) {
      const sql = `update user set money=?,credit=? where id=?`;
      if (rows[0].money < cost) {
        res.send({
          code: 2,
          message: "余额不足",
        });
      } else {
        db.query(
          sql,
          [
            rows[0].money - cost,
            rows[0].credit < 100 ? rows[0].credit + credit : rows[0].credit,
            user_id,
          ],
          (err, rows) => {
            if (err) return console.log(err.message);
            if (rows.affectedRows > 0) {
              const sql1 = `update share.order set returnTime = ?,pay_status=?,cost = ?  where id=?`;
              db.query(sql1, [returnTime, 2, cost, id], async (err, rows) => {
                for (let i = 0; i < idList.length; i++) {
                  await new Promise((resolve, reject) => {
                    db.query(
                      `SELECT restNum from equipment where id=${idList[i]}`,
                      (err, result) => {
                        db.query(
                          `update equipment set restNum=${
                            result[0].restNum + numArray[i]
                          } where id=${idList[i]}`,
                          (err, result) => {
                            if (err) return console.log(err.message);
                            resolve();
                          }
                        );
                      }
                    );
                  });
                }
                if (rows.affectedRows > 0) {
                  res.send({
                    code: 0,
                    message: "归还成功",
                  });
                }
              });
            }
          }
        );
      }
    } else {
      res.send({
        code: 1,
        message: "信誉分低于60分,请联系管理员",
      });
    }
  });
});
module.exports = {
  createOrder,
  cancleOrder,
  userOrder,
  returnOrder,
};
