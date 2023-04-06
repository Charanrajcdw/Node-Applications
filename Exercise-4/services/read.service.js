const { filePath, responseData } = require("../js/constants");
const { readColorFile } = require("../utils/file.utils");

const readBuddyService = async (buddyId) => {
  let response;
  response = await readColorFile(filePath);
  if (response.status === "success") {
    const BUDDY = response.data.find((buddy) => buddy.employeeId === buddyId);
    if (BUDDY) {
      return BUDDY;
    } else {
      return responseData.common.missing;
    }
  } else {
    return responseData.read.error;
  }
};

const readAllBuddiesService = async () => {
  let response;
  response = await readColorFile(filePath);
  if (response.status === "success") {
    return response.data;
  } else {
    return responseData.read.error;
  }
};

module.exports = { readBuddyService, readAllBuddiesService };
