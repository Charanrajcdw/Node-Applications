const { writeFile, readFile } = require("../utils/file.utils");

const addBuddyService = async (buddyObject) => {
  let response;
  response = await readFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    response.data.push(buddyObject);
    response = await writeFile("./cdw_ace23_buddies.json", JSON.stringify(response.data));
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

const readBuddyService = async (buddyId) => {
  let response;
  response = await readFile("./cdw_ace23_buddies.json");
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
  response = await readFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    response.code = 200;
  } else {
    response.data = "Error in reading buddy!!!";
    response.code = 500;
  }
  return response;
};

const updateBuddyService = async (buddyData, buddyId) => {
  let response;
  response = await readFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    const BUDDY_INDEX = response.data.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      response.data[BUDDY_INDEX].nickName = buddyData.nickName;
      response.data[BUDDY_INDEX].hobbies = buddyData.hobbies;
      response = await writeFile("./cdw_ace23_buddies.json", JSON.stringify(response.data));
      if (response.status === "success") {
        response.data = "Buddy Updated Successfully!!!";
        response.code = 200;
      } else {
        response.data = "Error in updating buddy!!!";
        response.code = 500;
      }
    } else {
      response.data = "Buddy not found!!!";
      response.code = 200;
    }
  } else {
    response = { status: "failure", data: "Error in updating buddy!!!", code: 500 };
  }
  return response;
};

const deleteBuddyService = async (buddyId) => {
  let response;
  response = await readFile("./cdw_ace23_buddies.json");
  if (response.status === "success") {
    const BUDDY_INDEX = response.data.findIndex((buddy) => buddy.employeeId === buddyId);
    if (BUDDY_INDEX !== -1) {
      const FILTERED_DATA = response.data.filter((buddy) => buddy.employeeId !== buddyId);
      response = await writeFile("./cdw_ace23_buddies.json", JSON.stringify(FILTERED_DATA));
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

module.exports = { addBuddyService, readBuddyService, readAllBuddiesService, updateBuddyService, deleteBuddyService };
