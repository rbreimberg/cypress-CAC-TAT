

describe('Central de Atendimento ao Cliente TAT', function() {
  //(beforeEach)=Comando para iniciar uma açao sempre a frente de cada teste it
  beforeEach(function () {
    cy.visit('./src/index.html')
  })
    it('Verifica o título da aplicação', function() {
      //(be.equal)=buscar um elemento igual o descrito.
      //(cy.visit)=buscar o elemento aba de navegaçao da pagina
      cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })
    it('Preenche os campos obrigatórios e envia o formulário', function() {
      //(cy.get)= busca um elemento css na pagina do navegador
      //(cy.type)= digita um texto
      cy.get('#firstName').type('Rodrigo')
      cy.get('#lastName').type('Barbosa')
      cy.get('#email').type('rodrigo@exemplo.com')
      cy.get('#open-text-area').type('Teste')
      //(cy.contains) é um novo jeito de identificar elementos para inspecionar
      cy.contains('button', 'Enviar').click()
      //(be.visible)=verifica se o elemento se encontra visivel na aplicação 
      cy.get('.success').should('be.visible')
    })
    it('Email com formatação inválida', function() {
      cy.get('#firstName').type('Rodrigo')
      cy.get('#lastName').type('Barbosa')
      cy.get('#email').type('rodrigo@exemplo,com')
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })
    it('Telefone com formatação inválida', function() {
      cy.get('#firstName').type('Rodrigo')
      cy.get('#lastName').type('Barbosa')
      cy.get('#email').type('rodrigo@exemplo.com')
      cy.get('#open-text-area').type('Teste')
      cy.get('#phone').type('AHJKU*&%¨%$#+-;.,').should('have.value', '')
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')

    })
    it('CheckBox telefone selecionado mas não informado', function() {
      cy.get('#firstName').type('Rodrigo')
      cy.get('#lastName').type('Barbosa')
      cy.get('#email').type('rodrigo@exemplo.com')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })
    it('CheckBox telefone selecionado e informado', function() {
      cy.get('#firstName').type('Rodrigo')
      cy.get('#lastName').type('Barbosa')
      cy.get('#email').type('rodrigo@exemplo.com')
      cy.get('#phone').type('11999999999')
      cy.get('#phone-checkbox').click()
      cy.get('#open-text-area').type('Teste')
      cy.contains('button', 'Enviar').click()
      cy.get('.success').should('be.visible')
    })
    it('Nenhum campo obrigatório preenchido',function() {
      cy.contains('button', 'Enviar').click()
      cy.get('.error').should('be.visible')
    })
    it('Envia o formuário com sucesso usando um comando customizado', function() {
      //Comando customizado 
      cy.fillMandatoryFieldsAndSubmit()
      cy.get('.success').should('be.visible')
    })
    it('Seleciona um produto (YouTube) por seu texto', function() {
      //(select) selecionar um elemento pelo texto
      //(have.value) verifica uma informaçao pelo seu valor ex: Deve haver o valor mentoria
      cy.get('#product').select('YouTube').should('have.value', 'youtube')
    })
    it('Seleciona um produto (Mentoria) por seu valor (value)', function() {
      cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    })
    it('Seleciona um produto (Blog) por seu índice', function() {
      cy.get('#product').select(1).should('have.value', 'blog')
    })
    it('Marca o tipo de atendimento "Feedback"', function() {
      //(.check) seleciona ckeckboxes e os marca (.uncheck) Desmarca checkboxes
      cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    })
    it('Seleciona um arquivo da pasta fixtures', function() {
      //(.selectFile) adiciona um arquivo a aplicação
      cy.get('#file-upload').should('not.have.value').selectFile('./cypress/fixtures/example.json')
    })
    
  })