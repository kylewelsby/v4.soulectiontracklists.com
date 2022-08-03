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
    cy.get('.artwork__header__title')
      .invoke('text')
      .then((latestShow) => {
        cy.get('.player-display__show-title').should('contain.text', latestShow)
        cy.get('.player__controls__toggle-button svg path').should(
          'have.attr',
          'data-is-playing'
        )

        cy.get('.player__controls__toggle-button').click()
        cy.get('.player__controls__toggle-button svg path').should(
          'have.attr',
          'data-is-paused'
        )
      })
  })
})
