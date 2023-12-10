const express = require("express");
const {
  getAllTypeEquipament,
  createTypeEquipament,
  updateTypeEquipament,
  deleteTypeEquipament,
} = require("../controllers/types_equiments.Controllers");

const TypeEquipamentRouter = express.Router();
//
TypeEquipamentRouter.get("/", getAllTypeEquipament);
//
TypeEquipamentRouter.post("/", createTypeEquipament);
//
TypeEquipamentRouter.put("/:id", updateTypeEquipament);
//
TypeEquipamentRouter.delete("/:id", deleteTypeEquipament);
// 
module.exports = TypeEquipamentRouter;
