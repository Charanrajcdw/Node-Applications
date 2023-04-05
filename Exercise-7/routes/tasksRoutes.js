const express = require("express");
const router = express.Router();
const TASK_CONTROLLERS = require("../controllers/tasksControllers");

router.get("/:id", TASK_CONTROLLERS.readTask);

router.get("/", TASK_CONTROLLERS.readAllTasks);

router.post("/", TASK_CONTROLLERS.addTask);

router.put("/:id", TASK_CONTROLLERS.updateTask);

router.delete("/:id", TASK_CONTROLLERS.deleteTask);

module.exports = router;
