const fs = require("fs");

const deleteBuddy = (req, res) => {
  fs.readFile("./cdw_ace23_buddies.json", (err, data) => {
    if (err) {
      res.send("File not found" + err);
    } else {
      data = JSON.parse(data);
      const FILTERED_DATA = data.filter((buddy) => buddy.employeeId !== req.params.id);
      fs.writeFile("./cdw_ace23_buddies.json", JSON.stringify(FILTERED_DATA), (err) => {
        if (err) {
          res.send("Buddy not deleted" + err);
        } else {
          res.send("Buddy deleted successfully!");
        }
      });
    }
  });
};

module.exports = { deleteBuddy };
