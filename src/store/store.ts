import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger'
// ...

import { routesReducer } from './slices/routesSlice';
import { filterReducer } from './slices/filtersSlice';
import { dataReducer } from './slices/dataRoutes';
import { carsMapReducer } from './slices/carsMapSlice';
import { carsSettingsReducer } from './slices/carsSettingsSlice';
import { createLogger } from 'redux-logger'

const logger = createLogger({
  collapsed: true,
  duration: true
});

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    filters: filterReducer,
    data: dataReducer,
    carsMap: carsMapReducer,
    carsSettings: carsSettingsReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
