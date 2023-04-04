const { writeColorFile, readColorFile } = require("../utils/file.utils");

const addBuddyService = async (buddyObject) => {
  let response;
  response = await readColorFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    response.data.push(buddyObject);
    response = await writeColorFile("./cdw_ace23_buddies.json", JSON.stringify(response.data));
    if (response.status === "success") {
      response.data = "Buddy Added Successfully!!!";
      response.code = 200;
    } else {
      response.data = "Error in adding buddy!!!";
      response.code = 500;
    }
  } else {
    response = { status: "failure", data: "Error in adding buddy!!!", code: 500 };
  }
  return response;
};

module.exports = { addBuddyService };
