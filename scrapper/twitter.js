const puppeteer = require("puppeteer");

let browser = null;
let page = null;
const baseUrl = "https://twitter.com";
const userUrlExample = "https://twitter.com/username";

module.exports = {
  initialize: async () => {
    browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });
    page = await browser.newPage();
    await page.goto(baseUrl);
    await page.waitFor(1000);
  },
  scrapeData: async ({ howMany = 10, search, lastOnes = true } = {}) => {
    if (!search) return "You need to provide a search to scrape";
    search = encodeURIComponent(search);
    console.log("encoded search", search);
    let targetUrl = `${baseUrl}/search?`;
    if (lastOnes) targetUrl += "f=tweets&";
    targetUrl += `q=${search}`;
    console.log("targeturl", targetUrl);
    await page.goto(targetUrl);
    page.waitFor(1000);

    let lastCount = null;
    let contentLength = await page.$$eval(".content", elems => elems.length);
    console.log(contentLength);

    while (contentLength < howMany) {
      lastCount = contentLength;
      await page.evaluate("window.scrollTo(0, document.body.scrollHeight)");
      await page.waitFor(2000);
      contentLength = await page.$$eval(".content", elems => elems.length);
      if (contentLength == lastCount) break;
    }

    let data = await page.evaluate(howMany => {
      let divs = Array.from(document.querySelectorAll(".content"));

      let res = divs.map(div => {
        let username = div
          .querySelector("a[class*='js-user-profile-link']")
          .getAttribute("href")
          .replace("/", "");
        let userLink = `https://twitter.com/${username}`;

        let imgs = Array.from(
          div.querySelectorAll("div[class*='photoContainer'] img")
        );
        let imgUrls = [];
        if (imgs.length > 0)
          imgUrls = Array.from(imgs.map(img => img.getAttribute("src")));

        let timestamp =
          div.querySelector("span[class*=timestamp") &&
          div.querySelector("span[class*=timestamp").getAttribute("data-time");

        let likes = div.querySelector(
          "[class*='js-actionFavorite'] .ProfileTweet-actionCountForPresentation"
        );
        let likesCount = likes && likes.textContent;

        let message = div.querySelector(".tweet-text").textContent;

        let avatar = div.querySelector(".avatar").getAttribute("src");

        return {
          username,
          userLink,
          imgUrls,
          likesCount,
          timestamp,
          message,
          avatar
        };
      });

      return res.slice(0, howMany);
    }, howMany);

    return data;
  },
  close: async () => {
    await browser.close();
  }
};
