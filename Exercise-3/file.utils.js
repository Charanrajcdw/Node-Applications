const fs = require("fs");

const readColorFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  })
};

const writeColorFile = async (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Data written successfully!");
      }
    });
  })
};

module.exports = {
  readColorFile,
  writeColorFile,
};