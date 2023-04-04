const READ_SERVICE = require("../services/read.service");

const readBuddy = async (req, res) => {
  const BUDDY_ID = req.params.id;
  const RESULT = await READ_SERVICE.readBuddyService(BUDDY_ID);
  res.status(RESULT.code).send(RESULT.data);
};

const readAllBuddies = async (req, res) => {
  const RESULT = await READ_SERVICE.readAllBuddiesService();
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { readBuddy, readAllBuddies };
