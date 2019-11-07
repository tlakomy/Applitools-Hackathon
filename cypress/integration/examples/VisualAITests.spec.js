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

context('Applitools Hackathon - Login Page', () => {
    beforeEach(() => {
        cy.visit(HACKATHON_APP_URL);
    });

    context('UI elements', () => {
        it.only('Should contain all necessary login page UI elements', () => {
            cy.eyesOpen();
            cy.get(loginLogo).should('have.attr', 'src', 'img/logo-big.png');

            cy.get('label').contains('Username');

            cy.get(loginUsernameInput).should('have.attr', 'placeholder');

            cy.get('label').contains('Pwd');

            cy.get(loginPasswordInput).should('have.attr', 'placeholder');

            cy.get(loginButton).contains('Log In');

            cy.get(loginRememberMeLabel).contains('Remember Me');

            cy.get(loginSocialMediaButtons)
                .eq(0)
                .should('have.attr', 'src', 'img/social-icons/twitter.png');
            cy.get(loginSocialMediaButtons)
                .eq(1)
                .should('have.attr', 'src', 'img/social-icons/facebook.png');
        });
    });

    context('Login functionality', () => {
        it('Should show an error if users tries to log in without providing the username and password', () => {
            cy.get(loginButton).click();

            cy.get(loginAlertWarning).should('contain.text');
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

            cy.url().should('contain');
            cy.contains('Financial Overview');
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
        transactions.forEach(({ description, amount }) =>
            cy
                .contains(description)
                .closest('tr')
                .within(() =>
                    cy.get('td:last-child').should('contain.text', amount)
                )
        );

    beforeEach(() => {
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

        validateAmounts();

        cy.get(amountTableCell).each((amount, index) =>
            expect(toNumber(amount[0].innerText)).to.equal(sortedAmounts[index])
        );
    });
});

context('Applitools Hackathon - Canvas Chart', () => {});

context('Applitools Hackathon - Dynamic Content', () => {
    beforeEach(() => {
        cy.visit(`${HACKATHON_APP_URL}?showAd=true`);
        cy.get(loginUsernameInput).type(USERNAME);
        cy.get(loginPasswordInput).type(PASSWORD);
        cy.get(loginButton).click();
    });

    it('shows two Flash Sale GIFs', () => {
        cy.get(flashSaleGifOne).should('have.attr', 'src', 'img/flashSale.gif');
        cy.get(flashSaleGifTwo).should(
            'have.attr',
            'src',
            'img/flashSale2.gif'
        );
    });
});
