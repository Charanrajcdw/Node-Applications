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
        response.data = "Buddy Updated Successfully!!!";
        response.code = 200;
      } else {
        response.data = "Error in updating buddy!!!";
        response.code = 500;
      }
    } else {
      response.data = "Buddy not found!!!";
      response.code = 200;
    }
  } else {
    response = { status: "failure", data: "Error in updating buddy!!!", code: 500 };
  }
  return response;
};

module.exports = { updateBuddyService };
