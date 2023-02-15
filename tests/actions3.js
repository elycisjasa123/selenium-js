const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.manage().window().maximize();
    await driver
      .navigate()
      .to("https://www.selenium.dev/selenium/web/mouse_interaction.html");

    const linkelement = await driver.findElement(By.id("click"));
    await driver.actions().contextClick(linkelement).perform();
    await driver.sleep(3000);

    const textField = await driver.findElement(By.id("clickable"));
    await driver.actions().sendKeys(textField, "Example").perform();
    await driver.sleep(3000);

    await driver.actions().keyDown(Key.CONTROL).sendKeys("a").perform();
    await driver.sleep(3000);
    await driver.actions().keyDown(Key.BACK_SPACE).perform();
    await driver.sleep(3000);
  } finally {
    await driver.quit();
  }
})();
