// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('shouldHaveHeaderAndFooter', () => {
  cy.get('header.site-header').should('include.text', 'Soulection')
  cy.get('footer.site-footer')
    .should(
      'contain.text',
      'Soulection Tracklists is developed and maintained independently with love by'
    )
    .should('contain.text', 'Kyle Welsby')
    .should(
      'contain.text',
      'Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License'
    )
})
