import { ErrorMessage } from 'formik'
import { Action } from '../actions/action'
import {
    AUTH_ERROR,
    LOGOUT,
    REFRESH_TOKEN,
    SIGN_IN,
    SIGN_UP,
} from '../actions/types'

interface InitialState {
    isAuthenticated: boolean
    errorMessage?: string
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
                ErrorMessage: null,
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
                errorMessage: null,
            }
        case SIGN_UP:
            return {
                ...state,
                ErrorMessage: action.payload,
            }
        case AUTH_ERROR:
            return {
                ...state,
                isAuthenticated: false,
                errorMessage: action.payload,
            }
        default:
            return state
    }
}
