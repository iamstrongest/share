const express = require("express");
const router = express.Router(); //路由
const db = require("../../utils/db/index.js");
const jwt = require("jsonwebtoken"); //验证token
const multer = require("multer"); //解析上传的文件
const Core = require("@alicloud/pop-core"); //阿里云发送手机验证码

const { sendMails } = require("../../utils/emails/index.js");
const { getRandom } = require("../../utils/random/index.js");
var { expressjwt: expressJWT } = require("express-jwt");
const path = require("path");
const fs = require("fs");
const secretKey = "strongest ^0^";
express().use(expressJWT({ secret: secretKey, algorithms: ["HS256"] })); //加密算法

// 连接musql数据库

// 关于用户-----------------------------------------------------------------------------------------------
// 用户登录,更新token或者生成token

//测试邮件
let mailId; //收件人的邮箱账号
////先查询数据库有没有该邮箱，有的话返回提示已经被注册过了，否者发送验证码
const sendEmail = router.post("/send/email", function (req, res) {
  db.query("SELECT email FROM user", function (err, result) {
    if (err) return console.log(err.message);
    const emails = result.filter((item) => item.email == req.body.email);
    if (emails.length == 0) {
      mailId = req.body.email;
      const number = 6; //定义6位验证码
      VerificationCode = getRandom(number); //默认四位验证码，自己可以自定义验证码
      sendMails(mailId, VerificationCode).then((res) => {
        // console.log(res, '返回的数据');
        if (res.response == "250 OK: queued as.") {
          //如果发送成功执行的操作
          console.log("发送成功了，收件人是：" + res.accepted); //是个数组
        } else {
          //发送失败执行的操作
          console.log("发送失败了，错误为：" + res.rejected); //也是个数组
        }
      });
      res.send({
        code: 0,
        message: "发送成功",
      });
    } else {
      res.send({
        code: 1,
        message: "邮箱已被注册,请更换邮箱",
      });
    }
  });
});

