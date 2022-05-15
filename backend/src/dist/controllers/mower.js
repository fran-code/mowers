"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateRoutesMowers = exports.calculateRoutes = void 0;
const helpers_1 = require("../utils/helpers");
const calculateRoutes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const routes = (0, exports.calculateRoutesMowers)(req.body);
        res.status(200).json({ message: routes });
    }
    catch (error) {
        res.status(500).json({ message: "Error!" });
    }
});
exports.calculateRoutes = calculateRoutes;
const cardinalDirections = ["N", "E", "S", "W"];
const calculateRoutesMowers = (dataFront) => {
    const { sizeX, sizeY } = dataFront;
    let mowersPosition = dataFront.mowers.map(mow => ([mow.position.posX, mow.position.posY]));
    let routes = [];
    for (let i = 0; i < dataFront.mowers.length; i++) {
        const currentMower = dataFront.mowers[i];
        let currentDirection = currentMower.position.direction;
        let currentPosition = [currentMower.position.posX, currentMower.position.posY];
        routes.push({ mowerIndex: i, route: [currentPosition], direction: currentDirection, color: (0, helpers_1.getRandomColor)(), totalCollides: 0 });
        for (let j = 0; j < currentMower.path.length; j++) {
            const currentPath = currentMower.path[j].toUpperCase();
            //Direction change
            if (["L", "R"].includes(currentPath)) {
                currentDirection = calculateTurn(currentDirection, currentPath);
                routes[i].direction = currentDirection;
            }
            //Mower moves
            if (currentPath === "M") {
                const newCurrentPosition = calculateMove(currentDirection, currentPosition, sizeX, sizeY, mowersPosition);
                if (currentPosition[0] === newCurrentPosition[0] && currentPosition[1] === newCurrentPosition[1]) {
                    routes[i].totalCollides += 1;
                }
                else {
                    currentPosition = newCurrentPosition;
                    mowersPosition[i] = newCurrentPosition;
                }
                routes[i].route = [...routes[i].route, newCurrentPosition];
            }
        }
    }
    return { routes, plateauSize: [sizeX, sizeY] };
};
exports.calculateRoutesMowers = calculateRoutesMowers;
//Calculate turn left or right
const calculateTurn = (currentDirection, currentPath) => {
    let newDirection = currentDirection;
    const indexInCardinalDirections = cardinalDirections.indexOf(currentDirection);
    if (currentPath === "L") {
        if (indexInCardinalDirections === 0)
            newDirection = cardinalDirections[cardinalDirections.length - 1];
        else
            newDirection = cardinalDirections[indexInCardinalDirections - 1];
    }
    if (currentPath === "R") {
        if (indexInCardinalDirections === 3)
            newDirection = cardinalDirections[0];
        else
            newDirection = cardinalDirections[indexInCardinalDirections + 1];
    }
    return newDirection;
};
const calculateMove = (direction, position, sizeX, sizeY, mowersPosition) => {
    let newPosition;
    switch (direction) {
        case "N":
            newPosition = [position[0], position[1] + 1];
            break;
        case "E":
            newPosition = [position[0] + 1, position[1]];
            break;
        case "S":
            newPosition = [position[0], position[1] - 1];
            break;
        case "W":
            newPosition = [position[0] - 1, position[1]];
            break;
        default:
            newPosition = position;
            break;
    }
    //It does not move forward because it collides with an end
    if (newPosition[0] > sizeX || newPosition[0] < 0 || newPosition[1] > sizeY || newPosition[1] < 0)
        newPosition = position;
    //It does not move forward because it collides with another mower
    mowersPosition.forEach(mow => {
        if (mow[0] === newPosition[0] && mow[1] === newPosition[1])
            newPosition = position;
    });
    return newPosition;
};
