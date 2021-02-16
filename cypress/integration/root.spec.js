context('Root', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('boots', () => {
    cy.get('body').should('exist')
  })
})
