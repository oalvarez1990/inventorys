const express = require("express");
const {
  getAllInventorys,
  createInventory,
  updateInventory,
  deleteInventory
} = require("../controllers/inventorys.Controllers");

const InventorysRouter = express.Router();
//
InventorysRouter.get("/", getAllInventorys);
//
InventorysRouter.post("/", createInventory);
//
InventorysRouter.put("/:id", updateInventory);
//
InventorysRouter.delete("/:id", deleteInventory);
module.exports = InventorysRouter;
