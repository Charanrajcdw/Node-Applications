const express = require("express");
const router = express.Router();
const BUDDY_CONTROLLER = require("../controllers/buddy.controller");

//routes all the /buddy requests to their respective buddy operations

router.get("/:id", BUDDY_CONTROLLER.readBuddy);

router.get("/", BUDDY_CONTROLLER.readAllBuddies);

router.post("/", BUDDY_CONTROLLER.addBuddy);

router.delete("/:id", BUDDY_CONTROLLER.deleteBuddy);

router.put("/:id", BUDDY_CONTROLLER.updateBuddy);

module.exports = router;
