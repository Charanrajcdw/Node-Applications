const UPDATE_SERVICE = require("../services/update.service");
const LOGGER = require("../utils/logger.utils");

const updateBuddy = async (req, res) => {
  const BUDDY_DATA = req.body;
  const BUDDY_ID = req.params.id;
  const RESULT = await UPDATE_SERVICE.updateBuddyService(BUDDY_DATA, BUDDY_ID);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { updateBuddy };
