Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function() {
    cy.get('#firstName').type('Rodrigo')
    cy.get('#lastName').type('Barbosa')
    cy.get('#email').type('rodrigo@exemplo.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})