const express = require("express");
const router = express.Router();

const TypeEquipamentRoutes = require("./TypeEquipament");
const BrandsRouter = require("./brands");
const Usersrouter = require('./users')
const StatusEquipmentrouter = require("./status.equipments");
const InventorysRouter = require("./inventorys");



// colocar las rutas aquí
router.use("/typeEquipament", TypeEquipamentRoutes);
router.use("/brands", BrandsRouter);
router.use("/users", Usersrouter);
router.use("/statusEquipment", StatusEquipmentrouter);
router.use("/inventorys", InventorysRouter);



module.exports = router;
