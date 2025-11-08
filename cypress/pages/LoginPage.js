class LoginPage {

    visit() {
        cy.visit('https://opensource-demo.orangehrmlive.com')
    }

    getUsernameField() {
        return cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }

    getPasswordField() {
        return cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input')
    }

    getLoginButton() {
        return cy.get('.oxd-button')
    }

    // ====== Tambahan: INTERCEPT METHODS ======
    interceptDashboard() {
        cy.intercept('GET', '**/api/v2/dashboard/employees/locations**').as('getLocations')
    }

    interceptLoginPage() {
        cy.intercept('GET', '**/auth/login**').as('getLoginPage')
    }

    interceptMessages(aliasName = 'getMessages') {
        cy.intercept('GET', '**/core/i18n/messages**').as(aliasName)
    }

    // ====== Aksi Login ======
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
}

export default new LoginPage()
