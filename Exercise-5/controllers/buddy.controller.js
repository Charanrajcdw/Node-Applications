const BUDDY_SERVICE = require("../services/buddy.service");
const LOGGER = require("../utils/logger.utils");

const addBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_DATA = req.body;
  const RESULT = await BUDDY_SERVICE.addBuddyService(BUDDY_DATA);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

const readBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_ID = req.params.id;
  const RESULT = await BUDDY_SERVICE.readBuddyService(BUDDY_ID);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

const readAllBuddies = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const RESULT = await BUDDY_SERVICE.readAllBuddiesService();
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

const updateBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_DATA = req.body;
  const BUDDY_ID = req.params.id;
  const RESULT = await BUDDY_SERVICE.updateBuddyService(BUDDY_DATA, BUDDY_ID);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

const deleteBuddy = async (req, res) => {
  LOGGER.info(`IP:${req.ip}, URL:${req.originalUrl}`);
  const BUDDY_ID = req.params.id;
  const RESULT = await BUDDY_SERVICE.deleteBuddyService(BUDDY_ID);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { addBuddy, readBuddy, readAllBuddies, updateBuddy, deleteBuddy };
