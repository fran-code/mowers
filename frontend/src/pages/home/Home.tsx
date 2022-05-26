import React from 'react'
import MoversPosition from '../../components/forms/MowersPosition'
import { IMowers, IStateSubmit, IRoutesInfo, IReturnApiMower } from '../../utils/interfaces'
import constants from '../../utils/constants'
import { apiCall } from '../../utils/helpers'
import Loading from '../../components/Loading'
import './home.css'

const submitReducer = (state: IStateSubmit, action: { type: 'loading' | 'success' | 'error' | 'idle', payload?: any }) => {
    switch (action.type) {
        case 'idle': {
            return { ...state, status: 'idle', data: null }
        }
        case 'loading': {
            return { ...state, status: 'loading', data: null }
        }
        case 'success': {
            return { ...state, status: 'success', data: action.payload }
        }
        case 'error': {
            return { ...state, status: 'error', data: action.payload }
        }
        default: {
            throw new Error(`Unhandled action type: ${action}`)
        }
    }
}

const initialState: IStateSubmit = {
    status: 'idle',
    data: null
}

const useSubmit = () => {
    const [state, dispatch] = React.useReducer(submitReducer, initialState)

    const onSubmit = (valuesForm: IMowers) => {
        dispatch({ type: "loading" })
        apiCall(constants.endpoints.calculateRoutes, { data: valuesForm })
            .then(
                response => {
                    dispatch({ type: "success", payload: response })
                },
                error => {
                    dispatch({ type: "error", payload: error })
                })
    }

    return [onSubmit, state] as const
}

const RoutesInfo: React.FC<IRoutesInfo> = ({ state }) => {

    if (state.status === 'idle') return null

    if (state.status === 'loading') return <Loading />

    if (state.status === 'error') return <div className='errorMessage'>{JSON.stringify(state.data)}</div>

    if (state.status === 'success') {
        const dataApi: IReturnApiMower = state.data.message as IReturnApiMower

        const sizeX = dataApi.plateauSize[0]
        const sizeY = dataApi.plateauSize[1]
        const routes = dataApi.routes
        const sumCollides = routes.reduce((sum, e) => sum + e.totalCollides, 0)
        const path: string[] = []
        routes.forEach(mow => {
            let pathMow = "M"
            mow.route.forEach(rou => {
                pathMow += ` ${rou[0] * 100},${rou[1] * 100}`
            })
            path.push(pathMow)
        })

        return (
            <div className='textCenter mt_30px'>
                <svg viewBox={`0 0 ${sizeX * 100} ${sizeY * 100}`} style={{ width: sizeX * 100, height: sizeY * 100, backgroundColor: '#80808033' }}>
                    {new Array(sizeX + 1).fill(1).map((line, index) => <path key={index} d={`M ${index * 100},0 ${index * 100},${sizeY * 100}`} fill="none" stroke="black" strokeWidth={3} />)}
                    {new Array(sizeY + 1).fill(1).map((line, index) => <path key={index} d={`M 0,${index * 100} ${sizeX * 100},${index * 100}`} fill="none" stroke="black" strokeWidth={3} />)}
                    {path.map((pat, index) => <path key={index} d={pat} fill="none" stroke={routes[index].color} strokeWidth={20} transform={`translate(0,${sizeY * 100}) scale(1,-1)`} />)}
                </svg>
                <div className='mt_30px'>
                    {routes.map(rou => <div key={rou.mowerIndex}>The mower {rou.mowerIndex + 1} ends at point {`${rou.route[rou.route.length - 1][0]},${rou.route[rou.route.length - 1][1]}`} with direction {rou.direction}</div>)}
                    {sumCollides > 0 && <div>The route can be optimised as the mowers have collided a total of {sumCollides} times.</div>}
                </div>
            </div>
        )
    }

    return null
}

const Home: React.FC = () => {
    const [onSubmit, state] = useSubmit()

    return (
        <div className='homeContainer'>
            <MoversPosition onSubmit={onSubmit} title="Please fill in the following form" />
            <RoutesInfo state={state} />
        </div>
    )
}

export default Home