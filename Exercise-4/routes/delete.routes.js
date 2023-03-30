const express = require("express");
const router = express.Router();
const DELETE_CONTROLLER = require("../controllers/delete.controller");

router.delete("/:id", DELETE_CONTROLLER.deleteBuddy);

module.exports = router;
