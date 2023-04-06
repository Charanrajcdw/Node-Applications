const { filePath, responseData } = require("../js/constants");
const { writeColorFile, readColorFile } = require("../utils/file.utils");

const addBuddyService = async (buddyObject) => {
  let response;
  response = await readColorFile(filePath);
  if (response.status === "success") {
    response.data.push(buddyObject);
    response = await writeColorFile(filePath, JSON.stringify(response.data));
    if (response.status === "success") {
      return responseData.create.success;
    } else {
      return responseData.create.error;
    }
  } else {
    return responseData.create.error;
  }
};

module.exports = { addBuddyService };
