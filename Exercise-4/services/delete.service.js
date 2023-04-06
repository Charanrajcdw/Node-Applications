const { filePath,responseData } = require("../js/constants");
const { writeColorFile, readColorFile } = require("../utils/file.utils");

const deleteBuddyService = async (buddyId) => {
  let response;
  response = await readColorFile(filePath);
  if (response.status === "success") {
    const BUDDY_INDEX = response.data.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      const FILTERED_DATA = response.data.filter((buddy) => buddy.employeeId !== buddyId);
      response = await writeColorFile(filePath, JSON.stringify(FILTERED_DATA));
      if (response.status === "success") {
        return responseData.delete.success;
      } else {
        return responseData.delete.error;
      }
    } else {
      return responseData.common.missing;
    }
  } else {
    return responseData.delete.error;
  }
};

module.exports = { deleteBuddyService };
