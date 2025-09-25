 /*const express = require("express");
const { register, login, profile } = require("../Controller/authController");
const authenticate = require("../middleware/auth");

const router = express.Router();

//api للعرض في صفحة html
router.post("/api/register", register);
router.post("/api/login", login);
router.get("/profile", authenticate, profile);

module.exports = router; */













const express = require("express");
const { register, login, profile } = require("../Controller/authController");
const authenticate = require("../middleware/auth");
const passport = require("../middleware/googleAuth");

const router = express.Router();

// مسارات المصادقة الأساسية
router.post("/register", register);
router.post("/login", login);
router.get("/profile", authenticate, profile);

// مسارات Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // إعادة التوجيه للـ Frontend مع بيانات المستخدم
    const user = req.user;
    // يمكنك استخدام JWT هنا إذا كنت تريد token أكثر أماناً
    const token = "google-auth-token"; // استبدل هذا ب token حقيقي
    res.redirect(
      `http://localhost:5173/google-login?token=${token}&id=${user.id}&name=${user.name}&email=${user.email}`
    );
  }
);

module.exports = router;

































/*const express = require("express");
const router = express.Router();
const passport = require("../middleware/googleAuth");

// Start Google login
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback after Google login
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // إعادة التوجيه للـ Frontend مع بيانات المستخدم
    const user = req.user;
    const token = "dummy-token"; // يمكنك توليد JWT إذا أردت
    res.redirect(
      `http://localhost:5173/google-login?token=${token}&id=${user.id}&name=${user.name}&email=${user.email}`
    );
  }
);

module.exports = router;*/

