const fs = require("fs");

const addBuddy = (req, res) => {
  const buddyObject = req.body;
  fs.readFile("./cdw_ace23_buddies.json", (err, data) => {
    if (err) {
      res.send("File not found" + err);
    } else {
      data = JSON.parse(data);
      data.push(buddyObject);
      fs.writeFile("./cdw_ace23_buddies.json", JSON.stringify(data), (err) => {
        if (err) {
          res.send("Buddy not added" + err);
        } else {
          res.send("Buddy added successfully!");
        }
      });
    }
  });
};

module.exports = { addBuddy };
