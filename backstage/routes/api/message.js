const express = require("express");

const router = express.Router();

const db = require("../../utils/db/index.js");

// 评论区操作-----------------------------------------------------------------------------------------------

// 展示某食物所有楼主级评论
const getLandlord = router.get("/landlord", async (req, res) => {
  // 一次只显示5条
  let number = 5;
  let page = req.query.page;
  let array = [];
  let length = 0;
  array = await new Promise((resolve, reject) => {
    db.query("SELECT * FROM landlord", (err, rows) => {
      length = rows.length;
      resolve(rows.slice((page - 1) * number, page * number));
    });
  });
  // for (let i = 0; i < array.length; i++) {
  //   await new Promise((resolve, reject) => {
  //     db.query(
  //       `SELECT * FROM user where id=${array[i].user_id}`,
  //       (err, rows) => {
  //         if (err) return console.log(err.message);
  //         array[i].username = rows[0].username;
  //         array[i].imageUrl = rows[0].imageUrl;
  //         resolve();
  //       }
  //     );
  //   });
  // }
  for await (el of array) {
    await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user where id=${el.user_id}`, (err, rows) => {
        if (err) return console.log(err.message);
        el.username = 1;
        el.imageUrl = 2;
        el.username = rows[0].username;
        el.imageUrl = rows[0].imageUrl;
        resolve();
      });
    });
  }
  res.send({
    length,
    code: 200,
    data: array,
  });
});
// 展示某楼层下的总数据条数
const getReplyLength = router.get("/getReplyLength", (req, res) => {
  let floor = req.query.floor;

  db.query(`SELECT * FROM reply where floor = ${floor}`, (err, rows) => {
    if (err) return console.log(err.message);
    res.send({
      length: rows.length,
    });
  });
});

// 展示某楼主下的数据
const getReply = router.get("/reply/:floor", async (req, res) => {
  // 一次只显示2条
  let number = 2;
  let floor = req.params.floor;
  let page = req.query.page;
  let data = [];
  let length = 0;
  data = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM reply where floor = ${floor}`, (err, rows) => {
      if (err) return console.log(err.message);
      length = rows.length;
      resolve(rows.slice((page - 1) * number, page * number));
    });
  });
  for await (let el of data) {
    await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user where id=${el.publish_id}`, (err, rows) => {
        if (err) return console.log(err.message);
        el.publish_name = rows[0].username;
        el.imageUrl = rows[0].imageUrl;
        resolve();
      });
    });
    el.reply_name = await new Promise((resolve, reject) => {
      db.query(`SELECT * FROM user where id=${el.reply_id}`, (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows[0].username);
      });
    });
  }
  res.send({
    code: 200,
    length: data.length,
    data: data,
  });
});
// 添加楼主级别的评论
const addLandlord = router.post("/add/landlord", (req, res) => {
  let publish_id = req.body.publish_id;
  let message = req.body.message;
  let time = Date.now();
  const add = [publish_id, message, time];
  const sql = "insert into landlord (user_id,message,time) values(?,?,?)";
  db.query(sql, add, (err, rows) => {
    if (err) return console.log(err.message);
    rows.affectedRows > 0
      ? res.send({
          code: 0,
          message: "发布成功",
        })
      : res.send({
          code: 1,
          message: "发布失败",
        });
  });
});
// 添加回复的评论
const addReply = router.post("/add/reply", (req, res) => {
  let publish_id = req.body.publish_id;
  let reply_id = req.body.reply_id;
  let message = req.body.message;
  let floor = req.body.floor;
  let time = Date.now();
  const add = [floor, publish_id, reply_id, message, time];
  const sql =
    "insert into reply (floor,publish_id,reply_id,message,time) values(?,?,?,?,?)";
  db.query(sql, add, (err, rows) => {
    if (err) return console.log(err.message);
    rows.affectedRows > 0
      ? res.send({
          code: 0,
          message: "回复成功",
        })
      : res.send({
          code: 1,
          message: "回复失败",
        });
  });
});
// 获取楼主点赞的数量
const getLandThumbsLength = router.get("/get/landThumbs", (req, res) => {
  const land_id = req.query.land_id;
  db.query(
    `SELECT * from land_thumbs where land_id=${land_id}`,
    (err, rows) => {
      if (err) return console.log(err.message);
      res.send({
        length: rows.length,
        data: rows.map((row) => row.user_id),
      });
    }
  );
});
// 给楼主点赞/取消点赞
const changeLandThumbs = router.post("/change/landThumbs", async (req, res) => {
  const land_id = req.body.land_id;
  const user_id = req.body.user_id;
  const been_given_id = req.body.been_given_id;
  const length = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * from land_thumbs where land_id=${land_id} and user_id=${user_id}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows.length);
      }
    );
  });
  if (length == 0) {
    const sql = `insert into land_thumbs (land_id,user_id,been_given_id) values(${land_id},${user_id},${been_given_id})`;
    db.query(sql, (err, rows) => {
      if (err) return console.log(err.message);
      rows.affectedRows > 0
        ? res.send({
            code: 0,
            message: "点赞成功",
          })
        : res.send({
            code: 1,
            message: "点赞失败",
          });
    });
  } else {
    const sql = `delete from land_thumbs where land_id=${land_id} and user_id=${user_id}`;
    db.query(sql, (err, rows) => {
      if (err) return console.log(err.message);
      rows.affectedRows > 0
        ? res.send({
            code: 0,
            message: "点赞取消成功",
          })
        : res.send({
            code: 1,
            message: "点赞取消失败",
          });
    });
  }
});
// 获取回复者的点赞的数量,同时返回点赞者的id
const getFollowThumbsLength = router.get("/get/followThumbs", (req, res) => {
  const follow_id = req.query.follow_id;
  db.query(
    `SELECT * from follow_thumbs where follow_id=${follow_id}`,
    (err, rows) => {
      if (err) return console.log(err.message);
      res.send({
        length: rows.length,
        data: rows.map((row) => row.user_id),
      });
    }
  );
});
// 给回复者点赞/取消点赞
const changeFollowThumbs = router.post(
  "/change/followThumbs",
  async (req, res) => {
    const follow_id = req.body.follow_id;
    const user_id = req.body.user_id;
    const been_given_id = req.body.been_given_id;
    const length = await new Promise((resolve, reject) => {
      db.query(
        `SELECT * from follow_thumbs where follow_id=${follow_id} and user_id=${user_id}`,
        (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows.length);
        }
      );
    });
    if (length == 0) {
      const sql = `insert into follow_thumbs (follow_id,user_id,been_given_id) values(${follow_id},${user_id},${been_given_id})`;
      db.query(sql, (err, rows) => {
        if (err) return console.log(err.message);
        rows.affectedRows > 0
          ? res.send({
              code: 0,
              message: "点赞成功",
            })
          : res.send({
              code: 1,
              message: "点赞失败",
            });
      });
    } else {
      const sql = `delete from follow_thumbs where follow_id=${follow_id} and user_id=${user_id}`;
      db.query(sql, (err, rows) => {
        if (err) return console.log(err.message);
        rows.affectedRows > 0
          ? res.send({
              code: 0,
              message: "点赞取消成功",
            })
          : res.send({
              code: 1,
              message: "点赞取消失败",
            });
      });
    }
  }
);
// 获取被点赞的数量,回复数,以及自己的发帖数
const getUserAnother = router.get("/user/another", async (req, res) => {
  const id = req.query.id;
  // 查找自己发帖数量
  const publishLength = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM landlord where user_id=${id}`, (err, rows) => {
      resolve(rows.length);
    });
  });
  const replyLength = await new Promise((resolve, reject) => {
    db.query(`SELECT * FROM reply where reply_id=${id}`, (err, rows) => {
      resolve(rows.length);
    });
  });
  const thumbsLength1 = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM land_thumbs where been_given_id=${id}`,
      (err, rows) => {
        resolve(rows.length);
      }
    );
  });
  const thumbsLength2 = await new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM follow_thumbs where been_given_id=${id}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows.length);
      }
    );
  });
  const thumbsLength = thumbsLength1 + thumbsLength2;
  res.send({
    data: {
      publishLength,
      replyLength,
      thumbsLength,
    },
  });
});
module.exports = {
  getLandlord,
  getReply,
  addLandlord,
  addReply,
  getReplyLength,
  getLandThumbsLength,
  getFollowThumbsLength,
  changeLandThumbs,
  changeFollowThumbs,
  getUserAnother,
};
