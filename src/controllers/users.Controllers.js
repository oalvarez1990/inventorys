const catchError = require("../utils/catchError");
const Users = require("../models/users");
const validator = require("validator");
const bcrypt = require("bcrypt");

// All get all users
// name, email, status, date_create
const getUsers = catchError(async (req, res) => {
  const users = await Users.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: { users },
  });
});

/// Create users
// name, email, status, date_create and validate name, email, status: Activo or Inactivo,password, password,date_create,date_update
const createUser = catchError(async (req, res) => {
  const { name, email, status, password, date_create, date_update } = req.body;

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

  // Validate status
  if (!validator.isIn(status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      status: "fail",
      message: "Status must be Activo or Inactivo",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = new Users({
    name,
    email,
    status,
    password: hashedPassword,
    date_create: date_create || new Date(),
    date_update: date_update || new Date(),
  });

  await user.save();

  res.status(201).json({
    status: "success",
    data: { user },
  });
});

// Update users
const updateUser = catchError(async (req, res) => {
  const { name, email, status, password } = req.body;

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

  // Validate status
  if (!validator.isIn(status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      status: "fail",
      message: "Status must be Activo or Inactivo",
    });
  }

  // Update object
  const updateObject = {
    name,
    email,
    status,
    date_update: new Date(),
  };

  // Check if password is provided
  if (password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    updateObject.password = hashedPassword;
  }

  // Update the user
  const user = await Users.findByIdAndUpdate(req.params.id, updateObject, {
    upsert: false,
    new: true,
  });

  if (!user) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }

  res.status(200).json({ status: "Update success", data: { user } });
});

// deleteUser
const deleteUser = catchError(async (req, res) => {
  const user = await Users.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "fail", message: "User not found" });
  }
  res.status(204).json({ status: "success", data: null });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
