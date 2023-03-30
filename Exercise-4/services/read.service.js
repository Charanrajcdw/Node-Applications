const { readColorFile } = require("../utils/file_operations");

const readBuddyService = async (buddyId) => {
  const BUDDIES_DATA = await readColorFile("./cdw_ace23_buddies.json");
  const BUDDY = BUDDIES_DATA.find((buddy) => buddy.employeeId === buddyId);
  return BUDDY;
};

const readAllBuddiesService = async () => {
  const BUDDIES_DATA = await readColorFile("./cdw_ace23_buddies.json");
  return BUDDIES_DATA;
};

module.exports = { readBuddyService, readAllBuddiesService };
