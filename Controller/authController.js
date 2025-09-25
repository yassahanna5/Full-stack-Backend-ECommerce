const User = require("../Model/authModel");
const jwt = require("jsonwebtoken");

// Function to generate token
function generateToken(user) {
  // payload
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET, // secret
    {
      expiresIn: "300h",
    } // token expiry (300 hours)
  );
}

// Register new user => add new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already in use" });

    // salt + hash handled automatically in model
    const user = await User.create({ name, email, password });

    // Generate token after successful registration
    const token = generateToken(user);

    res.status(201).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Login => with user email and password
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate token after successful login
    const token = generateToken(user);

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

// Protected profile
const profile = async (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
};

module.exports = { register, login, profile };
