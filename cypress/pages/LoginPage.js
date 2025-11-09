class LoginPage {

    // ==== NAVIGATION ====
    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com')
    }

    // ==== ELEMENTS ====
    getUsernameField() {
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }

    getPasswordField() {
        return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }

    getLoginButton() {
        return cy.get('.oxd-button')
    }

    getDashboardBreadcrumb() {
        return cy.get('.oxd-topbar-header-breadcrumb > .oxd-text')
    }

    // ==== INTERCEPTS ====
    interceptDashboard() {
        cy.intercept('GET', '**/api/v2/dashboard/employees/locations**').as('getLocations')
    }

    interceptLoginPage() {
        cy.intercept('GET', '**/auth/login**').as('getLoginPage')
    }

    interceptMessages(aliasName = 'getMessages') {
        cy.intercept('GET', '**/core/i18n/messages**').as(aliasName)
    }

    // ==== ACTIONS ====
    enterUsername(username) {
        if (username !== '') {
            this.getUsernameField().type(username)
        }
    }

    enterPassword(password) {
        if (password !== '') {
            this.getPasswordField().type(password)
        }
    }

    clickLoginButton() {
        this.getLoginButton().click()
    }

    login(username, password) {
        this.visit()
        this.enterUsername(username)
        this.enterPassword(password)
        this.clickLoginButton()
    }

    // ==== ASSERTIONS ====
    verifyDashboardPage() {
        cy.url().should('contain', '/dashboard')
        this.getDashboardBreadcrumb().should('be.visible')
    }

    verifyLoginPage() {
        cy.url().should('include', '/login')
        this.getLoginButton().should('be.visible')
    }
}

export default new LoginPage()
