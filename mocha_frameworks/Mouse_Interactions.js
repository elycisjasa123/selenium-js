const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

describe("Mouse Interactions", function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    driver.get("https://www.selenium.dev/selenium/web/mouse_interaction.html");
  });

  this.afterEach(async function () {
    await driver.quit();
  });
  it("Can able to drag in the target location", async function () {
    const srcElement = await driver.findElement(By.id("draggable"));
    const targetElemet = await driver.findElement(By.id("droppable"));

    await driver.actions().dragAndDrop(srcElement, targetElemet).perform();
    await driver.sleep(3000);
  });

  it("Can able to right click", async function () {
    const linkText = await driver.findElement(By.id("click"));

    await driver.actions().contextClick(linkText).perform();
    await driver.sleep(3000);
  });

  it("Can able to type a text", async function () {
    const textField = await driver.findElement(By.id("clickable"));
    await driver.actions().sendKeys(textField, "Example").perform();
    await driver.sleep(3000);
  });

  it("Can able to select all text", async function () {
    const textField = await driver.findElement(By.id("clickable"));
    await driver.actions().sendKeys(textField, "Example").perform();
    await driver.sleep(3000);
    await driver.actions().keyDown(Key.CONTROL).sendKeys("a").perform();
    await driver.sleep(3000);
  });
});
