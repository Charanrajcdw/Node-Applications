const { writeColorFile, readColorFile } = require("../utils/file.utils");

const addBuddyService = async (buddyObject) => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    response.data.push(buddyObject);
    response = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(response.data));
    if (response.status === "success") {
      return "Buddy Added Successfully!!!";
    } else {
      return "Error in adding buddy!!!";
    }
  } else {
    return "Error in adding buddy!!!";
  }
};

module.exports = { addBuddyService };
