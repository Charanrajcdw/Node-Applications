const TASK_SERVICE = require("../services/tasksServices");
const LOGGER = require("../utils/loggerUtils");
const { verifyToken } = require("../utils/authUtils");

const addTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, Entered add task controller`);
  try {
    const TASK_DATA = req.body;
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.addTaskService(TOKEN_DATA.username, TASK_DATA);
    if (RESPONSE.status) {
      res.status(201);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    }
    delete RESPONSE.status;
    res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to add task!!! Please, login again!!!" });
  }
};

const readTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, Entered read task controller`);
  try {
    const TASK_ID = Number(req.params.id);
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.readTaskService(TOKEN_DATA.username, TASK_ID);
    if (RESPONSE.status) {
      if (RESPONSE.data) {
        res.status(200);
        LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Task read successfully!!!`);
      } else {
        res.status(404);
        RESPONSE.data = "Task not found!!!";
        LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
      }
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    }
    delete RESPONSE.status;
    res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to read task!!! Please, login again!!!" });
  }
};

const readAllTasks = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, Entered read all tasks controller`);
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.readAllTasksService(TOKEN_DATA.username);
    if (RESPONSE.status) {
      res.status(200);
      if (RESPONSE.data.length == 0) RESPONSE.data = "No tasks to display";
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Tasks read successfully!!!`);
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    }
    delete RESPONSE.status;
    res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to read task!!! Please, login again!!!" });
  }
};

const updateTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method} Entered update task controller`);
  try {
    const TASK_ID = Number(req.params.id);
    const TASK_DATA = req.body;
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.updateTaskService(TOKEN_DATA.username, TASK_ID, TASK_DATA);
    if (RESPONSE.status) {
      if (RESPONSE.data) {
        res.status(200);
        RESPONSE.data = "Task Updated Successfully!!!";
        LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
      } else {
        res.status(404);
        RESPONSE.data = "Task not found!!!";
        LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
      }
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    }
    delete RESPONSE.status;
    res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to update task!!! Please, login again!!!" });
  }
};

const deleteTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method} Entered delete task controller`);
  try {
    const TASK_ID = Number(req.params.id);
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.deleteTaskService(TOKEN_DATA.username, TASK_ID);
    if (RESPONSE.status) {
      if (RESPONSE.data) {
        res.status(200);
        RESPONSE.data = "Task Deleted Successfully!!!";
        LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
      } else {
        res.status(404);
        RESPONSE.data = "Task not found!!!";
        LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
      }
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    }
    delete RESPONSE.status;
    res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to delete task!!! Please, login again!!!" });
  }
};

module.exports = { addTask, readTask, readAllTasks, updateTask, deleteTask };
