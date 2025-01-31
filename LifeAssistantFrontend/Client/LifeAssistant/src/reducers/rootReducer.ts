import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import activities from './activities'

export default combineReducers({
    auth,
    activities,
})
