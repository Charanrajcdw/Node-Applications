const { writeColorFile, readColorFile } = require("../utils/file_operations");

const deleteBuddyService = async (buddyId) => {
  const BUDDIES_DATA = await readColorFile("./cdw_ace23_buddies.json");
  const FILTERED_DATA = BUDDIES_DATA.filter((buddy) => buddy.employeeId !== buddyId);
  const MESSAGE = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(FILTERED_DATA));
  return MESSAGE;
};

module.exports = { deleteBuddyService };
