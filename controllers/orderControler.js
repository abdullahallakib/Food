const multer = require("multer");
const sharp = require("sharp");
const { match } = require("assert");
const { json } = require("express");
const fs = require("fs");
const { Query, Promise } = require("mongoose");
const { resourceUsage } = require("process");
const order = require("../models/Ordermodel");
const catchAsync = require("../utilits/catchAsync");
const APIFeature = require("../utilits/apiFeatures");
const AppError = require("../utilits/appError");
const factory = require("./handlerFactor");
const { execSync } = require("child_process");
// console.log(tours.length);
// console.log(tours);
// exports.chakeID = (req, res, next, val) => {
//   console.log(`tour id is:${val}`);
//   next();
// };

// exports.chakebody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'missing name or price'
//     });
//   }
//   next();
// };

// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new AppError("Not an image! Please upload only images.", 400));
//   }
// };

// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadRecipeImages = upload.fields([
//   { name: "imageCover", maxCount: 1 },
//   { name: "images", maxCount: 3 },
// ]);

// exports.resizeRecipeImages = catchAsync(async (req, res, next) => {
//   // || !req.files.images
//   if (!req.files.imageCover || !req.files.images) return next();

//   req.body.imageCover = `tour-${req.params.id}-${Date.now()}-cover.jpeg`;
//   await sharp(req.files.imageCover[0].buffer)
//     .resize(2000, 1333)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(`public/img/tours/${req.body.imageCover}`);

//   req.body.images = [];

//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `tour-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

//       await sharp(file.buffer)
//         .resize(2000, 1333)
//         .toFormat("jpeg")
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/tours/${filename}`);
//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

// exports.aliasTopRecipes = async (req, res, next) => {
//   req.query.limit = 5;
//   req.query.sort = "-ratingsAverage,price";
//   req.query.fields = "name,price,ratingsAverage,summary,difficalty";
//   next();
// };

// // exports.postour = (req, res) => {
// //   res.status(201).json({
// //     status: 'success',
// //     data: {
// //       tour: newtour
// //     }
// //   });
// // };

// exports.getRecipeStats = catchAsync(async (req, res, next) => {
//   const stats = await Food.aggregate([
//     {
//       $match: { ratingsAverage: { $gte: 4.5 } },
//     },
//     {
//       $group: {
//         _id: { $toUpper: "$difficulty" },
//         numRecipes: { $sum: 1 },
//         numRatings: { $sum: "$ratingsQuantity" },
//         avaRateing: { $avg: "$ratingsAverage" },
//         avgPrice: { $avg: "$price" },
//         minPrice: { $min: "$price" },
//         maxPrice: { $max: "$price" },
//       },
//     },
//     {
//       $sort: { avgPrice: 1 },
//     },
//     // {
//     //   $match: { _id: { $ne: "EASY" } },
//     // },
//   ]);

//   res.status(200).json({
//     status: "success",
//     data: {
//       stats,
//     },
//   });
// });

// exports.getMonthlyplan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1;

//   const plan = await Food.aggregate([
//     {
//       $unwind: "$startDates",
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: "$startDates" },
//         numRecipeStarts: { $sum: 1 },
//         tours: { $push: "$name" },
//       },
//     },
//     {
//       $addFields: { month: "$_id" },
//     },
//     {
//       $project: {
//         _id: 0,
//       },
//     },
//     {
//       $sort: { numRecipeStarts: -1 },
//     },
//     {
//       $limit: 12,
//     },
//   ]);
//   res.status(200).json({
//     status: "success",
//     data: {
//       plan,
//     },
//   });
// });

exports.getorder = factory.getOne(order, { path: "reviews" });
exports.getallorder = factory.getAll(order);
exports.createorder = factory.createOne(order);
exports.updateorder = factory.updateOne(order);
exports.deleteorder = factory.deleteOne(order);