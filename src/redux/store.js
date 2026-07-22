import { configureStore } from '@reduxjs/toolkit'
import importantMeetReducer from './importantMeetSlice'

export const store = configureStore({
  reducer: {
    important: importantMeetReducer,
  },
})