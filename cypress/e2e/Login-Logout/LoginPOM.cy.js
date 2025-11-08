import LoginPage from '../../pages/LoginPage'
import { LoginData } from '../../data/LoginData'

describe('Login Test Suite with POM', () => {

    // Positive Test
    it('Success Login', () => {
        cy.intercept('GET', '**/api/v2/dashboard/employees/locations**').as('getlocations')
        LoginPage.login(LoginData.validUser.username, LoginData.validUser.password)
        cy.wait('@getlocations')
        cy.wait(2000)
        cy.url().should('contain', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    })

    // Negative Test: Invalid Username
    it('Failed Login with Invalid Username', () => {
        cy.intercept('GET', '**/auth/login**').as('getloginpage')
        LoginPage.login(LoginData.invalidUser.username, LoginData.invalidUser.password)
        cy.wait('@getloginpage')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    // Negative Test: Invalid Password
    it('Failed Login with Invalid Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessage')
        LoginPage.login(LoginData.invalidPassword.username, LoginData.invalidPassword.password)
        cy.wait('@getmessage')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    // Negative Test: Empty Username
    it('Failed Login with Empty Username', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessageemptyuser')
        LoginPage.login(LoginData.emptyUser.username, LoginData.emptyUser.password)
        cy.wait('@getmessageemptyuser')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    // Negative Test: Empty Password
    it('Failed Login with Empty Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessageemptypass')
        LoginPage.login(LoginData.emptyPassword.username, LoginData.emptyPassword.password)
        cy.wait('@getmessageemptypass')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    // Negative Test: Empty Both
    it('Failed Login with Empty Username & Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessageemptyboth')
        LoginPage.login(LoginData.emptyBoth.username, LoginData.emptyBoth.password)
        cy.wait('@getmessageemptyboth')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    // Negative Test: Uppercase Credentials
    it('Failed Login with Uppercase Username & Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessagepassupper')
        LoginPage.login(LoginData.uppercaseUserPass.username, LoginData.uppercaseUserPass.password)
        cy.wait('@getmessagepassupper')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })
})
