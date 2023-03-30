const { readColorFile } = require("../utils/file.utils");

const readBuddyService = async (buddyId) => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    const BUDDY = response.data.find((buddy) => buddy.employeeId === buddyId);
    if (BUDDY) {
      return BUDDY;
    } else {
      return "Buddy not found!!!";
    }
  } else {
    return "Error in reading buddy!!!";
  }
};

const readAllBuddiesService = async () => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    return response.data;
  } else {
    return "Error in reading buddy!!!";
  }
};

module.exports = { readBuddyService, readAllBuddiesService };
