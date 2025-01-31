import axios from 'axios'
import { BASE_URL } from '../../config'
import { LOGOUT, REFRESH_TOKEN, SIGN_IN, AUTH_ERROR } from './types'
import { Action } from './action'
import { RootState } from '../store/rootState'
import { ThunkDispatch } from '@reduxjs/toolkit'
import store from '../store/store'

export const refreshToken =
    () =>
    async (
        dispatch: ThunkDispatch<RootState, unknown, Action>,
        getState: () => RootState
    ) => {
        const refreshToken =
            localStorage.getItem('refresh') ?? sessionStorage.getItem('refresh')

        await axios
            .post(`${BASE_URL}/refresh`, { refreshToken })
            .then((res) => {
                dispatch({
                    type: REFRESH_TOKEN,
                    payload: res.data,
                })
                localStorage.setItem('access', res.data.accessToken)
                console.log('here')
            })
            .catch((err) => {
                console.log(err)
                dispatch({
                    type: AUTH_ERROR,
                })
                localStorage.clear()
                sessionStorage.clear()
            })
    }

export const logout =
    () =>
    (
        dispatch: ThunkDispatch<RootState, unknown, Action>,
        getState: () => RootState
    ) => {
        dispatch({
            type: LOGOUT,
        })
    }

export const signIn =
    (email: string, password: string, rememberMe: boolean) =>
    async (
        dispatch: ThunkDispatch<RootState, unknown, Action>,
        getState: () => RootState
    ) => {
        await axios
            .post(`${BASE_URL}/login`, { email, password })
            .then((res) => {
                dispatch({
                    type: SIGN_IN,
                    payload: res.data,
                })
                const tokens = {
                    access: res.data.accessToken,
                    refresh: res.data.refreshToken,
                }

                localStorage.setItem('access', tokens.access)
                rememberMe
                    ? sessionStorage.setItem('refresh', tokens.refresh)
                    : localStorage.setItem('refresh', tokens.refresh)
                return
            })
            .catch((err) => {
                console.log(err)
            })
    }
