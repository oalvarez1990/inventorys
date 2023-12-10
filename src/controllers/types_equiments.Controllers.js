const catchError = require("../utils/catchError");
const Types_equiments = require("../models/types_equiments");
const validator = require("validator");

// get all type equipaments
const getAllTypeEquipament = catchError(async (req, res) => {
  const types_equiments = await Types_equiments.find();
  res.status(200).json(types_equiments);
});

// Create type_equipaments
const createTypeEquipament = catchError(async (req, res) => {
  const { name, status, date_create } = req.body;
  // Validate name
  if (!validator.isLength(name, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The name must be between 1 and 50 characters",
    });
  }
  // Validate status is active or inactive
  if (!validator.isIn(req.body.status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      message: "The status must be active or inactive",
    });
  }

  // Create
  const newTypeEquipament = new Types_equiments({
    name,
    status,
    date_create,
  });
  await newTypeEquipament.save();
  res.status(201).json({
    message: "Type equipament created successfully",
    newTypeEquipament,
  });
});
// Update type_equipaments
const updateTypeEquipament = catchError(async (req, res) => {
  const { id } = req.params;
  const { name, status, date_create } = req.body;
  // Validate name
  if (!validator.isLength(name, { min: 1, max: 50 })) {
    return res.status(400).json({
      message: "The name must be between 1 and 50 characters",
    });
  }
  // Validate status is active or inactive
  if (!validator.isIn(req.body.status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      message: "The status must be active or inactive",
    });
  }
  
  // Update
  const typeEquipament = await Types_equiments.findByIdAndUpdate(
    id,
    { name, status, date_create },
    { new: true }
  );
  res.status(200).json({
    message: "Type equipament updated successfully",
    typeEquipament,
  });
});

// Delete type_equipaments
const deleteTypeEquipament = catchError(async (req, res) => {
  const { id } = req.params;
  // Delete
  await Types_equiments.findByIdAndDelete(id);
  res.status(200).json({
    message: "Type equipament deleted successfully",
  });
});

module.exports = {
  getAllTypeEquipament,
  createTypeEquipament,
  updateTypeEquipament,
  deleteTypeEquipament,
};
