const TASK_SERVICE = require("../services/tasks.services");
const LOGGER = require("../utils/logger.utils");

const addTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.addTaskService());
};

const readTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const TASK_ID = req.params.id;
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.readTaskService(TASK_ID));
};

const readAllTasks = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.readAllTasksService());
};

const updateTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const TASK_ID = req.params.id;
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.updateTaskService(TASK_ID));
};

const deleteTask = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const TASK_ID = req.params.id;
  // LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESPONSE.code}, MESSAGE:${RESPONSE.data}`);
  res.send(TASK_SERVICE.deleteTaskService(TASK_ID));
};

module.exports = { addTask, readTask, readAllTasks, updateTask, deleteTask };
