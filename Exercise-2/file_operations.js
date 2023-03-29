const fs = require("fs");

const readColorFile = (path) => {
  const readPromise = new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
  const result = readPromise.then(
    (data) => {
      return JSON.parse(data);
    },
    (err) => {
      return err;
    }
  );
  return result;
};

const writeColorFile = (path, data) => {
  const writePromise = new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Data written successfully!");
      }
    });
  });
  const result = writePromise.then(
    (data) => {
      return data;
    },
    (err) => {
      return err;
    }
  );
  return result;
};

module.exports = {
  readColorFile,
  writeColorFile,
};
