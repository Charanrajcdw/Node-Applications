const { writeFile, readFile } = require("../utils/fileUtils");
const TASK_DATA_PATH = "./task_data.json";

const addTaskService = async (userName, taskData) => {
  let response;
  try {
    const TASKS_DATA = await readFile(TASK_DATA_PATH);
    const USER_INDEX = TASKS_DATA.findIndex((taskData) => taskData.username === userName);
    TASKS_DATA[USER_INDEX].lastElementId++;
    TASKS_DATA[USER_INDEX].tasks.push({ ...taskData, createdDate: new Date(), id: TASKS_DATA[USER_INDEX].lastElementId });
    await writeFile(TASK_DATA_PATH, JSON.stringify(TASKS_DATA));
    response = { status: true, data: "Task Added Successfully!!!" };
  } catch (err) {
    response = { status: false, data: "Error in adding task!!!" };
  }
  return response;
};

const readTaskService = async (userName, taskId) => {
  let response;
  try {
    const TASKS_DATA = await readFile(TASK_DATA_PATH);
    const USER_DATA = TASKS_DATA.find((taskData) => taskData.username === userName);
    const TASK = USER_DATA.tasks.find((task) => task.id === taskId);
    response = { status: true, data: TASK };
  } catch (err) {
    response = { status: false, data: "Error in reading task!!!" };
  }
  return response;
};

const readAllTasksService = async (userName) => {
  let response;
  try {
    const TASKS_DATA = await readFile(TASK_DATA_PATH);
    const USER_DATA = TASKS_DATA.find((taskData) => taskData.username === userName);
    response = { status: true, data: USER_DATA.tasks };
  } catch (err) {
    response = { status: false, data: "Error in reading task!!!" };
  }
  return response;
};

const updateTaskService = async (userName, taskId, taskData) => {
  let response;
  try {
    const TASKS_DATA = await readFile(TASK_DATA_PATH);
    const USER_INDEX = TASKS_DATA.findIndex((taskData) => taskData.username === userName);
    let isModified = false;
    TASKS_DATA[USER_INDEX].tasks = TASKS_DATA[USER_INDEX].tasks.map((task) => {
      if (task.id === taskId) {
        isModified = true;
        Object.keys(task).forEach((key) => (task[key] = taskData.hasOwnProperty(key) ? taskData[key] : task[key]));
      }
      return task;
    });
    await writeFile(TASK_DATA_PATH, JSON.stringify(TASKS_DATA));
    response = { status: true, data: isModified };
  } catch (err) {
    response = { status: false, data: "Error in updating task!!!" };
  }
  return response;
};

const deleteTaskService = async (userName, taskId) => {
  let response;
  try {
    const TASKS_DATA = await readFile(TASK_DATA_PATH);
    const USER_INDEX = TASKS_DATA.findIndex((taskData) => taskData.username === userName);
    const FILTERED_DATA = TASKS_DATA[USER_INDEX].tasks.filter((task) => task.id !== taskId);
    const IS_DELETED = FILTERED_DATA.length !== TASKS_DATA[USER_INDEX].tasks.length;
    TASKS_DATA[USER_INDEX].tasks = FILTERED_DATA;
    await writeFile(TASK_DATA_PATH, JSON.stringify(TASKS_DATA));
    response = { status: true, data: IS_DELETED };
  } catch (err) {
    response = { status: false, data: "Error in deleting buddy!!!" };
  }
  return response;
};

module.exports = { addTaskService, readTaskService, readAllTasksService, updateTaskService, deleteTaskService };
