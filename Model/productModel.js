 const mongoose = require("mongoose");

// Counter Schema
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 195 } // يبدأ من 195
});

const Counter = mongoose.model("Counter", counterSchema);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be at most 100 characters"]
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [1000, "Description must be at most 1000 characters"]
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [1, "Price must be greater than 0"]
    },
    discountPercentage: {
      type: Number,
       
      min: [0, "Discount cannot be less than 0"],
      max: [100, "Discount cannot exceed 100"]
    },
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [0, "Rating cannot be less than 0"],
      max: [5, "Rating cannot exceed 5"]
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"]
    },
    brand: {
      type: String,
      trim: true,
      default: null
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"]
    },
    thumbnail: {
      type: String,
      required: [true, "Thumbnail is required"]
    },
    images: {
      type: [String],
      required: [true, "At least one image is required"],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "Images array cannot be empty"
      }
    }
  },
  { timestamps: true },
  
);

// Middleware لتوليد id متزايد يبدأ من 195
productSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "productId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;

    // تحديث الفئة وإضافة المنتج ليها
    await mongoose.model("Category").findByIdAndUpdate(this.category, {
      $push: { products: this._id }
    });
  }
  next();
});

module.exports = mongoose.model("Product", productSchema);
