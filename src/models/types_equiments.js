const mongoose = require("mongoose");
const { Schema } = mongoose;

const typesEquimentsSchema = new Schema({
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

const typesEquiments = mongoose.model("typesEquiments", typesEquimentsSchema);
module.exports = typesEquiments;
