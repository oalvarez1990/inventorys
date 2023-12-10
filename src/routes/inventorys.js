const express = require("express");
const { getAllInventorys } = require("../controllers/inventorys.Controllers");

const InventorysRouter = express.Router();
// 
InventorysRouter.get("/", getAllInventorys);
//
module.exports = InventorysRouter;
