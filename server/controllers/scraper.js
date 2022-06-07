const pageScraper = require('./pageScraper');

const browser = require('./../config/browser');

const scraperController = {
  async scrapeAll(req, res) {
    let browserInstance = browser.startBrowser();
    let browser;
    try{
      browser = await browserInstance;
      await pageScraper.scraper(browser);	
      
    }
    catch(err){
      console.log("Could not resolve the browser instance => ", err);
    }
  }
}


// async function scrapeAll(browserInstance){
// 	let browser;
// 	try{
// 		browser = await browserInstance;
// 		await pageScraper.scraper(browser);	
		
// 	}
// 	catch(err){
// 		console.log("Could not resolve the browser instance => ", err);
// 	}
// }

module.exports = scraperController;
