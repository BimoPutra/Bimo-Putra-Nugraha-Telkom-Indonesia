import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './Dslice';
export const store = configureStore({
  reducer: {
    repos: reposReducer,  
  },
});
