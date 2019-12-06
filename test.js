const twitter = require("./scrapper/twitter");

(async () => {
  try {
    await twitter.initialize();
    let res = await twitter.scrapeData({ search: "ankara travesti" });
    console.log(res);
    console.log(res.length);
  } catch (e) {
    console.error(e.message);
  }
})();
