const mongoose = require("mongoose");
const { Schema } = mongoose;

const inventorysSchema = new Schema({
  serial: {
    type: String,
    required: true,
    unique: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },

  date_purchase: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  type_equiment: {
    type: Schema.Types.ObjectId,
    ref: "typesEquiments",
  },
  brand: {
    type: Schema.Types.ObjectId,
    ref: "brands",
  },
  status_equiment: {
    type: Schema.Types.ObjectId,
    ref: "statusEquiments",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
});

const inventorys = mongoose.model("inventorys", inventorysSchema);
module.exports = inventorys;
