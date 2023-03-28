const express = require("express");
const router = express.Router();
const UPDATE_CONTROLLER = require("../controllers/update_controller");

router.put("/:id", UPDATE_CONTROLLER.updateBuddy);

module.exports = router;
