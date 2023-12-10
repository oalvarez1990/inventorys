const express = require("express");
const {
  getBrands,
  createBrands,
  updateBrands,
  deleteBrands
} = require("../controllers/brands.Controllers");

const BrandsRouter = express.Router();

BrandsRouter.get("/", getBrands);
// 
BrandsRouter.post("/", createBrands);
//
BrandsRouter.put("/:id", updateBrands);
//
BrandsRouter.delete("/:id", deleteBrands);

module.exports = BrandsRouter;
