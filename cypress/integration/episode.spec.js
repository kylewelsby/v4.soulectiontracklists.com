context('Episode', () => {
  beforeEach(() => {
    cy.visit('/episodes/7')
    cy.shouldHaveHeaderAndFooter()
  })

  it('loads show #7', () => {
    cy.get('body').should('exist')
    cy.title().should('eq', 'Soulection Radio Show #7 | Soulection')
    cy.get('body').contains('Soulection Radio Show #7')
  })

  it('has link to Apple & Amazon Music', () => {
    cy.contains('Computa Love').click()
    cy.get(':nth-child(2) > .tracking-tighter').should(
      'contain.text',
      'Computa Love'
    )
    cy.get('.track-link--appleMusic').should(
      'have.attr',
      'href',
      'https://music.apple.com/us/album/computa-love/351564353?i=351564363&uo=4&at=1010lMz4&app=music'
    )
    cy.get('.track-link--amazonMusic').should(
      'have.attr',
      'href',
      'https://www.amazon.co.uk/Computa-Love/dp/B0035LR8ZQ?tag=soulectiontracklists-21'
    )
  })
})
