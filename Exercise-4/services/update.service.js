const { filePath, responseData } = require("../js/constants");
const { writeColorFile, readColorFile } = require("../utils/file.utils");

const updateBuddyService = async (buddyData, buddyId) => {
  let response;
  response = await readColorFile(filePath);
  if (response.status === "success") {
    const BUDDY_INDEX = response.data.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      response.data[BUDDY_INDEX].nickName = buddyData.nickName;
      response.data[BUDDY_INDEX].hobbies = buddyData.hobbies;
      response = await writeColorFile(filePath, JSON.stringify(response.data));
      if (response.status === "success") {
        return responseData.update.success;
      } else {
        return responseData.update.error;
      }
    } else {
      return responseData.common.missing;
    }
  } else {
    return responseData.update.error;
  }
};

module.exports = { updateBuddyService };
