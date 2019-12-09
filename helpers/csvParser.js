const csv = require("csv-parser");
const fs = require("fs");

module.exports = function parseCsv(path, callback) {
  const results = [];

  try {
    fs.createReadStream(path)
      .pipe(csv())
      .on("data", data => results.push(data))
      .on("end", () => {
        console.log(results);

        callback({ results });
      });
  } catch (e) {
    callback({ error: e });
  }
};
