const fs = require("fs");

const updateBuddy = (req, res) => {
  fs.readFile("./cdw_ace23_buddies.json", (err, data) => {
    if (err) {
      res.send("File not found" + err);
    } else {
      data = JSON.parse(data);
      const buddyIndex = data.findIndex((buddy) => buddy.employeeId === req.params.id);
      if (buddyIndex !== -1) {
          data[buddyIndex].nickName = req.body.nickName;
          data[buddyIndex].hobbies = req.body.hobbies;
          console.log(req.body,data[buddyIndex]);
        fs.writeFile("./cdw_ace23_buddies.json", JSON.stringify(data), (err) => {
          if (err) {
            res.send("Buddy not updated" + err);
          } else {
            res.send("Buddy updated successfully!");
          }
        });
      } else {
        res.send("Buddy not found!");
      }
    }
  });
};

module.exports = { updateBuddy };
