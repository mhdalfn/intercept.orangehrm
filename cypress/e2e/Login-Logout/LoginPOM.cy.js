import LoginPage from '../../pages/LoginPage'
import { LoginData } from '../../data/LoginData'

describe('Login Test Suite', () => {

    it('Success Login', () => {
        LoginPage.interceptDashboard()
        LoginPage.login(LoginData.validUser.username, LoginData.validUser.password)
        cy.wait('@getLocations')
        LoginPage.verifyDashboardPage()
    })

    it('Failed Login with Invalid Username', () => {
        LoginPage.interceptLoginPage()
        LoginPage.login(LoginData.invalidUser.username, LoginData.invalidUser.password)
        cy.wait('@getLoginPage')
        LoginPage.verifyLoginPage()
    })

    it('Failed Login with Invalid Password', () => {
        LoginPage.interceptMessages('invalidPassMsg')
        LoginPage.login(LoginData.invalidPassword.username, LoginData.invalidPassword.password)
        cy.wait('@invalidPassMsg')
        LoginPage.verifyLoginPage()
    })

    it('Failed Login with Empty Username', () => {
        LoginPage.interceptMessages('emptyUserMsg')
        LoginPage.login(LoginData.emptyUser.username, LoginData.emptyUser.password)
        cy.wait('@emptyUserMsg')
        LoginPage.verifyLoginPage()
    })

    it('Failed Login with Empty Password', () => {
        LoginPage.interceptMessages('emptyPassMsg')
        LoginPage.login(LoginData.emptyPassword.username, LoginData.emptyPassword.password)
        cy.wait('@emptyPassMsg')
        LoginPage.verifyLoginPage()
    })

    it('Failed Login with Empty Username & Password', () => {
        LoginPage.interceptMessages('emptyBothMsg')
        LoginPage.login(LoginData.emptyBoth.username, LoginData.emptyBoth.password)
        cy.wait('@emptyBothMsg')
        LoginPage.verifyLoginPage()
    })

    it('Failed Login with Uppercase Username & Password', () => {
        LoginPage.interceptMessages('upperMsg')
        LoginPage.login(LoginData.uppercaseUserPass.username, LoginData.uppercaseUserPass.password)
        cy.wait('@upperMsg')
        LoginPage.verifyLoginPage()
    })
})
