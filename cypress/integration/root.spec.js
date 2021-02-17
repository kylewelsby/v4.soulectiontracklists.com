context('Root', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.shouldHaveHeaderAndFooter()
  })

  it('boots', () => {
    cy.get('body').should('exist')
  })
})
