context('Episode', () => {
  beforeEach(() => {
    cy.visit('/episodes/7')
    cy.shouldHaveHeaderAndFooter()
  })

  it('loads show #7', () => {
    cy.get('body').should('exist')
    cy.title().should('eq', 'Show #7 | Soulection')
    cy.get('body').contains('Show #7')
  })
})
