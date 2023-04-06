const filePath = "./cdw_ace23_buddies.json";
const responseData = {
  common: {
    missing: "Buddy not found!!!",
  },
  create: {
    success: "Buddy added successfully!!!",
    error: "Error in adding buddy!!!",
  },
  read: {
    success: "Buddy read successfully!!!",
    error: "Error in reading buddy!!!",
  },
  update: {
    success: "Buddy updated successfully!!!",
    error: "Error in updating buddy!!!",
  },
  delete: {
    success: "Buddy deleted successfully!!!",
    error: "Error in deleting buddy!!!",
  },
};

module.exports = {
  filePath,
  responseData,
};
