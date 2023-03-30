const { writeColorFile, readColorFile } = require("../utils/file_operations");

const addBuddyService = async (buddyObject) => {
  const BUDDIES_DATA = await readColorFile("./cdw_ace23_buddies.json");
  BUDDIES_DATA.push(buddyObject);
  const MESSAGE = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(BUDDIES_DATA));
  return MESSAGE;
};

module.exports = { addBuddyService };
