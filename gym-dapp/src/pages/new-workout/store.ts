import { configureStore } from '@reduxjs/toolkit';
import workoutReducer from './workoutSlice';
import volumeReducer from './volumeSlice'
import setsReducer from './setsSlice'

export const store = configureStore({
  reducer: {
    workout: workoutReducer, 
    volume: volumeReducer,
    sets: setsReducer,
  },
});


export type AppStore = typeof store; 
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 
