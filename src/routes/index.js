const express = require("express");
const router = express.Router();

const TypeEquipamentRoutes = require("./TypeEquipament");
const BrandsRouter = require("./brands");
const Usersrouter = require('./users')
const StatusEquipmentrouter = require("./status.equipments");
const InventorysRouter = require("./inventorys");
// auth
const Authrouter = require('./auth')


// colocar las rutas aquí
router.use("/typeEquipament", TypeEquipamentRoutes);
router.use("/brands", BrandsRouter);
router.use("/users", Usersrouter);
router.use("/statusEquipment", StatusEquipmentrouter);
router.use("/inventorys", InventorysRouter);
// auth
router.use("/auth", Authrouter);



module.exports = router;
