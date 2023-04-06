const CREATE_SERVICE = require("../services/create.service");

const addBuddy = async (req, res) => {
  const BUDDY_DATA = req.body;
  const RESULT = await CREATE_SERVICE.addBuddyService(BUDDY_DATA);
  res.send(RESULT);
};

module.exports = { addBuddy };
