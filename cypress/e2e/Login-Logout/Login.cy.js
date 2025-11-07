describe('Positive Login Test', () => {
    it('Success Login', () => {
        cy.intercept('GET', '**/api/v2/dashboard/employees/locations**').as('getlocations')
        cy.login('Admin', 'admin123')

        cy.wait('@getlocations')

        cy.wait(2000)
        cy.url().should('contain', '/dashboard')
        cy.get('.oxd-topbar-header-breadcrumb > .oxd-text').should('be.visible')
    })
})

describe('Negative Login Test', () => {
    it('Failed Login with Invalid Username', () => {
        cy.intercept('GET', '**/auth/login**').as('getloginpage')
        cy.login('xxxxx', 'admin123')

         cy.wait('@getloginpage')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    it('Failed Login with Invalid Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessage')
        cy.login('Admin', 'xxxxx')

        cy.wait('@getmessage')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })

    it('Failed Login with Empty Username', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessageemptyuser')
        cy.visit('https://opensource-demo.orangehrmlive.com')

        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').type('admin123')
        cy.get('.oxd-button').click()

        cy.wait('@getmessageemptyuser')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')

    })

    it('Failed Login with Empty Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessageemptypass')
        cy.visit('https://opensource-demo.orangehrmlive.com')
    

        cy.get(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').type('Admin')
        cy.get('.oxd-button').click()

        cy.wait('@getmessageemptypass')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')

    })

    it('Failed Login with Empty Username & Password', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessageemptyboth')
        cy.visit('https://opensource-demo.orangehrmlive.com')
        
        cy.get('.oxd-button').click()

        cy.wait('@getmessageemptyboth')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')

    })

    it('Failed Login with Valid Username & Password in Uppercase', () => {
        cy.intercept('GET', '**/core/i18n/messages**').as('getmessagepassupper')
        cy.login('ADMIN', 'ADMIN123')

        cy.wait('@getmessagepassupper')
        cy.wait(2000)
        cy.url().should('include', '/login')
        cy.get('.oxd-button').should('be.visible')
    })
}) 