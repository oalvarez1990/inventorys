const mongoose = require("mongoose");
// const bcrypt = require('bcrypt')
const { Schema } = mongoose;

const usersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo",
    required: true,
  },
  password: { type: String, required: true },
  date_create: { type: Date, default: Date.now },
  date_update: { type: Date, default: Date.now },
});


const users = mongoose.model("users", usersSchema);
module.exports = users;
