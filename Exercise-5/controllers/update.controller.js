const UPDATE_SERVICE = require("../services/update.service");

const updateBuddy = async (req, res) => {
  const BUDDY_DATA = req.body;
  const BUDDY_ID = req.params.id;
  const RESULT = await UPDATE_SERVICE.updateBuddyService(BUDDY_DATA, BUDDY_ID);
  res.status(RESULT.code).send(RESULT.data);
};

module.exports = { updateBuddy };
