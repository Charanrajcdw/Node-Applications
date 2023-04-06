const { writeFile, readFile } = require("../utils/file.utils");

/**
 * Adds a buddy data to the buddies file
 *
 * @param {Object} buddyObject - a object with buddy details
 * @returns the response of the add operation
 */
const addBuddyService = async (buddyObject) => {
  let response;
  try {
    const BUDDIES_DATA = await readFile("./cdw_ace23_buddies.json");
    BUDDIES_DATA.push(buddyObject);
    await writeFile("./cdw_ace23_buddies.json", JSON.stringify(BUDDIES_DATA));
    response = { status: true, data: "Buddy Added Successfully!!!" };
  } catch (err) {
    response = { status: false, data: "Error in adding buddy!!!" + err };
  }
  return response;
};

/**
 * Read a single buddy from the buddies file
 *
 * @param {Number} buddyId - the id of the buddy to read
 * @returns the read buddy and read operation response
 */
const readBuddyService = async (buddyId) => {
  let response;
  try {
    const BUDDIES_DATA = await readFile("./cdw_ace23_buddies.json");
    const BUDDY = BUDDIES_DATA.find((buddy) => buddy.employeeId === buddyId);
    response = { status: true, data: BUDDY };
  } catch (err) {
    response = { status: false, data: "Error in reading buddy!!!" + err };
  }
  return response;
};

/**
 * Read all buddies from the buddies file
 *
 * @returns all the buddies and read response response
 */
const readAllBuddiesService = async () => {
  let response;
  try {
    const BUDDIES_DATA = await readFile("./cdw_ace23_buddies.json");
    response = { status: true, data: BUDDIES_DATA };
  } catch (err) {
    response = { status: false, data: "Error in reading buddy!!!" + err };
  }
  return response;
};

/**
 * Update a buddies hobbies and nickname into the buddies file
 *
 * @param {Object} buddyData - the update data of the buddy
 * @param {Number} buddyId - the id of the buddy to update
 * @returns the response of the update operation
 */
const updateBuddyService = async (buddyData, buddyId) => {
  let response;
  try {
    let buddiesData = await readFile("./cdw_ace23_buddies.json");
    let isModified = false;
    buddiesData = buddiesData.map((buddy) => {
      if (buddy.employeeId === buddyId) {
        isModified = true;
        return { ...buddy, nickName: buddyData.nickName, hobbies: buddyData.hobbies };
      } else return buddy;
    });
    await writeFile("./cdw_ace23_buddies.json", JSON.stringify(buddiesData));
    response = { status: true, data: isModified };
  } catch (err) {
    response = { status: false, data: "Error in updating buddy!!!" + err };
  }
  return response;
};

/**
 * Delete a single buddy from the buddies file
 *
 * @param {Object} buddyId - the id of the buddy to delete
 * @returns the response of the delete operation
 */
const deleteBuddyService = async (buddyId) => {
  let response;
  try {
    const BUDDIES_DATA = await readFile("./cdw_ace23_buddies.json");
    const FILTERED_DATA = BUDDIES_DATA.filter((buddy) => buddy.employeeId !== buddyId);
    await writeFile("./cdw_ace23_buddies.json", JSON.stringify(FILTERED_DATA));
    response = { status: true, data: BUDDIES_DATA.length!==FILTERED_DATA };
  } catch (err) {
    response = { status: false, data: "Error in deleting buddy!!!" + err };
  }
  return response;
};

module.exports = { addBuddyService, readBuddyService, readAllBuddiesService, updateBuddyService, deleteBuddyService };
