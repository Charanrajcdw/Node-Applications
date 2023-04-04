const CREATE_SERVICE = require("../services/create.service");
const LOGGER = require("../utils/logger.utils");

const addBuddy = async (req, res) => {
  const BUDDY_DATA = req.body;
  const RESULT = await CREATE_SERVICE.addBuddyService(BUDDY_DATA);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { addBuddy };
