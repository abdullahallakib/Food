const express = require("express");
const { router } = require("../app");
const orderControler = require("../controllers/orderControler");
const authcontroller = require("../controllers/authControler");
const reviewControl = require("../controllers/reviewControl");
const reviewRouter = require("./reviewRouter");
const order = require("../models/Ordermodel");

const Router = express.Router();

Router.route("/").get(orderControler.getallorder);
Router.route("/").post(orderControler.createorder);
Router.route("/").post(orderControler.createorder);
Router.route("/").delete(orderControler.deleteorder);
Router.route("/").patch(orderControler.updateorder);

module.exports = Router;
