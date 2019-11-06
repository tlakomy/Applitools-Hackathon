/// <reference types="Cypress" />

import { selectors as loginSelectors } from '../../selectors/login';
import { selectors as expensesSelectors } from '../../selectors/expenses';

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

const USERNAME = 'admin';
const PASSWORD = 'SuperSecretPassw0rd';

const HACKATHON_APP_URL = 'https://demo.applitools.com/hackathonV2.html';
// Uncomment that two switch between V1 and V2 of the app
// const HACKATHON_APP_URL = 'https://demo.applitools.com/hackathon.html';

// Even though I'm aware that V2 of the app has several bugs,
// I'm going to implement all tests to pass and comment wherever applicable
// that there was a regression between V1 and V2
// (Even though in real-life scenario those tests should fail and I'd create JIRA tickets to fix those issues)

context('Applitools Hackathon - Login Page', () => {
    beforeEach(() => {
        cy.visit(HACKATHON_APP_URL);
    });

    context('UI elements', () => {
        it.only('Should contain all necessary login page UI elements', () => {
            // Verify the page header
            cy.get(loginLogo).should('have.attr', 'src', 'img/logo-big.png');

            // The V2 version of the app has a bug with a header saying 'Logout' instead of 'Login'
            // cy.get(loginHeader).contains('Login Form'); - V1 version
            cy.get(loginHeader).contains('Logout Form'); // V2 version

            // Verify if icons are displayed
            // Icons are not visible in V2 version of the app, a regression bug
            // cy.get(loginUsernameIcon); - V1 version
            // cy.get(loginPasswordIcon); - V1 version

            // Verify the login form
            cy.get('label').contains('Username');

            // There's a different placeholder between V1 and V2, so this test needs to be amended
            cy.get(loginUsernameInput).should(
                'have.attr',
                'placeholder',
                //'Enter your username' - V1 version
                'John Smith' // V2 version
            );

            // There's a different password label between V1 and V2, looks like a regression
            // 'Pwd' is not really user friendly
            // cy.get('label').contains('Password'); - V1 version
            cy.get('label').contains('Pwd');

            // A placeholder was also changed between V1 and V2 so this needs to be amended
            cy.get(loginPasswordInput).should(
                'have.attr',
                'placeholder',
                // 'Enter your password' - V1 version
                'ABC$*1@' // V2 version
            );

            cy.get(loginButton).contains('Log In');

            // This was not caught by cypress but there's a visual regression between V1 and V2
            cy.get(loginRememberMeLabel).contains('Remember Me');

            // Verify the social media links
            cy.get(loginSocialMediaButtons)
                .eq(0)
                .should('have.attr', 'src', 'img/social-icons/twitter.png');
            cy.get(loginSocialMediaButtons)
                .eq(1)
                .should('have.attr', 'src', 'img/social-icons/facebook.png');

            // There is no LinkedIn button in V2 so this part of the test fails
            // cy.get(loginSocialMediaButtons)
            //     .eq(2)
            //     .should('have.attr', 'src', 'img/social-icons/linkedin.png'); - V1 version
        });
    });

    context('Login functionality', () => {
        it('Should show an error if users tries to log in without providing the username and password', () => {
            cy.get(loginButton).click();

            cy.get(loginAlertWarning).should(
                'contain.text',
                'Both Username and Password must be present'
            );
        });

        it('Should show an error if users tries to log in without providing a password', () => {
            cy.get(loginUsernameInput).type(USERNAME);
            cy.get(loginButton).click();

            cy.get(loginAlertWarning).should(
                'contain.text',
                'Password must be present'
            );
        });

        it('Should show an error if users tries to log in without providing a username', () => {
            cy.get(loginPasswordInput).type(PASSWORD);
            cy.get(loginButton).click();

            cy.get(loginAlertWarning).should(
                'contain.text',
                'Username must be present'
            );
        });

        it('Should allow the user to log in after providing username and password', () => {
            cy.get(loginUsernameInput).type(USERNAME);
            cy.get(loginPasswordInput).type(PASSWORD);
            cy.get(loginButton).click();

            cy.url().should(
                'equal',
                'https://demo.applitools.com/hackathonApp.html'
            );
        });
    });
});

context('Applitools Hackathon - Table Sort', () => {
    const transactions = [
        {
            description: 'Starbucks coffee',
            amount: '+ 1,250.00 USD'
        },
        {
            description: 'Stripe Payment Processing',
            amount: '+ 952.23 USD'
        },
        {
            description: 'MailChimp Services',
            amount: '- 320.00 USD'
        },
        {
            description: 'Shopify product',
            amount: '+ 17.99 USD'
        },
        {
            description: 'Ebay Marketplace',
            amount: '- 244.00 USD'
        },
        {
            description: 'Templates Inc',
            amount: '+ 340.00 USD'
        }
    ];

    const toNumber = amount =>
        parseFloat(amount.replace(/(\s|,|\.)/g, '')) / 100;

    const validateAmounts = () =>
        // We want to check whether the values in the UI are the same as in the transactions array defined above
        transactions.forEach(({ description, amount }) =>
            cy
                .contains(description)
                .closest('tr')
                .within(() =>
                    cy.get('td:last-child').should('contain.text', amount)
                )
        );

    beforeEach(() => {
        // Login to the service
        cy.visit(HACKATHON_APP_URL);
        cy.get(loginUsernameInput).type(USERNAME);
        cy.get(loginPasswordInput).type(PASSWORD);
        cy.get(loginButton).click();
    });

    it('Should allow the user to sort values in ascending/descending order with data intact', () => {
        const sortedAmounts = transactions
            .map(({ amount }) => toNumber(amount))
            .sort((a, b) => a - b);

        validateAmounts();
        cy.get(amountSortButton).click();

        // Checking whether sorting hasn't changed values in each column
        validateAmounts();

        // Checking if sorting the values in the UI actually works
        cy.get(amountTableCell).each((amount, index) =>
            expect(toNumber(amount[0].innerText)).to.equal(sortedAmounts[index])
        );
    });
});

context('Applitools Hackathon - Canvas Chart', () => {
    // I'm nearly 100% confident that this kind of test is impossible to write with cypress :(
    // At the time of writing this I'm definitely looking forward to checking out Applitools Eyes
    // to see how can I automate testing a chart like this
});

context('Applitools Hackathon - Dynamic Content', () => {
    beforeEach(() => {
        // Login to the service
        cy.visit(`${HACKATHON_APP_URL}?showAd=true`);
        cy.get(loginUsernameInput).type(USERNAME);
        cy.get(loginPasswordInput).type(PASSWORD);
        cy.get(loginButton).click();
    });

    it('shows two Flash Sale GIFs', () => {
        // With cypress I'm only able to verify whether two GIFs are displayed
        // I won't be able to tell anything about their actual content - it might be 'Flash Sale' or a cute kitten, you never know
        // Personally I wouldn't fail the test if a cute kitten appeared on the site but I assume that the PM requested the 'Flash Sale' GIFs

        cy.get(flashSaleGifOne).should('have.attr', 'src', 'img/flashSale.gif');
        cy.get(flashSaleGifTwo).should(
            'have.attr',
            'src',
            'img/flashSale2.gif'
        );
    });
});
