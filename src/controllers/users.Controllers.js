const catchError = require("../utils/catchError");
const Users = require("../models/users");
const validator = require("validator");

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
// Create users
// name, email, status, date_create and validate name, email, status: Activo or Inactivo
const createUser = catchError(async (req, res) => {
  const { name, email, status } = req.body;
  // validate name
  if (!validator.isLength(name, { min: 3, max: 50 })) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be between 3 and 50 characters",
    });
  }
  // validate email

  if (!validator.isEmail(email)) {
    return res.status(400).json({
      status: "fail",
      message: "Email is not valid",
    });
  }
  // validate status
  if (!validator.isIn(status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      status: "fail",
      message: "Status must be Activo or Inactivo",
    });
  }
  // create user
  const user = new Users({
    name,
    email,
    status,
  });
  await user.save();
  res.status(201).json({
    status: "success",
    data: { user },
  });
});
// Update users
const updateUser = catchError(async (req, res) => {
  const { name, email, status } = req.body;

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

  // Update all fields at once
  const updateObject = {
    name,
    email,
    status,
    date_update: new Date(),
  };

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
