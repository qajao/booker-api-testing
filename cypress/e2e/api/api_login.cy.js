describe('Login API', () => {   
    

    it('Autenticação com sucesso', () => {

        // api para gerar token de autenticacao
        cy.getAuth(Cypress.env('username'), Cypress.env('password'))
            .then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body).to.have.property('token') // verificar se exite a variavel token dentro do body
                expect(body.token).to.exist // verifica se a variavel token tem algum valor                
            })
    })

    it('Autenticação com falha', () => {
        cy.getAuth(Cypress.env('username_failure'), Cypress.env('password_failure'))
            .then(({ status, body }) => {
                expect(status).to.eq(200)
                expect(body.reason).to.eq('Bad credentials')
            })
    })

})