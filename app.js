/*const express = require("express");
const app = express();
const file = "./products.json";
const fs = require("fs");

app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log("app middleware");
  next();
});

// read products
function getproducts() {
  const data = fs.readFileSync(file, "utf8");
  return JSON.parse(data || "[]");
}

// save products
function saveproducts(products) {
  fs.writeFileSync(file, JSON.stringify(products, null, 2));
}

// create new product
app.post("/products", (req, res) => {
  const products = getproducts();

  const name = req.body.name;
  const price = parseFloat(req.body.price);

  if (!name || isNaN(price)) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  const newproduct = {
    id: products.length + 1,
    name,
    price,
  };

  products.push(newproduct);
  saveproducts(products);

  res.status(201).json(newproduct);
});

// get all products
app.get("/products", (req, res) => {
  const products = getproducts();
  res.json(products);
});

// get product by id
app.get("/products/:id", (req, res) => {
  const products = getproducts();
  const product = products.find((p) => p.id == req.params.id);
  product ? res.json(product) : res.status(404).send("product not found");
});

// delete product by id
app.delete("/products/:id", (req, res) => {
  let products = getproducts();
  products = products.filter((p) => p.id != req.params.id);
  saveproducts(products);
  res.send("prod deleted");
});

// update by put => replace content
app.put("/products/:id", (req, res) => {
  let products = getproducts();
  const id = parseInt(req.params.id);

  const name = req.body.name;
  const price = parseFloat(req.body.price);

  if (!name || isNaN(price)) {
    return res.status(400).json({ error: "Invalid product data" });
  }

  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).send("product not found");
  }

  products[index] = { id, name, price };
  saveproducts(products);

  res.json(products[index]);
});

// update by patch => update part
app.patch("/products/:id", (req, res) => {
  let products = getproducts();
  const id = parseInt(req.params.id);

  const product = products.find((p) => p.id === id);
  if (!product) {
    return res.status(404).send("product not found");
  }

  if (req.body.name !== undefined) {
    product.name = req.body.name;
  }
  if (req.body.price !== undefined) {
    const price = parseFloat(req.body.price);
    if (isNaN(price)) {
      return res.status(400).json({ error: "Invalid price" });
    }
    product.price = price;
  }

  saveproducts(products);
  res.json(product);
});

app.listen(7000, () => {
  console.log("server running on port 7000");
});*/

//Day3
/*const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const authRouter = require("./routes/authRoute");

app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const cors = require("cors");
app.use(cors());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error(err));

app.use(productRouter);
app.use(categoryRouter);
app.use(authRouter);

// للاستخدام والعرض ك API  في صفحات html (frontend عاما)

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`app listen on port ${PORT}`);
});*/























/*const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const authRouter = require("./routes/authRoute");
const paypalRouter = require("./routes/paypalRoute"); // ⬅️ الجديد

app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const cors = require("cors");
app.use(cors());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error('MongoDB connection error:', err));

// المسارات
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter);
app.use("/api/paypal", paypalRouter); // ⬅️ الجديد

// route أساسي للتحقق من أن الخادم يعمل
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running successfully",
    timestamp: new Date().toISOString()
  });
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// route for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});*/













/*const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const authRouter = require("./routes/authRoute");
const paypalRouter = require("./routes/paypalRoute");
const session = require("express-session");
const passport = require("passport");

app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const cors = require("cors");
app.use(cors());

// إعداد الجلسات
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// تهيئة Passport
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error('MongoDB connection error:', err));

// المسارات
/*app.use("/api", authRouter); 
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
 app.use("/api/auth", authRouter); 
app.use("/api/paypal", paypalRouter);

// route أساسي للتحقق من أن الخادم يعمل
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running successfully",
    timestamp: new Date().toISOString()
  });
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// route for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});*/










 const express = require("express");
const app = express();
const mongoose = require("mongoose");
const productRouter = require("./routes/productRoute");
const categoryRouter = require("./routes/categoryRoute");
const authRouter = require("./routes/authRoute");
const paypalRouter = require("./routes/paypalRoute");
const session = require("express-session");
const passport = require("passport");
const User = require("./Model/authModel"); 

app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
const cors = require("cors");
app.use(cors());

// إعداد الجلسات
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

// تهيئة Passport
app.use(passport.initialize());
app.use(passport.session());

// دالة إنشاء الأدمن
async function createAdminIfNotExists() {
  const adminEmail = "adminEngYassaHanna2030@gmail.com";
  const adminPassword = "adminEngYassaHanna2030";
  const adminName = "Admin Eng Yassa Hanna";

  const adminExists = await User.findOne({ email: adminEmail });
  if (!adminExists) {
    await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: "admin"
    });
    console.log("Admin user created!");
  } else {
    console.log("Admin user already exists.");
  }
}

mongoose
  .connect(MONGO_URL)
  .then(async () => {
    console.log("MongoDB connected successfully");
    await createAdminIfNotExists();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// المسارات
app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/auth", authRouter); 
app.use("/api/paypal", paypalRouter);

// route أساسي للتحقق من أن الخادم يعمل
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "OK", 
    message: "Server is running successfully",
    timestamp: new Date().toISOString()
  });
});

// معالجة الأخطاء
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// route for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});