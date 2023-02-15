const { Builder, By, Key, util } = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const options = new firefox.Options();

options.setPreference("browser.download.dir", "C:\\mySeleniumDownloads");
options.setPreference("browser.download.folderList", 2);
options.setPreference(
  "browser.helperApps.neverAsk.saveToDisk",
  "application/x-csv"
);

async function LoginTest() {
  let driver = await new Builder().forBrowser("firefox").build();
  await driver.manage().window().maximize();
  await driver.get("https://dev.edu.stacktrek.com");
  await driver.findElement(By.name("email")).sendKeys("student1@gmail.com");
  await driver
    .findElement(
      By.xpath(
        "/div[1]/div/div[2]/div[1]/div/div/div[2]/div/div/div/div[3]/div/div[2]/div/div/input"
      )
    )
    .sendKeys("Password@123");
  await driver
    .findElement(
      By.xpath(
        "/div[1]/div/div[2]/div[1]/div/div/div[2]/div/div/div/div[3]/div/div[3]/div/div[2]/div/button"
      )
    )
    .click();
}

LoginTest();
