const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.navigate().to("https://google.com");
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
    await driver.executeScript(
      `document.querySelector('#bres > div > div > div > div > div > div > div > span').scrollIntoView()`
    );
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();
