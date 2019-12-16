const puppeteer = require("puppeteer");

class TwitterScrapper {
  /**
   * Constructor of TwitterScrapper
   */
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = "https://twitter.com";
  }

  /**
   * initializes browser and page
   *
   * @return {undefined}
   */
  async _build() {
    this.browser = await puppeteer.launch({ args: ["--no-sandbox"] });
    this.page = await this.browser.newPage();

    await this.page.waitFor(500);
  }

  async _setRequestInterception(page) {
    //ignoring stylesheet, images, font, media(media is ignored when using chromium)
    await page.setRequestInterception(true);
    page.on("request", req => {
      if (
        ["stylesheet", "image", "media", "font"].includes(req.resourceType())
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    return () => page.setRequestInterception(true);
  }

  /**
   * Initializes browser and page (puppeteer) if neccessary
   *
   * @return {undefined}
   */
  async _initIfNeccesarry() {
    if (!this.browser || !this.page) {
      await this._build();
    }
  }

  /**
   *
   * An async function for scraping twitter data
   * Uses different page instances for each search
   * Class instance has a page instance of its own, can be used for continous actions
   *
   * @param {Object} - options of ScrapeDate function
   * @param {number} [options.howMany] - defaults to 10, how many records to fetch
   * @param {string} options.search - search string
   * @param {boolean} [options.lastOnes] - should we fetch latest records or popular ones
   * @returns {Object} - returns Object: {key: []}
   */
  async scrapeData({ howMany = 10, search, lastOnes = true } = {}) {
    await this._initIfNeccesarry();
    const page = await this.browser.newPage();
    const cancelInterception = await this._setRequestInterception(page);
    if (!search) return "You need to provide a search to scrape";
    search = encodeURIComponent(search);
    console.log("encoded search", search);
    let targetUrl = `${this.baseUrl}/search?`;
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

    await cancelInterception();

    return { [search]: data };
  }

  async close() {
    await this.page.setRequestInterception(false);
    await this.browser.close();
  }
}

module.exports = TwitterScrapper;
