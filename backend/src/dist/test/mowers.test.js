"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mower_1 = require("../src/controllers/mower");
const dataTest = {
    sizeX: 5,
    sizeY: 5,
    mowers: [
        { position: { posX: 1, posY: 2, direction: 'N' }, path: 'LMLMLMLMM' },
        { position: { posX: 3, posY: 3, direction: 'E' }, path: 'MMRMMRMRRM' }
    ]
};
describe('Test mowers function', () => {
    it('should return 2', () => {
        const response = (0, mower_1.calculateRoutesMowers)(dataTest);
        console.log("response:: ", response);
        //expect(1 + 1).to.equal(2);
    });
});
