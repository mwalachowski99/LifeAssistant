import axios from 'axios'
import { API_BASE_URL } from '../../config'
import { ADD_ACTIVITY, GET_ACTIVITIES } from './types'
import { Action } from './action'
import { RootState } from '../store/rootState'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { ActivityDto } from '../models/activityDto'
import { apiRequest, tokenConfig } from './actionHelpers'

export const getActivities =
    () => async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(
            () =>
                axios
                    .get(`${API_BASE_URL}/activities`, tokenConfig())
                    .then((res) => {
                        dispatch({
                            type: GET_ACTIVITIES,
                            payload: res.data,
                        })
                    }),
            dispatch
        )
    }

export const addActivity =
    (activity: ActivityDto) =>
    async (dispatch: ThunkDispatch<RootState, unknown, Action>) => {
        await apiRequest(
            () =>
                axios
                    .post(`${API_BASE_URL}/activities`, activity, tokenConfig())
                    .then((res) => {
                        dispatch({
                            type: ADD_ACTIVITY,
                            payload: res.data,
                        })
                    }),
            dispatch
        )
    }
