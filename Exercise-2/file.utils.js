const fs = require("fs");

const readColorFile = async (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  })
    .then((data) => {
      return JSON.parse(data);
    })
    .catch((err) => {
      return err;
    });
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
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
};

module.exports = {
  readColorFile,
  writeColorFile,
};
