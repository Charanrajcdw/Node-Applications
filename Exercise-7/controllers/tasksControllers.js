const TASK_SERVICE = require("../services/tasksServices");
const LOGGER = require("../utils/loggerUtils");
const VALIDATION = require("../utils/validationUtils");
const { verifyToken } = require("../utils/authUtils");

const addTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, Entered add task controller`);
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    let taskData, response;
    if (VALIDATION.addTaskValidation(req)) {
      taskData = req.body;
      response = await TASK_SERVICE.addTaskService(TOKEN_DATA.username, taskData);
    } else {
      response = { status: false, data: "INVALID REQUEST!!!", code: 400 };
    }
    if (response.status) {
      res.status(201);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    } else {
      res.status(response.code ? response.code : 500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
    delete response.status;
    res.json(response);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to add task!!! Please, login again!!!" });
  }
};

const readTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, Entered read task controller`);
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const TASK_ID = parseInt(req.params.id);
    let response;
    if (isNaN(TASK_ID)) {
      response = { status: false, data: "INVALID REQUEST!!!", code: 400 };
    } else {
      response = await TASK_SERVICE.readTaskService(TOKEN_DATA.username, TASK_ID);
    }
    if (response.status) {
      if (response.data) {
        res.status(200);
        LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Task read successfully!!!`);
      } else {
        res.status(404);
        response.data = "Task not found!!!";
        LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
      }
    } else {
      res.status(response.code ? response.code : 500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
    delete response.status;
    res.json(response);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to read task!!! Please, login again!!!" });
  }
};

const queryTasks = (data, queryData, req, res) => {
  try {
    const { title, priority, dueDate, sortValue, page, limit } = queryData;
    data = TASK_SERVICE.filterTasksService(data, title, priority, dueDate);
    data = sortValue ? TASK_SERVICE.sortTasksService(data, sortValue) : data;
    data = page && limit ? TASK_SERVICE.paginateTasksService(data, page, limit) : data;
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(400).json({ message: err.message });
    return false;
  }
  return data;
};

const readAllTasks = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, Entered read all tasks controller`);
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.readAllTasksService(TOKEN_DATA.username);
    if (RESPONSE.status) {
      res.status(200);
      if (req.query) RESPONSE.data = queryTasks(RESPONSE.data, req.query, req, res);
      if (RESPONSE.data.length == 0) RESPONSE.data = "No tasks to display";
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Tasks read successfully!!!`);
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.data}`);
    }
    delete RESPONSE.status;
    if (RESPONSE.data) res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to read task!!! Please, login again!!!" });
  }
};

const updateTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method} Entered update task controller`);
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const TASK_ID = parseInt(req.params.id);
    let taskData, response;
    if (!isNaN(TASK_ID) && VALIDATION.updateTaskValidation(req)) {
      taskData = req.body;
      response = await TASK_SERVICE.updateTaskService(TOKEN_DATA.username, TASK_ID, taskData);
    } else {
      response = { status: false, data: "INVALID REQUEST!!!", code: 400 };
    }
    if (response.status) {
      if (response.data) {
        res.status(200);
        response.data = "Task Updated Successfully!!!";
        LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
      } else {
        res.status(404);
        response.data = "Task not found!!!";
        LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
      }
    } else {
      res.status(response.code ? response.code : 500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
    delete response.status;
    res.json(response);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to update task!!! Please, login again!!!" });
  }
};

const deleteTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method} Entered delete task controller`);
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const TASK_ID = parseInt(req.params.id);
    let response;
    if (isNaN(TASK_ID)) {
      response = { status: false, data: "INVALID REQUEST!!!", code: 400 };
    } else {
      response = await TASK_SERVICE.deleteTaskService(TOKEN_DATA.username, TASK_ID);
    }
    if (response.status) {
      if (response.data) {
        res.status(200);
        response.data = "Task Deleted Successfully!!!";
        LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
      } else {
        res.status(404);
        response.data = "Task not found!!!";
        LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
      }
    } else {
      res.status(response.code ? response.code : 500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.data}`);
    }
    delete response.status;
    res.json(response);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to delete task!!! Please, login again!!!" });
  }
};

module.exports = { addTask, readTask, readAllTasks, updateTask, deleteTask };
