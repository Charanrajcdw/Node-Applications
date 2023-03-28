const express = require("express");
const router = express.Router();
const CREATE_CONTROLLER = require("../controllers/create_controller");

router.post("/", CREATE_CONTROLLER.addBuddy);

module.exports = router;
