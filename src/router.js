const express = require("express");
const ejs = require("ejs");
const path = require("path");
const models = require("./models");

const router = express.Router();

const productControllers = require("./controllers/productControllers");
const categoryControllers = require("./controllers/categoryControllers");

router.get("/", productControllers.home);

router.get("/products", productControllers.browse);
router.get("/products/:id", productControllers.read);
router.put("/products/:id", productControllers.edit);
router.post("/products", productControllers.add);
router.delete("/products/:id", productControllers.destroy);

router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

module.exports = router;
