/// <reference types="cypress" />

context('Episode/show', () => {
  beforeEach(() => {
    cy.visit('/episodes/482')
  })

  it('displays as expected', () => {
    cy.contains('Show #482')
    cy.contains('Nov 14, 2020')
    cy.contains('Live from Puntarenas Province, Costa Rica')
    cy.contains('54 tracks')
    cy.get('img.self-center')
      .should('have.attr', 'src')
      .should('include', '482.jpg')
  })
})
