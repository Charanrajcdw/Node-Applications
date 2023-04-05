const USER_SERVICE = require("../services/userServices");
const LOGGER = require("../utils/loggerUtils");

const registerUser = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  const USER_DATA = req.body;
  const RESPONSE = await USER_SERVICE.registerUserService(USER_DATA);
  if (RESPONSE.status) {
    if (RESPONSE.token) {
      res.status(201);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
    } else {
      res.status(403);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
    }
  } else {
    res.status(500);
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
  }
  delete RESPONSE.status;
  res.json(RESPONSE);
};

const loginUser = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}, METHOD:${req.method}`);
  const USER_DATA = req.body;
  const RESPONSE = await USER_SERVICE.loginUserService(USER_DATA);
  if (RESPONSE.status) {
    if (RESPONSE.token) {
      res.status(200);
      LOGGER.info(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
    } else {
      res.status(401);
      LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
    }
  } else {
    res.status(500);
    LOGGER.error(`IP: ${req.ip}, URL: ${req.originalUrl}, METHOD: ${req.method}, MESSAGE: ${RESPONSE.message}`);
  }
  delete RESPONSE.status;
  res.json(RESPONSE);
};

module.exports = { registerUser, loginUser };
