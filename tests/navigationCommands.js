const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.navigate().to("https://google.com");
    await driver.sleep(2000);
    await driver.navigate().back();
    await driver.sleep(2000);
    await driver.navigate().forward();
    await driver.sleep(2000);
    await driver.navigate().refresh();
    await driver.sleep(2000);
  } finally {
    await driver.quit();
  }
})();
