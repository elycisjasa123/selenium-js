const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

(async function example() {
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.navigate().to("https://google.com");
    // const positions = await driver.manage().window().getPosition();
    await driver.sleep(2000);
    await driver.manage().window().minimize();

    await driver.sleep(2000);
    await driver.manage().window().fullscreen();
    await driver.sleep(2000);
    await driver.manage().window().maximize();
    await driver.sleep(2000);
    await driver.manage().window().setSize(1024, 720);
    const setRectangle = await driver
      .manage()
      .window()
      .setRect(20, 20, 1024, 720);

    const windowSize = await driver.manage().window().getSize();

    console.log(`${windowSize.width} ${windowSize.height}`);
    // console.log(`${positions}`);

    console.log(`${JSON.stringify(setRectangle)}`);
  } finally {
    await driver.quit();
  }
})();
