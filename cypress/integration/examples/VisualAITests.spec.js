import { selectors as loginSelectors } from "../../selectors/login";
import { selectors as expensesSelectors } from "../../selectors/expenses";

const {
  loginLogo,
  loginHeader,
  loginUsernameIcon,
  loginPasswordIcon,
  loginUsernameInput,
  loginPasswordInput,
  loginButton,
  loginRememberMeLabel,
  loginSocialMediaButtons,
  loginAlertWarning
} = loginSelectors;

const {
  amountSortButton,
  amountTableCell,
  flashSaleGifOne,
  flashSaleGifTwo
} = expensesSelectors;

const USERNAME = "admin";
const PASSWORD = "SuperSecretPassw0rd";
const HACKATHON_APP_URL = "https://demo.applitools.com/hackathonV2.html";
// Uncomment that two switch between V1 and V2 of the app
// const HACKATHON_APP_URL = "https://demo.applitools.com/hackathon.html";

function openEyes(testName) {
  cy.eyesOpen({
    appName: "VisualAITests",
    testName,
    browser: { width: 1366, height: 768, name: "chrome" },
    batchName: "VisualAITests.spec"
  });
}

function visitAndLogin(url = HACKATHON_APP_URL) {
  cy.visit(url);
  cy.get(loginUsernameInput).type(USERNAME);
  cy.get(loginPasswordInput).type(PASSWORD);
  cy.get(loginButton).click();
}

context("Login Page", () => {
  beforeEach(() => {
    cy.visit(HACKATHON_APP_URL);
  });

  afterEach(() => {
    cy.eyesClose();
  });

  context("UI elements", () => {
    it("Should contain all necessary login page UI elements", function() {
      openEyes(this.test.fullTitle());
      cy.eyesCheckWindow("Login Page");
    });
  });

  context("Login functionality", () => {
    it("Should show an error if users tries to log in without providing the username and password", function() {
      openEyes(this.test.fullTitle());
      cy.get(loginButton).click();

      cy.eyesCheckWindow("Login Page");
    });

    it("Should show an error if users tries to log in without providing a password", function() {
      openEyes(this.test.fullTitle());
      cy.get(loginUsernameInput).type(USERNAME);
      cy.get(loginButton).click();

      cy.eyesCheckWindow("Login Page");
    });

    it("Should show an error if users tries to log in without providing a username", function() {
      openEyes(this.test.fullTitle());
      cy.get(loginPasswordInput).type(PASSWORD);
      cy.get(loginButton).click();

      cy.eyesCheckWindow("Login Page");
    });

    it("Should allow the user to log in after providing username and password", function() {
      openEyes(this.test.fullTitle());
      cy.get(loginUsernameInput).type(USERNAME);
      cy.get(loginPasswordInput).type(PASSWORD);
      cy.get(loginButton).click();

      cy.eyesCheckWindow("Login Page");
    });
  });
});

context("Table Sort", () => {
  it("Should allow the user to sort values in ascending/descending order with data intact", function() {
    visitAndLogin();

    openEyes(this.test.fullTitle());
    cy.get(amountSortButton).click();

    cy.eyesCheckWindow("Table Sort");
    cy.eyesClose();
  });
});

context("Canvas Chart", () => {
  it("Should allow the user to compare data from 2 years and to add another dataset", function() {
    visitAndLogin();
    cy.contains("Compare Expenses").click();
    openEyes(this.test.fullTitle());
    cy.wait(3000);
    cy.eyesCheckWindow("Canvas Chart - 2017-2018");

    cy.contains("Show data for next year").click();
    cy.wait(3000);
    cy.eyesCheckWindow("Canvas Chart - including 2019");
    cy.eyesClose();
    // TBH it's not fair how easy it is to test this with Applitools, I'm really impressed!
  });
});

context("Dynamic Content", () => {
  it("shows two Flash Sale GIFs", function() {
    visitAndLogin(`${HACKATHON_APP_URL}?showAd=true`);
    openEyes(this.test.fullTitle());

    cy.eyesCheckWindow("Flash Sale GIFs");

    cy.eyesClose();
  });
});
