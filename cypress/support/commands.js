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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('getAuth', (username, password) => {
    cy.request({
        method: 'POST',
        url: '/auth',
        body: {
            'username': username,
            'password': password
        }
    })
})

Cypress.Commands.add('getBooking', (paramentros) => {
    cy.request({
        method: 'GET',
        url: '/booking',
        qs: paramentros
    })
})

Cypress.Commands.add('getBookingId', (bookingId) => {
    cy.request({
        method: 'GET',
        url: `/booking/${bookingId}`
    })
});

Cypress.Commands.add('createBooking', (dadosBooking) => {
    cy.request({
        method: 'POST',
        url: '/booking',
        body: dadosBooking
    })
})

Cypress.Commands.add('updateBooking', (bookingId, authToken, dadosBooking) => {
    cy.request({
        method: 'PUT',
        url: `/booking/${bookingId}`,
        headers: {
            'Cookie': `token=${authToken}`
        },
        body: dadosBooking
    })
})

Cypress.Commands.add('partialUpdateBooking', (bookingId, authToken, dadosBooking) => {
    cy.request({
        method: 'PATCH',
        url: `/booking/${bookingId}`,
        headers: {
            'Cookie': `token=${authToken}`
        },
        body: dadosBooking
    })
})

Cypress.Commands.add('deleteBooking', (bookingId, authToken) => {
    cy.request({
        method: 'DELETE',
        url: `/booking/${bookingId}`,
        headers: {
            'Cookie': `token=${authToken}`
        },
    })
})

Cypress.Commands.add('getHealthCheck', () => {
    return cy.request({
        method: 'GET',
        url: '/ping',
    })
});