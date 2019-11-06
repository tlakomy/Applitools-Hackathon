/// <reference types="Cypress" />

context('Applitools Hackathon - traditional tests V1', () => {
    beforeEach(() => {
        cy.visit('https://demo.applitools.com/hackathon.html');
    });

    it('Should contain all necessary login page UI elements', () => {
        // Verify the page header
        cy.get('.logo-w img').should('have.attr', 'src', 'img/logo-big.png');
        cy.get('.auth-header').contains('Login Form');

        // Verify if icons are displayed
        cy.get('.os-icon-user-male-circle');
        cy.get('.os-icon-fingerprint');

        // Verify the login form
        cy.get('label').contains('Username');
        cy.get('input#username').should(
            'have.attr',
            'placeholder',
            'Enter your username'
        );

        cy.get('label').contains('Password');
        cy.get('input#password').should(
            'have.attr',
            'placeholder',
            'Enter your password'
        );

        cy.get('#log-in').contains('Log In');
        cy.get('.form-check-label').contains('Remember Me');

        // Verify the social media links
        cy.get('.buttons-w img')
            .eq(0)
            .should('have.attr', 'src', 'img/social-icons/twitter.png');
        cy.get('.buttons-w img')
            .eq(1)
            .should('have.attr', 'src', 'img/social-icons/facebook.png');
        cy.get('.buttons-w img')
            .eq(2)
            .should('have.attr', 'src', 'img/social-icons/linkedin.png');
    });
});
