import env from '../env'
import { IRoutes } from './interfaces'

export const apiCall = async (
    endpoint: string,
    {
        data, headers: customHeaders, ...customConfig
    }: any = {}
) => {
    return window.fetch(`${env.urlApi}:${env.portApi}/${endpoint}`, {
        method: data ? 'POST' : 'GET',
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            'Content-Type': data ? 'application/json' : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }).then(async response => {
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const getFinalPosition = (routesMower: IRoutes) => {
    const lastPosition = routesMower.route[routesMower.route.length - 1]
    const posX = lastPosition[0]
    const posY = lastPosition[1]
    const direction = routesMower.direction
    const positionMower = `${posX} ${posY} ${direction}`
    return positionMower
}