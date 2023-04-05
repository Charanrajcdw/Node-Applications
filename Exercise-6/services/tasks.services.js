const { writeFile, readFile } = require("../utils/file.utils");

const addTaskService = () => {
  return "TASK ADDED";
};

const readTaskService = (taskId) => {
  return `TASK ${taskId} READ`;
};

const readAllTasksService = () => {
  return "ALL TASKS READ";
};

const updateTaskService = (taskId) => {
  return `TASK ${taskId} UPDATED`;
};

const deleteTaskService = (taskId) => {
  return `TASK ${taskId} DELETED`;
};

module.exports = { addTaskService, readTaskService, readAllTasksService, updateTaskService, deleteTaskService };
