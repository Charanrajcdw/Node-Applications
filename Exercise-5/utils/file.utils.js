const fs = require("fs");

const readFile = (path) => {
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
      return { status: "success", data: JSON.parse(data) };
    },
    (err) => {
      return { status: "failure", data: err };
    }
  );
  return result;
};

const writeFile = (path, data) => {
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
      return { status: "success", data: data };
    },
    (err) => {
      return { status: "failure", data: err };
    }
  );
  return result;
};

module.exports = { readFile, writeFile };
