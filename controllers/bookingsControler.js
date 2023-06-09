const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Tour = require("./../models/tourModel");
const Booking = require("./../models/bookingModel");
const catchAsync = require("./../utilits/catchAsync");
const AppError = require("../utilits/appError");
const factory = require("./handlerFactor");

// exports.getCheckoutSession = catchAsync(async (res, req, next) => {
//
//   const tour = await Tour.findById(req.params.id);
//   console.log(tour);
//   req.params.id;
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     success_url: `${req.protocol}://${req.get("host")}/`,
//     cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourid,
//     line_items: [
//       {
//         name: `${tour.name} Tour`,
//         description: tour.summary,
//         images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
//         amount: tour.price * 100,
//         currency: "usd",
//         quantity: 1,
//       },
//     ],
//   });

//   res.status(200).json({
//     status: "success",
//     session,
//   });
// });

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently booked tour
//   const tour = await Tour.findById(req.params.tourId);
//   console.log(tour);

//   // 2) Create checkout session
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     success_url: `${req.protocol}://${req.get("host")}/`,
//     cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//     client_reference_id: req.params.tourId,
//     line_items: [
//       {
//         quantity: 1,
//         price_data: {
//           currency: "inr",
//           unit_amount: tour.price * 100,
//           product_data: {
//             description: tour.summary,
//             name: `${tour.name} Tour`,
//             images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
//           },
//         },
//       },
//     ],
//   });

//   // 3) Create session as response
//   res.status(200).json({
//     status: "success",
//     session,
//   });
// });

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // const { items, email } = req.body;
//   const tour = await Tour.findById(req.params.tourId);
//   console.log(tour);

//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],

//     line_items: [
//       {
//         quantity: 1,
//         price_data: {
//           currency: "inr",
//           unit_amount: tour.price * 100,
//           product_data: {
//             description: tour.summary,
//             name: `${tour.name} Tour`,
//             images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
//           },
//         },
//       },
//     ],
//     mode: "payment",
//     success_url: `${req.protocol}://${req.get("host")}/`,
//     cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
//     customer_email: req.user.email,
//   });

//   res.status(200).json({
//     status: "success",
//     session,
//   });
// });

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {
//   // 1) Get the currently booked tour
//   // const tour = await Tour.findById(req.params.tourId);
//   const price = await req.params.totalprice;
//   console.log(
//     "🚀 ~ file: bookingsControler.js:110 ~ exports.getCheckoutSession=catchAsync ~ price:",
//     price
//   );
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ["card"],
//     line_items: [
//       {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: "Food",
//             images: ["public/image/gallery/gallery-5.jpg"],
//           },
//           unit_amount: price,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: "payment",
//     success_url: "https://example.com/success",
//     cancel_url: "https://example.com/cancel",
//   });

//   // // 2) Create checkout session
//   // const session = await stripe.checkout.sessions.create({
//   //   payment_method_types: ["card"],

//   //   success_url: `${req.protocol}://${req.get("host")}/?tour=${
//   //     req.params.tourId
//   //   }&user=${req.user.id}&price=${tour.price}`,

//   //   cancel_url: `${req.protocol}://${req.get("host")}/tour/${tour.slug}`,
//   //   customer_email: req.user.email,
//   //   client_reference_id: req.params.tourId,
//   //   line_items: [
//   //     {
//   //       quantity: 1,
//   //       price_data: {
//   //         currency: "inr",
//   //         unit_amount: tour.price * 100,
//   //         product_data: {
//   //           description: tour.summary,
//   //           name: `${tour.name} Tour`,
//   //           images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
//   //         },
//   //       },
//   //     },
//   //   ],
//   //   mode: "payment",
//   // });

//   // 3) Create session as response
//   res.status(200).json({
//     status: "success",
//     session,
//   });
// });

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // Get the price value from the request parameters
  const price = req.params.totalprice;

  // Create a variable to hold the line item data
  const lineItem = {
    price_data: {
      currency: "usd",
      product_data: {
        name: "Food",
        images: ["public/image/gallery/gallery-5.jpg"],
      },
      unit_amount: price * 100,
    },
    quantity: 1,
  };

  // Create the checkout session with the updated price
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [lineItem],
    mode: "payment",
    success_url: "http://localhost:3003",
    cancel_url: "https://example.com/cancel",
  });

  // Send the session ID back to the client
  res.status(200).json({
    status: "success",
    session,
  });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return next();

  await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split("?")[0]);
  next();
});

exports.getAllBooking = factory.getAll(Booking);
exports.createoneBooking = factory.createOne(Booking);
exports.updateOneBooking = factory.updateOne(Booking);
exports.deleteOneBooking = factory.deleteOne(Booking);
exports.getOneBooking = factory.getOne(Booking);
