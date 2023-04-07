const USER_SERVICE = require("../services/userServices");
const VALIDATION = require("../utils/validationUtils");
const LOGGER = require("../utils/loggerUtils");

const registerUser = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  let userData, response;
  if (VALIDATION.userValidation(req)) {
    userData = req.body;
    response = await USER_SERVICE.registerUserService(userData);
  } else {
    response = { status: false, message: "INVALID REQUEST!!!", code: 400 };
  }
  if (response.status) {
    if (response.token) {
      res.status(201);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.message}`);
    } else {
      res.status(403);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.message}`);
    }
  } else {
    res.status(response.code ? response.code : 500);
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.message}`);
  }
  delete response.status;
  res.json(response);
};

const loginUser = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  let userData, response;
  if (VALIDATION.userValidation(req)) {
    userData = req.body;
    response = await USER_SERVICE.loginUserService(userData);
  } else {
    response = { status: false, message: "INVALID REQUEST!!!", code: 400 };
  }
  if (response.status) {
    if (response.token) {
      res.status(200);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.message}`);
    } else {
      res.status(401);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.message}`);
    }
  } else {
    res.status(response.code ? response.code : 500);
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${response.message}`);
  }
  delete response.status;
  res.json(response);
};

module.exports = { registerUser, loginUser };
