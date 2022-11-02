// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: any, password: any): typeof login;
    register(firstname: any, lastname:any, role:any, email:any, phonenumber:any, password: any, confirmPassword:any): typeof register;
  }
}
//
function login(email: any, password: any): void {
    cy.visit( 'http://localhost:4200/ ')
    cy.get('[formControlName="email"]').type(email)
    cy.get('[formControlName="password"]').type(password)
    cy.get('button').click()
}

function register(firstname: any, lastname:any, role:any, email:any, phonenumber:any, password: any, confirmPassword:any): void {
  cy.visit( 'http://localhost:4200/register ')
  cy.get('[formControlName="firstname"]').type(firstname)
  cy.get('[formControlName="lastname"]').type(lastname)
  cy.get('[formControlName="usertype"]').select(role)
  cy.get('[formControlName="password"]').type(password)
  cy.get('[formControlName="email"]').type(email)
  cy.get('[formControlName="phonenumber"]').type(phonenumber)
  cy.get('[formControlName="confirmPassword"]').type(confirmPassword)
  cy.get('button').click()
}



//
// NOTE: You can use it like so:
Cypress.Commands.add('login', login);
Cypress.Commands.add('register', register);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
