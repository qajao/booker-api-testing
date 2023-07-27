
describe('Booking Api', () => {

    let authToken = ''

    context('Precisa de token', () => {

        before(() => {

            cy.getAuth(Cypress.env('username'), Cypress.env('password'))
                .then(({ status, body }) => {
                    expect(status).to.eq(200)
                    expect(body).to.have.property('token') // verificar se exite a variavel token dentro do body
                    expect(body.token).to.exist // verifica se a variavel token tem algum valor                      
                    authToken = body.token; // armazena o token
                })
        })

        it('Atualizar reserva', () => {
            cy.fixture('dadosUpdateBooking.json').then((dadosUpdateBooking) => {
                cy.updateBooking('10', authToken, dadosUpdateBooking)
                    .then(({ status, body }) => {
                        expect(status).to.eq(200)
                        console.log(body)

                    })
            })
        })

        it('Atualização parcial da reserva', () => {
            cy.fixture('dadosPartialUpdateBooking.json').then((dadosPartialUpdateBooking) => {
                cy.partialUpdateBooking('10', authToken, dadosPartialUpdateBooking)
                    .then(({ status, body }) => {
                        expect(status).to.eq(200)
                        console.log(body)

                    })
            })
        })

        it('Deletar reserva', () => {
            cy.partialUpdateBooking('10', authToken)
                .then(({ status, body }) => {
                    expect(status).to.eq(200)
                    console.log('aaaa')
                    console.log(body)
                })
        })

    })

    context('Não precisa de token', () => {

        it('Criar reservar', () => {
            cy.fixture('dadosCreateBooking.json').then((dadosCreateBooking) => {
                cy.createBooking(dadosCreateBooking)
                    .then(({ status, body }) => {
                        expect(status).to.eq(200)
                        expect(body).to.have.property('bookingid')
                        console.log(body)

                    })
            })
        })


        it('Consultar lista de reservas', () => {
            cy.getBooking({

                // firstname: 'Ronaldo',
                // lastname: 'Gordao',
                checkin: '2020-01-01',
                checkout: '2023-07-18'

            }).then(({ status, body }) => {
                console.log(body)
                expect(status).to.eq(200)
                expect(body).to.not.be.empty
            })
        })

        it('Consultar reservar', () => {
            cy.getBookingId(5)
                .then(({ status, body }) => {
                    console.log(body)
                    expect(status).to.eq(200)
                    expect(body).to.not.be.empty
                })
        })
    })

    context('Ping', () => {

        it('Verificar site', () => {
            cy.getHealthCheck()
                .then(({status}) => {
                    expect(status).to.eq(201)                    
                })

        })

    })

})