const { parseAsync } = require("json2csv");
const fs = require("fs");
const path = require("path");

const fields = [
  "username",
  "userLink",
  "imgUrls",
  "likesCount",
  "timestamp",
  "message",
  "avatar"
];
const opts = { fields };

module.exports = {
  /**
   * A function that writes data to outputPath
   *
   * @param {String} data - csv string
   * @param {String} [outputPath] - output path
   */
  saveToFile(data, outputPath) {
    console.log("saveToFile");
    const pathToSave = path.resolve(__dirname, "..", "csv");
    console.log("pathToSave", pathToSave);
    outputPath = outputPath || `${pathToSave}/${Date.now()}.csv`;
    fs.writeFile(outputPath, data, { flag: "a" }, err => {
      if (err) throw err;
      console.log("The file has been saved!");
    });
  },
  /**
   * A functino that accepts a json array and returns a promise that resolves to csv version
   *
   * @param {Object[]} jsonArr - Array of object
   * @returns {Promise} - a promise which will be resolved to csv version of obj
   */
  json2csv: async function(jsonArr) {
    return parseAsync(jsonArr, opts);
  }
};
