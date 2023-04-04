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
        response.data = "Buddy Deleted Successfully!!!";
        response.code = 200;
      } else {
        response.data = "Error in deleting buddy!!!";
        response.code = 500;
      }
    } else {
      response.data = "Buddy not found!!!";
      response.code = 200;
    }
  } else {
    response = { status: "failure", data: "Error in deleting buddy!!!", code: 500 };
  }
  return response;
};

module.exports = { deleteBuddyService };
