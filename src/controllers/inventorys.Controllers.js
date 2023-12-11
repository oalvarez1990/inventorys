const mongoose = require("mongoose");
const catchError = require("../utils/catchError");
const Inventorys = require("../models/inventorys");
const TypesEquiments = require("../models/types_equiments");
const Brands = require("../models/brands");
const StatusEquiments = require("../models/status_equiments");
const Users = require("../models/users");
const validator = require("validator");

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

// Create inventory
const createInventory = catchError(async (req, res) => {
  const {
    serial,
    model,
    description,
    color,
    date_purchase,
    price,
    type_equiment,
    brand,
    status_equiment,
    user,
  } = req.body;

  // validate serial
  if (!validator.isLength(serial, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The serial must be between 1 and 50 characters",
    });
  }
  // validate model
  if (!validator.isLength(model, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The model must be between 1 and 50 characters",
    });
  }
  // validate description
  if (!validator.isLength(description, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The description must be between 1 and 50 characters",
    });
  }
  // validate color
  if (!validator.isLength(color, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The color must be between 1 and 50 characters",
    });
  }
  // validate price only number
  if (!validator.isNumeric(price)) {
    return res.status(400).json({
      message: "The price must be only number",
    });
  }
  // Check if reference IDs exist before creating inventory
  const typeExists = await TypesEquiments.findById(type_equiment);
  const brandExists = await Brands.findById(brand);
  const statusExists = await StatusEquiments.findById(status_equiment);
  const userExists = await Users.findById(user);

  if (!typeExists || !brandExists || !statusExists || !userExists) {
    return res.status(400).json({
      status: "error",
      message: "Some of the related models do not exist.",
    });
  }
  // Create the new inventory
  const newInventory = new Inventorys({
    serial,
    model,
    description,
    color,
    date_purchase,
    price,
    type_equiment,
    brand,
    status_equiment,
    user,
  });

  await newInventory.save();

  res.status(201).json({
    status: "Created inventory successfully",
    data: {
      inventory: newInventory,
    },
  });
});

//Update inventory
const updateInventory = catchError(async (req, res) => {
  const inventoryId = req.params.id;
  const {
    serial,
    model,
    description,
    color,
    date_purchase,
    price,
    type_equiment,
    brand,
    status_equiment,
    user,
  } = req.body;

  // validate
  if (
    !validator.isLength(serial, { min: 1, max: 50 }) ||
    !validator.isLength(model, { min: 1, max: 50 }) ||
    !validator.isLength(description, { min: 1, max: 50 }) ||
    !validator.isLength(color, { min: 1, max: 50 }) ||
    !validator.isNumeric(price)
  ) {
    return res.status(400).json({
      message: "Invalid input data",
    });
  }

  // Check if inventory exists before attempting to update it
  const existingInventory = await Inventorys.findById(inventoryId);

  if (!existingInventory) {
    return res.status(404).json({
      status: "error",
      message: "Inventory not found",
    });
  }

  // Check if reference IDs exist before attempting to update inventory
  const typeExists = await TypesEquiments.findById(type_equiment);
  const brandExists = await Brands.findById(brand);
  const statusExists = await StatusEquiments.findById(status_equiment);
  const userExists = await Users.findById(user);

  if (!typeExists || !brandExists || !statusExists || !userExists) {
    return res.status(400).json({
      status: "error",
      message: "Some of the related models do not exist.",
    });
  }

  // Apply modifications to existing inventory
  existingInventory.serial = serial;
  existingInventory.model = model;
  existingInventory.description = description;
  existingInventory.color = color;
  existingInventory.date_purchase = date_purchase;
  existingInventory.price = price;
  existingInventory.type_equiment = type_equiment;
  existingInventory.brand = brand;
  existingInventory.status_equiment = status_equiment;
  existingInventory.user = user;

  //Update only the date from date_update
  existingInventory.date_update = new Date();

  // Save changes
  await existingInventory.save();

  res.status(200).json({
    status: "Inventory update successfully",
    data: {
      inventory: existingInventory,
    },
  });
});

// Delete id or serial inventory
const deleteInventory = catchError(async (req, res) => {
  const inventoryId = req.params.id;
  const inventorySerial = req.params.serial;

  // Check if inventory exists before attempting to delete it
  const existingInventory = await Inventorys.findById(inventoryId);

  if (!existingInventory) {
    return res.status(404).json({
      status: "error",
      message: "Inventory not found",
    });
  }

  // Delete inventory
  await Inventorys.findByIdAndDelete(inventoryId);

  res.status(200).json({
    status: "Inventory deleted successfully",
    data: null,
  });

  
});

module.exports = {
  getAllInventorys,
  createInventory,
  updateInventory,
  deleteInventory,
};
