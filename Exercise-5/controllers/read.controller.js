const READ_SERVICE = require("../services/read.service");
const LOGGER = require("../utils/logger.utils");

const readBuddy = async (req, res) => {
  const BUDDY_ID = req.params.id;
  const RESULT = await READ_SERVICE.readBuddyService(BUDDY_ID);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

const readAllBuddies = async (req, res) => {
  const RESULT = await READ_SERVICE.readAllBuddiesService();
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { readBuddy, readAllBuddies };
