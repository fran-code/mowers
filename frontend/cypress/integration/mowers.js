import { getFinalPosition } from '../../src/utils/helpers'

describe('Calculate mower position', () => {

    it('should allow a typical user flow', () => {
        cy.visit('http://localhost:3000')
        cy.intercept('POST', 'http://localhost:4003/mower/calculateRoutes').as('apiCheck')

        cy.get('.mowersForm').within(() => {
            clickButton('Add Mower')
            fillInputNumber('Size X', 5)
            fillInputNumber('Size Y', 5)
            cy.contains('div', 'Mower 1').within(() => {
                fillInputNumber('Position X', 1)
                fillInputNumber('Position Y', 2)
                fillSelect('Direction', 'N')
                fillInput('Path', 'LMLMLMLMM')
            })
            cy.contains('div', 'Mower 2').within(() => {
                fillInputNumber('Position X', 3)
                fillInputNumber('Position Y', 3)
                fillSelect('Direction', 'E')
                fillInput('Path', 'MMRMMRMRRM')
            })
            clickButton('Calculate')
        })

        cy.wait("@apiCheck").then((interception) => {
            const routes = interception.response.body.message.routes
            const firstMower = getFinalPosition(routes[0])
            const secondMower = getFinalPosition(routes[1])
            expect(firstMower).to.equal("1 3 N")
            expect(secondMower).to.equal("5 1 E")
        })
    })
})

const fillInput = (label, value) => cy.contains('div', label).find('input').first().type(value)
const fillInputNumber = (label, value) => cy.contains('div', label).find('input').first().invoke('val', 0).type(value)
const fillSelect = (label, value) => cy.contains('div', label).find('select').first().select(value)
const clickButton = label => cy.contains('button', label).click()