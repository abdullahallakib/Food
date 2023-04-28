const express = require("express");
const viewControler = require("./../controllers/viewsController");
const Router = express.Router();
const authcontroller = require("./../controllers/authControler");
const bookingController = require("../controllers/bookingsControler");
Router.get("/signup", viewControler.signup);
Router.get("/paymentGateway", viewControler.paymentGateway);
Router.get("/about", authcontroller.isLoggedIn, viewControler.getAbout);
Router.get("/checkout", authcontroller.protect, viewControler.getCheckout);

Router.get(
  "/",
  bookingController.createBookingCheckout,
  authcontroller.isLoggedIn,
  viewControler.getoverview
);

Router.get("/tour/:slug", authcontroller.isLoggedIn, viewControler.getTour);
Router.get("/login", authcontroller.isLoggedIn, viewControler.getLoginFrom);
Router.get("/me", authcontroller.protect, viewControler.getAccount);
Router.get("/my-tours", authcontroller.protect, viewControler.getMyTours);

Router.post(
  "/submit-user-data",
  authcontroller.protect,
  viewControler.updateUserData
);

module.exports = Router;
