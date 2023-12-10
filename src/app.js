const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const router = require("./routes/index");
const errorHandler = require("./utils/errorHandler");
require("dotenv").config();

// Esta es nuestra aplicación
const app = express();

// Middlewares
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.use(cors());

// Rutas
app.use("/api/v1", router);
// Error Handler
app.use(errorHandler);

module.exports = app;
