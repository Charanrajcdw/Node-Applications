const { writeFile, readFile } = require("../utils/fileUtils");
const TASK_DATA_PATH = "./task_data.json";

const addTaskService = async (userName, taskData) => {
  let response;
  try {
    const TASKS_DATA = await readFile(TASK_DATA_PATH);
    const USER_INDEX = TASKS_DATA.findIndex((taskData) => taskData.username === userName);
    TASKS_DATA[USER_INDEX].tasks.push({ ...taskData, createdDate: new Date() });
    await writeFile(TASK_DATA_PATH, JSON.stringify(TASKS_DATA));
    response = { status: true, data: "Task Added Successfully!!!" };
  } catch (err) {
    response = { status: false, data: "Error in adding task!!!" };
  }
  return response;
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
