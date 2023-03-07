const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

const assert = require('assert');

describe('Login Selenium', function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    driver.get('https://practicetestautomation.com/practice-test-login/');
  });

  this.afterEach(async function () {
    driver.quit();
  });

  it('Positive LogIn test', async function () {
    let username = await driver.findElement(By.id('username'));
    let password = await driver.findElement(By.id('password'));
    let loginbtn = await driver.findElement(By.id('submit'));

    await driver.actions().sendKeys(username, 'student').perform();
    await driver.actions().sendKeys(password, 'Password123').perform();
    await driver.actions().click(loginbtn).perform();

    let url = await driver.getCurrentUrl();

    // assert the url
    await assert.ok(
      url
        .toString()
        .includes('practicetestautomation.com/logged-in-successfully/')
    );

    let successLoginText = await driver
      .findElement(By.css('.post-content'))
      .getText();

    // assert the text
    await assert.ok(
      successLoginText.toString().includes('Congratulations') ||
        successLoginText.toString().includes('successfully logged in!')
    );

    // assert if there's a logout button exists
    await driver.wait(until.elementLocated(By.css('a.has-background')), 10000);
  });

  it('Negative username test', async function () {
    let username = await driver.findElement(By.id('username'));
    let password = await driver.findElement(By.id('password'));
    let loginbtn = await driver.findElement(By.id('submit'));

    await driver.actions().sendKeys(username, 'invalidusername').perform();
    await driver.actions().sendKeys(password, 'Password123').perform();
    await driver.actions().click(loginbtn).perform();

    let url = await driver.getCurrentUrl();
    let errorMessageText = await driver.findElement(By.id('error')).getText();

    // assert the url
    await assert.equal(errorMessageText, 'Your username is invalid!');
  });

  it('Negative password test', async function () {
    let username = await driver.findElement(By.id('username'));
    let password = await driver.findElement(By.id('password'));
    let loginbtn = await driver.findElement(By.id('submit'));

    await driver.actions().sendKeys(username, 'student').perform();
    await driver.actions().sendKeys(password, 'invalidPassword').perform();
    await driver.actions().click(loginbtn).perform();

    let url = await driver.getCurrentUrl();
    let errorMessageText = await driver.findElement(By.id('error')).getText();

    // assert the url
    await assert.equal(errorMessageText, 'Your password is invalid!');
  });
});
