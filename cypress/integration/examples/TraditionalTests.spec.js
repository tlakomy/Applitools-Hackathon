/// <reference types="Cypress" />

import { selectors as loginSelectors } from '../../selectors/login';

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

context('Applitools Hackathon - traditional tests V1', () => {
    beforeEach(() => {
        cy.visit('https://demo.applitools.com/hackathon.html');
    });

    context('UI elements', () => {
        it('Should contain all necessary login page UI elements', () => {
            // Verify the page header

            cy.get(loginLogo).should('have.attr', 'src', 'img/logo-big.png');
            cy.get(loginHeader).contains('Login Form');

            // Verify if icons are displayed
            cy.get(loginUsernameIcon);
            cy.get(loginPasswordIcon);

            // Verify the login form
            cy.get('label').contains('Username');
            cy.get(loginUsernameInput).should(
                'have.attr',
                'placeholder',
                'Enter your username'
            );

            cy.get('label').contains('Password');
            cy.get(loginPasswordInput).should(
                'have.attr',
                'placeholder',
                'Enter your password'
            );

            cy.get(loginButton).contains('Log In');
            cy.get(loginRememberMeLabel).contains('Remember Me');

            // Verify the social media links
            cy.get(loginSocialMediaButtons)
                .eq(0)
                .should('have.attr', 'src', 'img/social-icons/twitter.png');
            cy.get(loginSocialMediaButtons)
                .eq(1)
                .should('have.attr', 'src', 'img/social-icons/facebook.png');
            cy.get(loginSocialMediaButtons)
                .eq(2)
                .should('have.attr', 'src', 'img/social-icons/linkedin.png');
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
            cy.get(loginUsernameInput).type('admin');
            cy.get(loginButton).click();

            cy.get(loginAlertWarning).should(
                'contain.text',
                'Password must be present'
            );
        });

        it('Should show an error if users tries to log in without providing a username', () => {
            cy.get(loginPasswordInput).type('superSecretPassw0rd');
            cy.get(loginButton).click();

            cy.get(loginAlertWarning).should(
                'contain.text',
                'Username must be present'
            );
        });

        it('Should allow the user to log in after providing username and password', () => {
            cy.get(loginUsernameInput).type('admin');
            cy.get(loginPasswordInput).type('superSecretPassw0rd');
            cy.get(loginButton).click();

            cy.url().should(
                'equal',
                'https://demo.applitools.com/hackathonApp.html'
            );
        });
    });
});
