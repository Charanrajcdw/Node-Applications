const express = require("express");
const router = express.Router();
const DELETE_CONTROLLER = require("../controllers/delete_controller");

router.delete("/:id", DELETE_CONTROLLER.deleteBuddy);

module.exports = router;
