const mongoose = require("mongoose");
const { promises } = require("nodemailer/lib/xoauth2");
const slugify = require("slugify");
// const User = require("./usermodel");

const Recipechema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      // trim: true,
      maxlength: [
        40,
        "A tour name must have length less or equal then 40 characters",
      ],
    },
    slug: String,
    mealTags: {
      type: String,
      required: [true, "A meal must have a mealTags"],
    },
    calories: {
      type: Number,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      set: (val) => Math.round(val * 10) / 10,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    rating: {
      type: Number,
      default: 4.5,
    },

    price: {
      type: Number,
      required: [true, "A tour must have a price"],
      // unique: true,
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: "Discout price ({VAlUE} should be below regular price)",
      },
    },
    imageCover: {
      type: String,
      required: [true, "a meal must have a cove image"],
    },
    images: [String],

    guides: [{ type: mongoose.Schema.ObjectId, ref: "User" }],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
Recipechema.index({ price: 1, ratingsAverage: -1 });
Recipechema.index({ slug: 1 });
Recipechema.index({ startLocation: "2dsphere" });

Recipechema.virtual("durationweeks").get(function () {
  return this.duration / 7;
});

Recipechema.virtual("reviews", {
  ref: "Review",
  foreignField: "tour",
  localField: "_id",
});

Recipechema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

Recipechema.pre(/^find/, function (next) {
  this.populate({
    path: "guides",
    select: "-__v -passwordChangeAt",
  });

  next();
});

// Recipechema.pre("save", async function (next) {
//   const guidesPromise = this.guides.map(async (id) => await User.findById(id));

//   this.guides = await Promise.all(guidesPromise);

//   next();
// });

// Recipechema.pre("save", function (next) {
//   console.log('will save docmonent.....');
//   next();
// });

// Recipechema.post("save", function (doc,next) {
//   console.log(doc);
//   next();
// });

// Recipechema.pre("find", function (next) {
Recipechema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

Recipechema.post(/^find/, function (doc, next) {
  console.log(`query took ${Date.now() - this.start}milliseconds!`);
  // console.log(doc);
  next();
});

// Recipechema.pre("aggregate", function (next) {
//   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
//   console.log(this.pipeline());
//   next();
// });
const Recipe = mongoose.model("Recipe", Recipechema);

module.exports = Recipe;
