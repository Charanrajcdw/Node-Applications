const { readFile, writeFile } = require("../utils/fileUtils");
const { getToken } = require("../utils/authUtils");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const USER_DATA_PATH = "./user_data.json";
const TASK_DATA_PATH = "./task_data.json";

const registerUserService = async (userData) => {
  let response;
  try {
    const USER_DATA = await readFile(USER_DATA_PATH);
    const USER = USER_DATA.find((user) => user.username === userData.username);
    if (USER) {
      response = { status: true, message: "User already exists!!!" };
    } else {
      userData.password = await bcrypt.hash(userData.password, SALT_ROUNDS);
      USER_DATA.push(userData);
      await writeFile(USER_DATA_PATH, JSON.stringify(USER_DATA));
      const TASKS_DATA = await readFile(TASK_DATA_PATH);
      TASKS_DATA.push({ username: userData.username, tasks: [], lastElementId: 0 });
      await writeFile(TASK_DATA_PATH, JSON.stringify(TASKS_DATA));
      response = { status: true, message: "User Registered Successfully!!!", token: getToken({ username: userData.username }) };
    }
  } catch (err) {
    response = { status: false, message: "Error in registering user!!!" };
  }
  return response;
};

const loginUserService = async (userData) => {
  let response;
  try {
    const USER_DATA = await readFile(USER_DATA_PATH);
    const USER = USER_DATA.find((user) => user.username === userData.username);
    response = { status: true, message: "Invalid username or password!!!" };
    if (USER) {
      const IS_USER_VALID = await bcrypt.compare(userData.password, USER.password);
      if (IS_USER_VALID) {
        response = { status: true, message: "User logged in successfully!!!", token: getToken({ username: userData.username }) };
      } else {
        response = { status: true, message: "Password is invalid!!!" };
      }
    } else {
      response = { status: true, message: "User not exists!!!" };
    }
  } catch (err) {
    response = { status: false, message: "Error in logging in user!!!" };
  }
  return response;
};

module.exports = { registerUserService, loginUserService };
