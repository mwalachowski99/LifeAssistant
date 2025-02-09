import { Action } from '../actions/action'
import { ADD_ACTIVITY, DELETE_ACTIVITY, GET_ACTIVITIES } from '../actions/types'
import { ActivityDto } from '../models/activityDto'

interface InitialState {
    activities: ActivityDto[]
}

const initialState: InitialState = {
    activities: [],
}

export default function (state: InitialState = initialState, action: Action) {
    switch (action.type) {
        case GET_ACTIVITIES:
            return {
                ...state,
                activities: action.payload.activityDtos,
            }
        case ADD_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload.activityDto],
            }
        case DELETE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(
                    (activity) => activity.id !== action.payload
                ),
            }
        default:
            return state
    }
}
