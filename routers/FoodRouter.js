const express = require("express");
const { router } = require("../app");
const FoodControl = require("../controllers/FoodControl");
const authcontroller = require("../controllers/authControler");
const reviewControl = require("../controllers/reviewControl");
const reviewRouter = require("./reviewRouter");

const Router = express.Router();

Router.route("/").get(FoodControl.getallFood);
Router.route("/").post(FoodControl.createFood)
Router.route("/").post(FoodControl.createFood)
Router.route("/").delete(FoodControl.deleteFood)
Router.route("/").patch(FoodControl.updateFood)


// // Router
// //   .route("/:tourId/reviews")
// //   .post(
// //     authcontroller.protect,
// //     authcontroller.restrictTO("user"),
// //     reviewControl.createReview
// //   );

// // Router.use("/:tourId/reviews", reviewRouter);
// // Router.route("/tour-stats").get(FoodControl.getRecipeStats);
// // Router.route("/monthly-plan/:year").get(
// //   authcontroller.protect,
// //   authcontroller.restrictTO("admin", "lead-guide", "guide"),
// //   FoodControl.getMonthlyplan
// // );

// // Router.route("/top-5-cheap").get(
// //   FoodControl.aliasTopTours,
// //   FoodControl.getalltours
// // );
// // Router.param('id', FoodControl.chakeID);
// // Router.route("/tours-within/:distance/center/:latlng/unit/:unit").get(
// //   FoodControl.getToursWithin
// // );

// // tours-within/233/center/-40,45/unit/mi
// Router.route("/distances/:latlng/unit/:unit").get(FoodControl.getDistance);
// // .get(FoodControl.getalltours)
// // Router.route("/").post(
// //   authcontroller.protect,
// //   authcontroller.restrictTO("admin", "lead-guide"),
// //   FoodControl.createTour
// // );

// Router.route("/:id")
//   .get(FoodControl.getTour)
//   .patch(
//     authcontroller.protect,
//     authcontroller.restrictTO("admin", "lead-guide"),
//     FoodControl.uploadTourImages,
//     FoodControl.resizeTourImages,
//     FoodControl.updateTour
//   )
//   .delete(
//     authcontroller.protect,
//     authcontroller.restrictTO("admin", "lead-guide"),
//     FoodControl.deleteTour
//   );

module.exports = Router;
// FoodControl.updateTourImages,
// FoodControl.resizeTourImages
