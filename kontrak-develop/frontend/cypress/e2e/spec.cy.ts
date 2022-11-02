
Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false
})
describe('login', () => {
  it('login success ', () => {
    cy.login('mnguni@gmail.com', '1234567')
  })

  it('login  fail', () => {
    cy.login('mnguni@gmail.com', 'fa12323il')
  })

  it('validation', () => {
    cy.login('.', '.')
  })


  
  it('register route', () => {
    cy.get('[name="registerRoute"]').click()
  })

})
