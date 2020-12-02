/// <reference types="cypress" />

context('Episode/show', () => {
  beforeEach(() => {
    cy.visit('/episodes/395')
  })

  describe('hero', () => {
    it('displays as expected', () => {
      cy.get('.episode__hero').within(() => {
        cy.contains('Show #395')
        cy.contains('Feb 16, 2019')
        cy.contains('Live from United States')
        cy.contains(
          'JRocc co-hosts Joe Kay with this special J Dilla tribute session.'
        )
        cy.contains('58 tracks')
        cy.get('img').should('have.attr', 'src').should('include', '395.jpg')
      })
    })
  })

  describe('tracklist', () => {
    it('displays as expected', () => {
      cy.get('.episode__tracklist').within(() => {
        cy.get('.episode__session').within(() => {
          cy.get('h4').should('have.text', "JRocc's Session")
          cy.get('.episode__track').within(() => {
            cy.get('a.order-3')
              .should('have.attr', 'href')
              .should('includes', '/artists/janet-jackson')
            cy.get('a.order-2')
              .should('have.attr', 'href')
              .should(
                'includes',
                '/artists/janet-jackson/tracks/got-til-it-s-gone-ummah-jay-dee-s-revenge-mix'
              )
            cy.contains('Janet Jackson')
            cy.contains("Got 'Til It's Gone (Ummah Jay Dee's Revenge Mix)")
            cy.contains('00:00:20')
            cy.get('.bg-default-image').contains('1')
            cy.get('.bg-default-image img')
              .should('have.attr', 'src')
              .should(
                'include',
                '/image/v1551123319/images/artists/janet-jackson/tracks/got-til-it-s-gone-ummah-jay-dee-s-revenge-mix.jpg'
              )
          })
        })
      })
    })
  })
})
