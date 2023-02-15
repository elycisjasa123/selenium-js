const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.navigate().to("https://google.com");
    await driver.manage().window().maximize();
    await driver.findElement(By.name("q")).sendKeys("webdriver", Key.RETURN);
    await driver.wait(until.titleIs("webdriver - Google Search"), 1000);
    let label = await driver.findElement(
      By.css("#bres > div > div > div > div > div > div > div > span")
    );
    driver
      .actions()
      .move({ origin: label })
      .pause(2000)
      .press()
      .pause(2000)
      .perform();
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();
