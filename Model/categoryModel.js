  const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true
    },
    // ربط المنتجات بالفئة
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  { timestamps: true }
);

// عند التحويل لـ JSON أو Object أظهر الـ virtuals
categorySchema.set("toObject", { virtuals: true });
categorySchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Category", categorySchema);
