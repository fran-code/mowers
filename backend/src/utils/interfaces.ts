export interface IEnvVars {
    port: number
}

export interface IMowers {
    sizeX: number;
    sizeY: number;
    mowers: IMowersPosition[];
}

export interface IMowersPosition {
    position: {
        posX: number;
        posY: number;
        direction: string;
    },
    path: string;
}

export interface IRoutes {
    mowerIndex: number;
    route: number[][];
    direction: string;
    color: string;
    totalCollides: number;
}

export interface IReturnApiMower {
    plateauSize: number[]
    routes: IRoutes[]
}