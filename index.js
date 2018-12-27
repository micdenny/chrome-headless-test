const puppeteer = require('puppeteer');

const preparePageForTests = async (page) => {
  const userAgent = 'Mozilla/5.0 (X11; Linux x86_64)' +
    'AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36';
  await page.setUserAgent(userAgent);

  await page.evaluateOnNewDocument(() => {
    Object.defineProperty(navigator, 'webdriver', {
      get: () => false,
    });
  });

}

(async () => {
  const browser = await puppeteer.launch({
    browserWSEndpoint: 'ws://localhost:3000'
  });
  const page = await browser.newPage();

  await preparePageForTests(page);

  const testUrl = 'http://localhost:8080';
  await page.goto(testUrl);

  // Save a screenshot of the results.
  await page.screenshot({path: 'headless-test-result.png'});

  // Clean up.
  await browser.close()
})();