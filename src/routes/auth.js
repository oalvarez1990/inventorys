const express = require("express");
const {
  login,
  register,
  updateProfile,
  deleteProfile,
} = require("../controllers/auth.Controllers");

const Authrouter = express.Router();

Authrouter.post("/login", login);
Authrouter.post("/register", register);
Authrouter.put("/update-profile", updateProfile);
Authrouter.delete("/delete-profile", deleteProfile);
module.exports = Authrouter;
