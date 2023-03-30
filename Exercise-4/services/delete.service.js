const { writeColorFile, readColorFile } = require("../utils/file.utils");

const deleteBuddyService = async (buddyId) => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    const BUDDY_INDEX = response.data.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      const FILTERED_DATA = response.data.filter((buddy) => buddy.employeeId !== buddyId);
      response = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(FILTERED_DATA));
      if (response.status === "success") {
        return "Buddy Deleted Successfully!!!";
      } else {
        return "Error in deleting buddy!!!";
      }
    } else {
      return "Buddy not found!!!";
    }
  } else {
    return "Error in deleting buddy!!!";
  }
};

module.exports = { deleteBuddyService };
