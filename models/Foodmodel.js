const mongoose = require("mongoose");
const { promises } = require("nodemailer/lib/xoauth2");
const slugify = require("slugify");
// const User = require("./usermodel");

const Foodschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A Food must have a name"],
      unique: true,
      // trim: true,
      maxlength: [
        40,
        "A Food name must have length less or equal then 40 characters",
      ],
    },
    slug: String,
    rating: {
      type: Number,
      default: 50,
    },

    price: {
      type: Number,
      required: [true, "A tour must have a price"],
      // unique: true,
    },
    previous_Price: {
      type: Number,
    },
    image: {
      type: String,
    },
    stock: {
      type: String,
      default: "Add To Cart",
      
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
Foodschema.index({ price: 1, ratingsAverage: -1 });
Foodschema.index({ slug: 1 });
Foodschema.index({ startLocation: "2dsphere" });

Foodschema.virtual("durationweeks").get(function () {
  return this.duration / 7;
});

Foodschema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

Foodschema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Foodschema.pre(/^find/, function (next) {
//   this.populate({
//     path: "guides",
//     select: "-__v -passwordChangeAt",
//   });

//   next();
// });

// Foodschema.pre("save", async function (next) {
//   const guidesPromise = this.guides.map(async (id) => await User.findById(id));

//   this.guides = await Promise.all(guidesPromise);

//   next();
// });

// Foodschema.pre("save", function (next) {
//   console.log('will save docmonent.....');
//   next();
// });

// Foodschema.post("save", function (doc,next) {
//   console.log(doc);
//   next();
// });

// Foodschema.pre("find", function (next) {
Foodschema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

Foodschema.post(/^find/, function (doc, next) {
  console.log(`query took ${Date.now() - this.start}milliseconds!`);
  // console.log(doc);
  next();
});

// Foodschema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });
const Food = mongoose.model("Food", Foodschema);

module.exports = Food;
// Hamburger.
// Cheeseburger.
// Sandwich.
// Milkshake.
// Muffin.
// Burrito.
// Taco.
// Hot dog.
