const fs = require("fs");

const readBuddy = (req, res) => {
  fs.readFile("./cdw_ace23_buddies.json", (err, data) => {
    if (err) {
      res.send("File not found" + err);
    } else {
      data = JSON.parse(data);
      const BUDDY = data.find((buddy) => buddy.employeeId === req.params.id);
      BUDDY ? res.send(BUDDY) : res.send("Buddy not found!");
    }
  });
};

const readAllBuddies = (req, res) => {
  fs.readFile("./cdw_ace23_buddies.json", (err, data) => {
    if (err) {
      res.send("File not found" + err);
    } else {
      res.send(JSON.parse(data));
    }
  });
};

module.exports = { readBuddy, readAllBuddies };
