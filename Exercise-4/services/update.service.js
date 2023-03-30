const { writeColorFile, readColorFile } = require("../utils/file.utils");

const updateBuddyService = async (buddyData, buddyId) => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    const BUDDY_INDEX = response.data.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      response.data[BUDDY_INDEX].nickName = buddyData.nickName;
      response.data[BUDDY_INDEX].hobbies = buddyData.hobbies;
      response = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(response.data));
      if (response.status === "success") {
        return "Buddy Updated Successfully!!!";
      } else {
        return "Error in updating buddy!!!";
      }
    } else {
      return "Buddy not found!!!";
    }
  } else {
    return "Error in updating buddy!!!";
  }
};

module.exports = { updateBuddyService };
