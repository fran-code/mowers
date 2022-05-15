import { Request, Response } from 'express'
import { IMowers, IRoutes, IReturnApiMower } from '../utils/interfaces'
import { getRandomColor } from '../utils/helpers'

export const calculateRoutes = async (req: Request, res: Response) => {
    try {
        const routes = calculateRoutesMowers(req.body)
        res.status(200).json({ message: routes })
    } catch (error) {
        res.status(500).json({ message: "Error!" })
    }
}

const cardinalDirections = ["N", "E", "S", "W"]

export const calculateRoutesMowers = (dataFront: IMowers): IReturnApiMower => {
    
    const { sizeX, sizeY } = dataFront
    let mowersPosition = dataFront.mowers.map(mow => ([mow.position.posX, mow.position.posY]))
    let routes: IRoutes[] = []

    for (let i = 0; i < dataFront.mowers.length; i++) {

        const currentMower = dataFront.mowers[i]
        let currentDirection = currentMower.position.direction
        let currentPosition = [currentMower.position.posX, currentMower.position.posY]
        routes.push({ mowerIndex: i, route: [currentPosition], direction: currentDirection, color: getRandomColor(), totalCollides: 0 })

        for (let j = 0; j < currentMower.path.length; j++) {

            const currentPath = currentMower.path[j].toUpperCase()

            //Direction change
            if (["L", "R"].includes(currentPath)) {
                currentDirection = calculateTurn(currentDirection, currentPath)
                routes[i].direction = currentDirection
            }

            //Mower moves
            if (currentPath === "M") {
                const newCurrentPosition = calculateMove(currentDirection, currentPosition, sizeX, sizeY, mowersPosition)
                if (currentPosition[0] === newCurrentPosition[0] && currentPosition[1] === newCurrentPosition[1]) {
                    routes[i].totalCollides += 1
                } else {
                    currentPosition = newCurrentPosition
                    mowersPosition[i] = newCurrentPosition
                }
                routes[i].route = [...routes[i].route, newCurrentPosition]
            }
        }
    }

    return { routes, plateauSize: [sizeX, sizeY] }
}

//Calculate turn left or right
const calculateTurn = (currentDirection: string, currentPath: string): string => {
    let newDirection = currentDirection
    const indexInCardinalDirections = cardinalDirections.indexOf(currentDirection)

    if (currentPath === "L") {
        if (indexInCardinalDirections === 0) newDirection = cardinalDirections[cardinalDirections.length - 1]
        else newDirection = cardinalDirections[indexInCardinalDirections - 1]
    }

    if (currentPath === "R") {
        if (indexInCardinalDirections === 3) newDirection = cardinalDirections[0]
        else newDirection = cardinalDirections[indexInCardinalDirections + 1]
    }

    return newDirection
}

const calculateMove = (direction: string, position: number[], sizeX: number, sizeY: number, mowersPosition: number[][]): number[] => {

    let newPosition: number[]
    switch (direction) {
        case "N":
            newPosition = [position[0], position[1] + 1]
            break;
        case "E":
            newPosition = [position[0] + 1, position[1]]
            break;
        case "S":
            newPosition = [position[0], position[1] - 1]
            break;
        case "W":
            newPosition = [position[0] - 1, position[1]]
            break;
        default:
            newPosition = position
            break;
    }

    //It does not move forward because it collides with an end
    if (newPosition[0] > sizeX || newPosition[0] < 0 || newPosition[1] > sizeY || newPosition[1] < 0) newPosition = position

    //It does not move forward because it collides with another mower
    mowersPosition.forEach(mow => {
        if (mow[0] === newPosition[0] && mow[1] === newPosition[1]) newPosition = position
    })

    return newPosition
}