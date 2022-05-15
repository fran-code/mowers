interface IError {
    message: string
}

export interface IErrorValues {
    error: IError
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

export interface IMowersError {
    [key: number]: string | null;
}

export interface IRoutes {
    mowerIndex: number;
    route: number[][];
    direction: string;
    color: string;
    totalCollides: number;
    plateauSize: number[]
}

export interface IStateSubmit {
    status: string;
    data: any;
}

export interface IRoutesInfo {
    state: IStateSubmit
}

export interface IReturnApiMower {
    plateauSize: number[]
    routes: IRoutes[]
}