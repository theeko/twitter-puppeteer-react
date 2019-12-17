const express = require("express");
const router = express.Router();
const twitterClass = require("../scrapper/twitterClass");
const { saveToFile, json2csv } = require("../helpers/json2csv");
const path = require("path");

const Tweet = require("../db/models/Tweet");

router.post("/", async (req, res) => {
  try {
    let { search, howMany, lastOnes, saveToCsv, saveToDb } = req.body;
    search = search.split(",").map(s => s.trim());

    const twitterInstance = new twitterClass();

    let result = {};

    let promises = [];

    /**
     * New page instances created for instance.ScrapeData
     * So we Promise.all for effiency
     */
    for (let i = 0; i < search.length; i++) {
      if (!search[i]) continue;
      promises.push(
        await twitterInstance.scrapeData({
          search: search[i],
          howMany,
          lastOnes
        })
      );
    }

    let values = await Promise.all(promises);

    values.map(value => {
      result = Object.assign(result, value);
    });

    if (saveToCsv) {
      console.log("save to csv block is running");
      let keys = Object.keys(result);

      for (let i = 0; i < keys.length; i++) {
        let csv = await json2csv(result[keys[i]]);
        const pathToSave = path.resolve(__dirname, "..", "csv");
        await saveToFile(csv, `${pathToSave}/${keys[i] + "" + Date.now()}.csv`);
      }
    }

    if (saveToDb) {
      console.log("save to db block is running");
      let keys = Object.keys(result);

      for (let i = 0; i < keys.length; i++) {
        let tweet = await new Tweet({
          searchTerm: keys[i],
          results: result[keys[i]]
        });

        await tweet.save();
      }
    }

    res.json(result);

    await twitterInstance.close();
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
});

module.exports = router;
