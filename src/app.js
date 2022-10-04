const express = require("express");
const path = require("path");
const router = require("./router");

const app = express();
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(express.json());

// API routes
app.use(router);

// ready to export
module.exports = app;
