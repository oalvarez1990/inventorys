const express = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.Controllers");

const Usersrouter = express.Router();
Usersrouter.get("/", getUsers);
//
Usersrouter.post("/", createUser);
//
Usersrouter.put("/:id", updateUser);
//
Usersrouter.delete("/:id", deleteUser);
module.exports = Usersrouter;
