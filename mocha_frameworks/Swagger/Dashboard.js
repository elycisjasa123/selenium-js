const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

const assert = require("assert");
const { expect } = require("chai");

describe("Swagger Dashboard Selenium", function () {
  this.timeout(0);
  let driver;

  this.beforeEach(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
    await driver.manage().window().maximize();
    driver.get("https://www.saucedemo.com/");

    let username = await driver.findElement(By.id("user-name"));
    let password = await driver.findElement(By.id("password"));
    let loginBtn = await driver.findElement(By.id("login-button"));

    await driver.actions().sendKeys(username, "standard_user").perform();
    await driver.actions().sendKeys(password, "secret_sauce").perform();
    await driver.actions().click(loginBtn).perform();
  });

  this.afterEach(async function () {
    driver.quit();
  });

  it("Can able to select an item to add in a cart", async function () {
    // Intializing element...
    let shoppingBadgeText;
    let sauceLabBackPackAddToCartBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-backpack")
    );
    let sauceLabBackPackRemoveToCartBtn;

    // actions
    await driver.actions().click(sauceLabBackPackAddToCartBtn).perform();

    sauceLabBackPackRemoveToCartBtn = await driver.findElement(
      By.id("remove-sauce-labs-backpack")
    );

    shoppingBadgeText = await driver
      .findElement(By.css(".shopping_cart_badge"))
      .getText();

    // assertion if the button exists
    assert.ok(sauceLabBackPackRemoveToCartBtn);

    assert.equal(shoppingBadgeText, "1");
  });

  it("Can able to select a multiple item to add in a cart", async function () {
    // Intializing element...
    let shoppingBadgeText;
    let sauceLabBikeLightRemoveToCartBtn;
    let sauceLabBackPackRemoveToCartBtn;
    let sauceLabBackPackAddToCartBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-backpack")
    );
    let sauceLabBikeLightAddToCartBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-bike-light")
    );

    // actions
    await driver.actions().click(sauceLabBackPackAddToCartBtn).perform();

    shoppingBadgeText = await driver
      .findElement(By.css(".shopping_cart_badge"))
      .getText();

    sauceLabBackPackRemoveToCartBtn = await driver.findElement(
      By.id("remove-sauce-labs-backpack")
    );

    // assertion if the button exists
    assert.ok(sauceLabBackPackRemoveToCartBtn);
    assert.equal(shoppingBadgeText, "1");

    // actions for add to cart for bike light
    await driver.actions().click(sauceLabBikeLightAddToCartBtn).perform();

    shoppingBadgeText = await driver
      .findElement(By.css(".shopping_cart_badge"))
      .getText();

    sauceLabBikeLightRemoveToCartBtn = await driver.findElement(
      By.id("remove-sauce-labs-bike-light")
    );

    // assertion if the button exists
    assert.ok(sauceLabBikeLightRemoveToCartBtn);
    assert.equal(shoppingBadgeText, "2");
  });

  it("Can able to see all the items in a cart", async function () {
    // Intializing element...
    let shoppingCartButton = await driver.findElement(
      By.id("shopping_cart_container")
    );
    let sauceLabBackPackAddToCartBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-backpack")
    );
    let sauceLabBikeLightAddToCartBtn = await driver.findElement(
      By.id("add-to-cart-sauce-labs-bike-light")
    );

    // actions
    await driver.actions().click(sauceLabBackPackAddToCartBtn).perform();

    // actions for add to cart for bike light
    await driver.actions().click(sauceLabBikeLightAddToCartBtn).perform();

    await driver.actions().click(shoppingCartButton).perform();

    // initialize element
    let myCart = await driver.getCurrentUrl();
    let cartItems = await driver.findElements(By.className("cart_item"));
    let itemLength = cartItems.length;

    // assert the url and the length of the cart
    await assert.ok(myCart.toString().includes("/cart.html"));
    expect(itemLength).to.equal(2);
  });
});
