"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const mower_1 = require("../controllers/mower");
const dataTest = {
    sizeX: 5,
    sizeY: 5,
    mowers: [
        { position: { posX: 1, posY: 2, direction: 'N' }, path: 'LMLMLMLMM' },
        { position: { posX: 3, posY: 3, direction: 'E' }, path: 'MMRMMRMRRM' }
    ]
};
const getFinalPosition = (routesMower) => {
    const lastPosition = routesMower.route[routesMower.route.length - 1];
    const posX = lastPosition[0];
    const posY = lastPosition[1];
    const direction = routesMower.direction;
    const positionMower = `${posX} ${posY} ${direction}`;
    return positionMower;
};
describe('Test mowers function', () => {
    it('should return test output', () => {
        const dataMowers = (0, mower_1.calculateRoutesMowers)(dataTest);
        const firstMower = getFinalPosition(dataMowers.routes[0]);
        const secondMower = getFinalPosition(dataMowers.routes[1]);
        (0, chai_1.expect)(firstMower).to.equal("1 3 N");
        (0, chai_1.expect)(secondMower).to.equal("5 1 E");
    });
});
