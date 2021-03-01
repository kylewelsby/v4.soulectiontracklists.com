context('Root', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.shouldHaveHeaderAndFooter()
  })

  it('boots', () => {
    cy.get('body').should('exist')
  })

  it('shows the latest show', () => {
    cy.get('.latest-show__play-btn').click()
    cy.get('.latest-show__title')
      .invoke('text')
      .then((latestShow) => {
        cy.waitFor('.player__display', () => {
          cy.get('.player-display__show-title').should(
            'contain.text',
            latestShow
          )
        })
      })
  })
})
