const express = require("express");

const router = express.Router();

const message = require("./api/message");
const equipment = require("./api/equipment");
const person = require("./api/person");
const order = require("./api/order");
const cart = require("./api/cart");
const allApi = [];
allApi.push(
  ...Object.values(message),
  ...Object.values(equipment),
  ...Object.values(person),
  ...Object.values(order),
  ...Object.values(cart)
);
allApi.forEach((element) => {
  router.use("", element);
});
module.exports = router;
