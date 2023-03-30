const DELETE_SERVICE = require("../services/delete.service");

const deleteBuddy = async (req, res) => {
  const BUDDY_ID = req.params.id;
  const RESULT = await DELETE_SERVICE.deleteBuddyService(BUDDY_ID);
  res.send(RESULT);
};

module.exports = { deleteBuddy };
