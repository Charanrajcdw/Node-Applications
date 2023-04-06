const TASK_SERVICE = require("../services/tasksServices");
const LOGGER = require("../utils/loggerUtils");
const { verifyToken } = require("../utils/authUtils");

const addTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  const TASK_DATA = req.body;
  try {
    const TOKEN_DATA = verifyToken(req.headers.authorization.split(" ")[1]);
    const RESPONSE = await TASK_SERVICE.addTaskService(TOKEN_DATA.username, TASK_DATA);
    if (RESPONSE.status) {
      res.status(201);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
    } else {
      res.status(500);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
    }
    delete RESPONSE.status;
    res.json(RESPONSE);
  } catch (err) {
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: Token is not valid`);
    res.status(401).json({ message: "Unable to add task!!! Please, login again!!!" });
  }
};

const readTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  const TASK_ID = req.params.id;
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.readTaskService(TASK_ID));
};

const readAllTasks = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.readAllTasksService());
};

const updateTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  const TASK_ID = req.params.id;
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.updateTaskService(TASK_ID));
};

const deleteTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  const TASK_ID = req.params.id;
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.deleteTaskService(TASK_ID));
};

module.exports = { addTask, readTask, readAllTasks, updateTask, deleteTask };
