import { Action } from '../actions/action'
import { AUTH_ERROR, LOGOUT, REFRESH_TOKEN, SIGN_IN } from '../actions/types'

interface InitialState {
    isAuthenticated: boolean
}

const initialState: InitialState = {
    isAuthenticated: false,
}

export default function (state: InitialState = initialState, action: Action) {
    switch (action.type) {
        case REFRESH_TOKEN:
            console.log('REFRESHING')
            return {
                ...state,
                isAuthenticated: true,
            }
        case LOGOUT:
            return {
                ...state,
                isAuthenticated: false,
            }
        case SIGN_IN:
            return {
                ...state,
                isAuthenticated: true,
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
            }
        default:
            return state
    }
}
