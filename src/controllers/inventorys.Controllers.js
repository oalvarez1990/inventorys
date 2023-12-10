const catchError = require("../utils/catchError");
const Inventorys = require("../models/inventorys");
const TypesEquiments = require("../models/types_equiments");
const Brands = require("../models/brands");
const StatusEquiments = require("../models/status_equiments");
const Users = require("../models/users");
const validator = require ('validator')

// serial,model,description,color,date_purchase,price,type_equiment,brand,status_equiment,user
// Get all Inventory
getAllInventorys = catchError(async (req, res, next) => {
  const inventorys = await Inventorys.find();
  res.status(200).json({
    status: "successfully",
    results: inventorys.length,
    data: {
      inventorys,
    },
  });
});
exports.module = {
    getAllInventorys
}