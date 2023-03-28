const express = require("express");
const router = express.Router();
const READ_CONTROLLER = require("../controllers/read_controller");

router.get("/:id", READ_CONTROLLER.readBuddy);

router.get("/", READ_CONTROLLER.readAllBuddies);

module.exports = router;
