const express = require("express");
const router = express.Router();
const USER_CONTROLLERS = require("../controllers/userControllers");

router.post("/register", USER_CONTROLLERS.registerUser);

router.post("/login", USER_CONTROLLERS.loginUser);

module.exports = router;
