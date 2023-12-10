const catchError = require("../utils/catchError");
const Brands = require("../models/brands");
const validator = require("validator");

// Get all brands
const getBrands = catchError(async (req, res) => {
  const brands = await Brands.find();
  res.status(200).json({ brands });
});
// create
const createBrands = catchError(async (req, res) => {
  const { name, status, date_create } = req.body;
  // Validate name
  if (!validator.isLength(name, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The name must be between 1 and 50 characters",
    });
  }
  //   validate status Activo o Inactivo
  if (!validator.isIn(status, ["Activo", "Inactivo"])) {
    return res.status(400).json({ message: "Status is not valid" });
  }
  // Create and send BD
  const newBrands = new Brands({
    name,
    status,
    date_create,
  });
  await newBrands.save();
  res.status(201).json({ message: "Brands created" });
  newBrands;
});

// Update a brand
const updateBrands = catchError(async (req, res) => {
    const { id } = req.params;
    const { name, status } = req.body;
  
    // Validate name
    if (!validator.isLength(name, { min: 1, max: 50 })) {
      return res.status(400).json({
        message: "The name must be between 1 and 50 characters",
      });
    }
  
    // Validate status is either Activo or Inactivo
    if (!validator.isIn(status, ["Activo", "Inactivo"])) {
      return res
        .status(400)
        .json({ message: "The status must be either 'Activo' or 'Inactivo'" });
    }
  
    // Update only the date_update
    const updateObject = { date_update: new Date() };
  
    // Update the brand
    const brands = await Brands.findByIdAndUpdate(id, updateObject, { upsert: false, new: true });
  
    res.status(200).json({ message: "Brands updated", brands });
  });

  // Delete a brand
const deleteBrands = catchError(async (req, res) => {
    const { id } = req.params;
  
    // Delete the brand
    await Brands.findByIdAndDelete(id);
  
    res.status(200).json({ message: "Brands deleted" });
  });
  

module.exports = {
  getBrands,
  createBrands,
  updateBrands,
  deleteBrands
};