// 邮箱注册/绑定
const userRegistyEmail = router.post(
  "/register/email",
  async function (req, res) {
    console.log(req.body.phone);
    if (req.body.verificationCode == VerificationCode) {
      const data = await new Promise((resolve, reject) => {
        db.query(
          `select * from user where  phone=${req.body.phone}`,
          (err, result) => {
            if (result.length == 0) {
              res.send({
                message: "查无手机号",
              });
            } else {
              result[0].email != undefined
                ? res.send({
                    message: "该用户已绑定邮箱",
                  })
                : resolve(result);
            }
          }
        );
      });
      if (data.length > 0) {
        const sql = `update user set email='${mailId}' where phone=${req.body.phone}`;
        console.log(req.body.phone);
        db.query(sql, function (err, result) {
          if (err) return console.log(err.message);
          if (result.affectedRows !== 0) {
            res.send({
              message: `添加邮箱成功`,
            });
          }
        });
      }
    }
  }
);
// 手机号发送验证码
const userSendPhone = router.post("/send/phone", async function (req, res) {
  let VerificationCode; //验证码
  const data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT phone FROM user where phone=${req.body.phone}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows);
      }
    );
  });
  if (data.length > 0) {
    res.send({ message: `注册失败,该手机号已被注册` });
  } else {
    let isDelete;
    const ans = await new Promise((resolve, reject) => {
      db.query(
        `SELECT phone FROM verifiy where phone=${req.body.phone}`,
        (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows);
        }
      );
    });
    if (ans.length > 0) {
      const ans = await new Promise((resolve, reject) => {
        db.query(
          `delete  from verifiy where phone=${req.body.phone}`,
          (err, rows) => {
            if (err) return console.log(err.message);
            resolve(rows);
          }
        );
      });
      if (ans.affectedRows > 0) {
        isDelete = true;
        console.log("已经删除原有的验证码");
      }
    }
    VerificationCode = getRandom(6);
    var client = new Core({
      accessKeyId: "LTAI5t74MKMnyrKasddads", //自己阿里云的accessKeyId(此accessKeyId仅供参考)
      accessKeySecret: "aoA6R9pgOixjLBMm2GXaGbs123asfdvG", //自己阿里云的accessKeySecret(此accessKeySecret仅供参考)
      endpoint: "https://dysmsapi.aliyuncs.com",
      apiVersion: "2017-05-25",
    });

    var params = {
      SignName: "Messages", //自己阿里云发送信息的模板(此模板仅供参考)
      TemplateCode: "SMS_269070138",
      PhoneNumbers: `${req.body.phone}`,
      TemplateParam: `{"code":${VerificationCode}}`,
    };

    var requestOption = {
      method: "POST",
      formatParams: false,
    };
    try {
      const response = await client.request("SendSms", params, requestOption);
      if (response.Code === "OK") {
        const sql = `insert into verifiy(phone,code) VALUES(${req.body.phone},'${VerificationCode}')`;
        const ans = await new Promise((resolve, reject) => {
          db.query(sql, function (err, result) {
            if (err) return console.log(err.message);
            resolve(result);
          });
        });
        if (ans.affectedRows > 0) {
          setTimeout(async () => {
            const ans = await new Promise((resolve, reject) => {
              db.query(
                `delete  from verifiy where phone=${req.body.phone}`,
                (err, rows) => {
                  if (err) return console.log(err.message);
                  console.log(rows);
                  resolve(rows);
                }
              );
            });
            if (ans.affectedRows > 0) {
              console.log("删除成功");
            }
          }, 1000 * 60 * 5);
          res.send({
            code: "200",
            message: "发送成功,请勿重复发送",
          });
        }
      } else {
        res.send({
          code: "400",
          message: "发送失败",
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  }
});
// 找回密码
const userFindPwd = router.post("/find/pwd", async function (req, res) {
  const data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT password FROM user where email='${req.body.email}' and phone=${req.body.phone}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows);
      }
    );
  });
  res.send({
    message:
      data.length > 0 ? `您的密码为${data[0].password}` : "邮箱或手机号不存在",
  });
});
// 修改密码
const userChangePwd = router.post("/change/pwd", async function (req, res) {
  const data = await new Promise((resolve, reject) => {
    db.query(
      `SELECT password FROM user where email='${req.body.email}' and phone=${req.body.phone}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        resolve(rows);
      }
    );
  });
  if (data.length > 0) {
    const message = await new Promise((resolve, reject) => {
      db.query(
        `update  user set  password=${req.body.password} where phone=${req.body.phone}`,
        (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows.affectedRows > 0 ? "修改成功" : "修改失败");
        }
      );
    });
    res.send({
      message,
    });
  } else {
    res.send({
      message: "账号或邮箱不存在",
    });
  }
});

const userRegisterPhone = router.post(
  "/register/phone",
  async function (req, res) {
    const ans = await new Promise((resolve, reject) => {
      db.query(
        `SELECT phone FROM verifiy where phone=${req.body.phone} and code=${req.body.verificationCode}`,
        (err, rows) => {
          if (err) return console.log(err.message);
          resolve(rows);
        }
      );
    });
    if (ans.length > 0) {
      const sql = `insert into user(phone,password) VALUES(${req.body.phone},'${req.body.password}')`;
      db.query(sql, function (err, result) {
        if (err) return console.log(err.message);
        if (result.affectedRows !== 0) {
          res.send({
            message: `注册成功`,
          });
        }
      });
    } else {
      res.send({
        message: `验证码错误或者已过期`,
      });
    }
  }
);
// 用户登录
const userLogin = router.post("/login", (req, res) => {
  let phone = req.body.phone;
  let password = req.body.password;
  // token还没有确认
  db.query(
    `SELECT * FROM user where phone=${phone} and password='${password}'`,
    (err, rows) => {
      if (err) return console.log(err.message);
      if (rows.length > 0) {
        if (rows[0].credit < 60) {
          res.send({
            code: 400,
            message: "该用户信誉分过低,请找管理员进行解冻",
          });
        } else {
          const tokenStr = jwt.sign({ phone: phone }, secretKey, {
            expiresIn: "10d",
          });
          delete rows[0].password;
          delete rows[0].email;
          db.query(
            `update  user  set token ='${tokenStr}' where phone = ${phone};`,
            (err, result) => {
              if (err) return console.log(err.message);
              result.affectedRows > 0
                ? res.send({
                    code: 0,
                    token: tokenStr,
                    message: "登录成功",
                    data: rows[0],
                  })
                : res.send({
                    code: 0,
                    message: "更新异常",
                  });
            }
          );
        }
      } else {
        res.send({
          code: 1,
          message: "账号或密码错误",
        });
      }
    }
  );
});
// 获取用户信息
const userData = router.get("/get", (req, res) => {
  let id = req.query.id;
  db.query(`SELECT * FROM user where id=${id}`, (err, rows) => {
    if (err) return console.log(err.message);
    if (rows.length > 0) {
      delete rows[0].password;
      delete rows[0].email;
      res.send({
        data: rows[0],
      });
    }
  });
});
// token校验本地是否过期
const userValidate = router.post("/validate", (req, res) => {
  // 应该加密id的，因为手机号码需要可以解除绑定
  let phone = req.body.phone;
  const tokenStr = jwt.sign({ phone: phone }, secretKey, {
    expiresIn: "10d",
  });
  let token = req.headers.authorization; //我们会把token放到我们自己设置的http的头authorization中，在这里可以直接拿到
  jwt.verify(token, secretKey, (err, decode) => {
    //验证token
    if (err) {
      return res.json({
        code: 401,
        data: "token失效了",
      });
    } else {
      // token合法  在这里，需要把token的时效延长，
      //总不能我们看着突然让我们重新登录，token过期的意思是，你在这之间不进行任何操作才会过期
      // 更新用户存储的token,刷新个人信息
      db.query(
        `UPDATE user  SET token = '${tokenStr}' WHERE phone = ${phone};`,
        (err, rows) => {
          if (err) return console.log(err.message);
          db.query(
            `select * from user  WHERE phone = ${phone}`,
            (err, results) => {
              rows.affectedRows > 0
                ? res.json({
                    code: 200,
                    token: tokenStr,
                    message: "更新token成功",
                    data: results[0],
                  })
                : res.send({
                    code: 0,
                    message: "更新异常",
                  });
            }
          );
        }
      );
    }
  });
});
// 修改昵称
const userChangeNickname = router.put("/change/name", (req, res) => {
  const username = req.body.username;
  const id = req.body.id;
  db.query(
    `update user set username='${username}' where id=${id}`,
    (err, rows) => {
      if (err) return console.log(err.message);
      res.send({
        code: rows.affectedRows > 0 ? 0 : 1,
        message: rows.affectedRows > 0 ? "修改成功" : "修改失败",
      });
    }
  );
});
// 修改个性签名
const userChangeDescription = router.put("/change/description", (req, res) => {
  const description = req.body.description;
  const id = req.body.id;
  db.query(
    `update user set description='${description}' where id=${id}`,
    (err, rows) => {
      if (err) return console.log(err.message);
      res.send({
        code: rows.affectedRows > 0 ? 0 : 1,
        message: rows.affectedRows > 0 ? "修改成功" : "修改失败",
      });
    }
  );
});
//原始上传过来的文件资源存放地
const upload = multer({ dest: path.resolve(__dirname, "../../tmp/") }); //会在此目录下生成一个二进制文件，可以直接给img元素赋值
// 修改头像
const userChangeImage = router.post(
  "/upload/image",
  upload.single("file"),
  (req, res) => {
    let tmp = req.file.path; //获取临时资源文件名，也可以直接赋值给img元素src这个属性
    console.log(tmp);
    let newName = Date.now() + req.file.originalname;
    /**
     * originalname是自己上传文件的名字
     * 我们想要给用户上传的图片重新命名
     * 用Date.now()拼接originalname,防止重名
     */
    // http://192.168.137.1:3000/为手机和电脑通一个热点
    // 服务器启动时暴露给外界可访问的资源路径
    //远程服务器地址(自己服务器)
    // let publicPath = "http://47.110.123.6:3003/" + "public/images/" + newName;
    //与手机处于同一个热点专用(Windows系统cmd下输入ipconfig可查看)
    // let publicPath = "http://192.168.137.1:3000/" + "public/images/" + newName;
    //浏览器专用
    let publicPath = "http://127.0.0.1:3003/" + "public/images/" + newName;
    //给图片设置存放目录  提前给当前文件夹下建立一个images文件夹  ！！！！
    let newPath =
      path.resolve(__dirname, "../../public/images") + "/" + newName;
    //  同步执行读取临时生成的buffer文件
    let fileData = fs.readFileSync(tmp); //将上传到服务器上的临时资源 读取到 一个变量里面
    //  同步生成新的文件
    fs.writeFileSync(newPath, fileData); //重新书写图片文件  写入到指定的文件夹下
    //  同步删除临时储存的文件;
    fs.unlinkSync(path.join(__dirname, `../../tmp/${req.file.filename}`));
    // 异步操作，将用户的头像路径存储起来
    db.query(
      `update user set imageUrl='${publicPath}' where id=${req.body.id}`,
      (err, rows) => {
        if (err) return console.log(err.message);
        res.send({
          code: rows.affectedRows > 0 ? 0 : 1,
          message: rows.affectedRows > 0 ? "头像修改成功" : "修改失败",
        });
      }
    );
  }
);
const userOauthLogins = router.post("/oauth", (req, res) => {});
module.exports = {
  userLogin,
  userValidate,
  sendEmail,
  userRegistyEmail,
  userSendPhone,
  userRegisterPhone,
  userFindPwd,
  userChangePwd,
  userData,
  userChangeImage,
  userChangeNickname,
  userChangeDescription,
  userOauthLogins,
};
