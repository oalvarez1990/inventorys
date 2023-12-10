const mongoose = require("mongoose");
const { Schema } = mongoose;

const statusEquimentsSchema = new Schema({
  name: { type: String, required: true },
  status: {
    type: String,
    enum: ["Activo", "Inactivo"],
    default: "Activo",
    required: true,
  },
  date_create: { type: Date, default: Date.now },
  date_update: { type: Date, default: Date.now },
});

const statusEquiments = mongoose.model(
  "statusEquiments",
  statusEquimentsSchema
);
module.exports = statusEquiments;
