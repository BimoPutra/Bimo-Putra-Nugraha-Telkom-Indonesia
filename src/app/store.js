import { configureStore } from '@reduxjs/toolkit';
import reposReducer from './dslice';
export const store = configureStore({
  reducer: {
    repos: reposReducer,  
  },
});
