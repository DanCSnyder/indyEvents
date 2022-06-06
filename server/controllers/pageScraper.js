const { links } = require("express/lib/response");

const scraperObject = {
  url: "https://www.visitindy.com/indianapolis-things-to-do-events",
  async scraper(browser) {
    let page = await browser.newPage();
    console.log(`Navigating to ${this.url}...`);
    await page.goto(this.url);
    const scrapedData = [];

    await page.waitForSelector("input[name=search_whattodo_from]");
    await page.$eval(
      "input[name=search_whattodo_from]",
      (el) => (el.value = "5/19/2022")
    );

    async function scrapeCurrentPage() {
      await page.waitForSelector(".container");

      let urls = await page.$$eval(".list-grid-item", (links) => {
        links = links.filter(
          (link) =>
            !link.querySelector(".list-type") &&
            link.querySelector(".list-image")
        );
        links = links.map((link) => link.querySelector("h3 > a").href);
        return links;
      });

      let pagePromise = (link) =>
        new Promise(async (resolve, reject) => {
          let dataObj = {};
          let newPage = await browser.newPage();
          await newPage.goto(link);

          dataObj["title"] = await newPage.$eval(".blue-dark", (text) =>
            text.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, "")
          );
          dataObj["date"] = await newPage.$eval(
            ".row p:last-child",
            (text) => text.textContent
          );
          dataObj["location"] = await newPage.$eval(
            ".h1",
            (text) => text.textContent
          );
          dataObj["url"] = link;

          resolve(dataObj);
          await newPage.close();
        });

      for (let i = 0; i < urls.length; i++) {
        let currentData = await pagePromise(urls[i]);
        scrapedData.push(currentData);
      }

      let nextButtonExist = false;
      try {
        const nextButton = await page.$eval(
          'a[rel="next"]',
          (a) => a.textContent
        );
        nextButtonExist = true;
        if (nextButtonExist && parseInt(nextButton) <= 2) {
          await page.click('a[rel="next"]');
          return scrapeCurrentPage();
        }
      } catch (err) {
        nextButtonExist = false;
      }
      await page.close();
      return scrapedData;
    }
    let data = await scrapeCurrentPage();
    browser.close();
    return data;
  },
};

module.exports = scraperObject;
