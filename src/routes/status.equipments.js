const express = require("express");
const {
  getStatusEquipment,
  createStatusEquipment,
  updateStatusEquipment,
  deleteStatusEquipment
} = require("../controllers/status_equipment.Controllers");

const StatusEquipmentrouter = express.Router();

StatusEquipmentrouter.get("/", getStatusEquipment);
//
StatusEquipmentrouter.post("/", createStatusEquipment);
//
StatusEquipmentrouter.put("/:id", updateStatusEquipment);
//
StatusEquipmentrouter.delete("/:id", deleteStatusEquipment);

module.exports = StatusEquipmentrouter;
