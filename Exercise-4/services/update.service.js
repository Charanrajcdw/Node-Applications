const { writeColorFile, readColorFile } = require("../utils/file_operations");

const updateBuddyService = async (buddyData,buddyId) => {
  const BUDDIES_DATA = await readColorFile("./cdw_ace23_buddies.json");
  const BUDDY_INDEX = BUDDIES_DATA.findIndex((buddy) => buddy.employeeId === buddyId);
  if (BUDDY_INDEX !== -1) {
    BUDDIES_DATA[BUDDY_INDEX].nickName = buddyData.nickName;
    BUDDIES_DATA[BUDDY_INDEX].hobbies = buddyData.hobbies;
    const MESSAGE = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(BUDDIES_DATA));
    return MESSAGE;
  } else {
    return "Buddy Not found!";
  }
};

module.exports = { updateBuddyService };
