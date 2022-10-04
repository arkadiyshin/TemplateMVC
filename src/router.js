const express = require("express");
const ejs = require("ejs");
const path = require("path");
const models = require("./models");

const router = express.Router();

const productControllers = require("./controllers/productControllers");

router.get("/", async (req, res) => {
  const html = await ejs.renderFile(
    path.join(__dirname, "./views/pages/index.ejs"),
    { models }, { async: true });
  res.send(html);
});

router.get("/products", productControllers.browse);
router.get("/products/:id", productControllers.read);
router.put("/products/:id", productControllers.edit);
router.post("/products", productControllers.add);
router.delete("/products/:id", productControllers.destroy);

module.exports = router;
