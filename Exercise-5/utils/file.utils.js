const fs = require("fs");

/**
 * Reads and returns a file data
 * 
 * @param {String} path - path of the file
 * @returns the parsed file data as json object
 */
const readFile = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

/**
 * Writes the data into a file
 * 
 * @param {String} path - path of the file to write
 * @param {String} data - the data to write in the file
 * @returns success message if write is done else error
 */
const writeFile = (path, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("Data written successfully!");
      }
    });
  });
};

module.exports = { readFile, writeFile };
