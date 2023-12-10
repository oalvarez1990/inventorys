const catchError = require("../utils/catchError");
const StatusEquipment = require("../models/status_equiments");
const validator = require("validator");

// All get all status_equipment
const getStatusEquipment = catchError(async (req, res) => {
  const status_equipment = await StatusEquipment.find();
  res.status(200).json({
    status: "success",
    results: status_equipment.length,
    data: { status_equipment },
  });
});

// Create status_equipment
// name, status, date_create and validate name, status: Activo or Inactivo
const createStatusEquipment = catchError(async (req, res) => {
  const { name, status } = req.body;
  // validate name
  if (!validator.isLength(name, { min: 3, max: 50 })) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be between 3 and 50 characters",
    });
  }
  // validate status

  if (!validator.isIn(status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      status: "fail",
      message: "Status must be Activo or Inactivo",
    });
  }
  // create status_equipment
  const status_equipment = new StatusEquipment({
    name,
    status,
  });
  await status_equipment.save();
  res.status(201).json({
    status: "success",
    data: { status_equipment },
  });
});

// Update status_equipment
const updateStatusEquipment = catchError(async (req, res) => {
  const { name, status } = req.body;

  // Validate name
  if (!validator.isLength(name, { min: 3, max: 50 })) {
    return res.status(400).json({
      status: "fail",
      message: "Name must be between 3 and 50 characters",
    });
  }
  // Validate status
  if (!validator.isIn(status, ["Activo", "Inactivo"])) {
    return res.status(400).json({
      status: "fail",
      message: "Status must be Activo or Inactivo",
    });
  }
  // Update all fields at once
  const updateObject = {
    name,
    status,
    date_update: new Date(),
  };
  // Update the status_equipment
  const status_equipment = await StatusEquipment.findByIdAndUpdate(
    req.params.id,
    updateObject,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!status_equipment) {
    return res
      .status(404)
      .json({ status: "fail", message: "Status equipment not found" });
  }
  res.status(200).json({
    status: "Update status equipment successfully",
    data: { status_equipment },
  });
});
// Delete status_equipment
const deleteStatusEquipment = catchError(async (req, res) => {
  const status_equipment = await StatusEquipment.findByIdAndDelete(
    req.params.id
  );
  if (!status_equipment) {
    return res
      .status(404)
      .json({ status: "fail", message: "Status equipment not found or data is empty" });
  }
  res.status(200).json({
    status: "Delete status equipment successfully",
    message: "Data is empty",
    data: null,
  });
});

module.exports = {
  getStatusEquipment,
  createStatusEquipment,
  updateStatusEquipment,
  deleteStatusEquipment,
};
