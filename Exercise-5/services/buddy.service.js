const { writeFile, readFile } = require("../utils/file.utils");

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

const updateBuddyService = async (buddyData, buddyId) => {
  let response;
  try {
    const BUDDIES_DATA = await readFile("./cdw_ace23_buddies.json");
    const BUDDY_INDEX = BUDDIES_DATA.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      BUDDIES_DATA[BUDDY_INDEX].nickName = buddyData.nickName;
      BUDDIES_DATA[BUDDY_INDEX].hobbies = buddyData.hobbies;
      await writeFile("./cdw_ace23_buddies.json", JSON.stringify(BUDDIES_DATA));
    }
    response = { status: true, data: BUDDY_INDEX };
  } catch (err) {
    response = { status: false, data: "Error in updating buddy!!!" + err };
  }
  return response;
};

const deleteBuddyService = async (buddyId) => {
  let response;
  try {
    const BUDDIES_DATA = await readFile("./cdw_ace23_buddies.json");
    const BUDDY_INDEX = BUDDIES_DATA.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      const FILTERED_DATA = BUDDIES_DATA.filter((buddy) => buddy.employeeId !== buddyId);
      await writeFile("./cdw_ace23_buddies.json", JSON.stringify(FILTERED_DATA));
      response = { status: true, data: BUDDY_INDEX };
    }
    response = { status: true, data: BUDDY_INDEX };
  } catch (err) {
    response = { status: false, data: "Error in deleting buddy!!!" + err };
  }
  return response;
};

module.exports = { addBuddyService, readBuddyService, readAllBuddiesService, updateBuddyService, deleteBuddyService };
