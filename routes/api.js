const express = require("express");
const router = express.Router();
const twitterClass = require("../scrapper/twitterClass");
const { saveToFile, json2csv } = require("../helpers/json2csv");
const path = require("path");

router.post("/", async (req, res) => {
  try {
    let { search, howMany, lastOnes, saveToCsv } = req.body;
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

    for (let key of Object.keys(result)) {
      let csv = await json2csv(result[key]);
      const pathToSave = path.resolve(__dirname, "..", "csv");
      await saveToFile(csv, `${pathToSave}/${key + "" + Date.now()}.csv`);
    }

    res.json(result);

    await twitterInstance.close();
  } catch (e) {
    return res.status(500).send({ error: e.message });
  }
});

module.exports = router;
