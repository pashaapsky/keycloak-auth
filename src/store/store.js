import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import appReducer from './app/appSlice';


const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: [logger, ...getDefaultMiddleware()],
  // middleware: [...getDefaultMiddleware()],
});

export default store;
