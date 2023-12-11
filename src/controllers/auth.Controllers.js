const catchError = require("../utils/catchError");
const Users = require("../models/users");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyJWT = require("../utils/verifyJWT");

// the customer send email and password for authenticate
const login = catchError(async (req, res) => {
  // the customer send email and password for authenticate
  const login = catchError(async (req, res) => {
    const { email, password } = req.body;

    // validate the input
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email" });
    }

    if (!validator.isStrongPassword(password)) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // compare the password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // generate the token
    const token = jwt.sign({ user }, process.env.TOKEN_SECRET, {
      expiresIn: "5m",
    });

    // assign the user to the request object
    req.user = user;

    // return the response
    return res.json({ user, token });
  });
});
// the customer send email, password and name for register
const register = catchError(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate name
  if (!validator.isLength(name, { min: 3, max: 50 })) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be between 3 and 50 characters",
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Email is not valid",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new Users({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Send token
  res.status(200).json({
    status: "success",
    data: { token },
  });
});
// the customer can update his profile
const updateProfile = catchError(async (req, res) => {
  const { name, email, password } = req.body;

  // Validate name
  if (!validator.isLength(name, { min: 3, max: 50 })) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be between 3 and 50 characters",
    });
  }

  // Validate email
  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Email is not valid",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user
  const user = await Users.findByIdAndUpdate(
    req.user.id,
    {
      name,
      email,
      password: hashedPassword,
    },
    { new: true }
  );

  // Create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  // Send token
  res.status(200).json({
    status: "success",
    data: { token },
  });
});
// the customer can delete his profile
const deleteProfile = catchError(async (req, res) => {
  await Users.findByIdAndDelete(req.user.id);

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = { login, register, updateProfile, deleteProfile };
