describe('cypress demo', () => {
  it('renders the default element on the screen', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="cypress-title"]').should('exist')

  })

})