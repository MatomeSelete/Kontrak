
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })
  describe('register', () => {
    it('register success ', () => {
      cy.register('king','law','Client', 'king@gmail.com','0634340000', 1234567,123456)
    })
    it('validation email ', () => {
        cy.register('king','law','Client', 'kigil.com','0634340000', 1234567,123456)
      })
      it('validation number ', () => {
        cy.register('king','law','Client', 'king@hil.com','064000', 1234567,123456)
      })
  })
