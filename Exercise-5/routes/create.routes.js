const express = require("express");
const router = express.Router();
const CREATE_CONTROLLER = require("../controllers/create.controller");

router.post("/", CREATE_CONTROLLER.addBuddy);

module.exports = router;
