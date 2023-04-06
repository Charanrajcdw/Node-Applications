const READ_SERVICE = require("../services/read.service");

const readBuddy = async (req, res) => {
  const BUDDY_ID = req.params.id;
  const RESULT = await READ_SERVICE.readBuddyService(BUDDY_ID);
  res.send(RESULT);
};

const readAllBuddies = async (req, res) => {
  const RESULT = await READ_SERVICE.readAllBuddiesService();
  res.send(RESULT);
};

module.exports = { readBuddy, readAllBuddies };
