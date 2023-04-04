const DELETE_SERVICE = require("../services/delete.service");
const LOGGER = require("../utils/logger.utils");

const deleteBuddy = async (req, res) => {
  const BUDDY_ID = req.params.id;
  const RESULT = await DELETE_SERVICE.deleteBuddyService(BUDDY_ID);
  if (RESULT.status == "failure") {
    LOGGER.error(`IP:${req.ip}, URL:${req.originalUrl}, STATUS:${RESULT.code}, MESSAGE:${RESULT.data}`);
  }
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { deleteBuddy };
