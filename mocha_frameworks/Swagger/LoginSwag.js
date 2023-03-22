const { Builder, Browser, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments('--headless');

const assert = require('assert');

describe('Login Selenium', function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
    driver.get('https://www.saucedemo.com/');
  });

  this.afterEach(async function () {
    driver.quit();
  });

  it('Can able to login valid credentials', async function () {
    let username = await driver.findElement(By.id('user-name'));
    let password = await driver.findElement(By.id('password'));
    let loginbtn = await driver.findElement(By.id('login-button'));

    await driver.actions().sendKeys(username, 'standard_user').perform();
    await driver.actions().sendKeys(password, 'secret_sauce').perform();
    await driver.actions().click(loginbtn).perform();

    let url = await driver.getCurrentUrl();

    // assert the url
    await assert.ok(url.toString().includes('/inventory.html'));
  });

  it("Can't able to login invalid credentials", async function () {
    let username = await driver.findElement(By.id('user-name'));
    let password = await driver.findElement(By.id('password'));
    let loginbtn = await driver.findElement(By.id('login-button'));

    await driver.actions().sendKeys(username, 'invalid_username').perform();
    await driver.actions().sendKeys(password, 'secret_sauce').perform();
    await driver.actions().click(loginbtn).perform();

    let url = await driver.getCurrentUrl();
    let errorMessageText = await driver
      .findElement(By.css('[data-test=error]'))
      .getText();

    // assert the url
    await assert.ok(url.toString().includes('/'));
    await assert.equal(
      errorMessageText,
      'Epic sadface: Username and password do not match any user in this service'
    );
  });

  it("Can't able to login locked out users", async function () {
    let username = await driver.findElement(By.id('user-name'));
    let password = await driver.findElement(By.id('password'));
    let loginbtn = await driver.findElement(By.id('login-button'));

    await driver.actions().sendKeys(username, 'locked_out_user').perform();
    await driver.actions().sendKeys(password, 'secret_sauce').perform();
    await driver.actions().click(loginbtn).perform();

    let url = await driver.getCurrentUrl();
    let errorMessageText = await driver
      .findElement(By.css('[data-test=error]'))
      .getText();

    // assert the url
    await assert.ok(url.toString().includes('/'));
    await assert.equal(
      errorMessageText,
      'Epic sadface: Sorry, this user has been locked out.'
    );
  });
});
