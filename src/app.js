const express = require("express");
const router = require("./router");

const app = express();
app.use(express.json());

// API routes
app.use(router);

// ready to export
module.exports = app;
