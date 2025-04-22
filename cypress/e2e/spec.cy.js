describe('template spec', () => {
  beforeEach(() => {
    cy.clearLocalStorage()
    cy.visit('/')
  })

    it('Displays different status', () => {
      cy.contains('h3', 'To Do').should('be.visible')
      cy.contains('h3', 'In Progress').should('be.visible')
      cy.contains('h3', 'QA').should('be.visible')
      cy.contains('h3', 'Live in Production').should('have.class', 'font-semibold')
    })
})