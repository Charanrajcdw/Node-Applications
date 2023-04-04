const { readColorFile } = require("../utils/file.utils");

const readBuddyService = async (buddyId) => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    const BUDDY = response.data.find((buddy) => buddy.employeeId === buddyId);
    if (BUDDY) {
      response.data = BUDDY;
    } else {
      response.data = "Buddy not found!!!";
    }
    response.code = 200;
  } else {
    response = { status: "failure", data: "Error in reading buddy!!!", code: 500 };
  }
  return response;
};

const readAllBuddiesService = async () => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    response.code = 200;
  } else {
    response.data = "Error in reading buddy!!!";
    response.code = 500;
  }
  return response;
};

module.exports = { readBuddyService, readAllBuddiesService };
