const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandsSchema = new Schema({
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
  
const brands = mongoose.model("brands", brandsSchema);
module.exports = brands;