import { configureStore } from '@reduxjs/toolkit';
// ...

import { routesReducer } from './slices/routesSlice';
import { filterReducer } from './slices/filtersSlice';
import { dataReducer } from './slices/dataRoutes';
import { carsMapReducer } from './slices/carsMapSlice';
import { carsSettingsReducer } from './slices/carsSettingsSlice';

export const store = configureStore({
  reducer: {
    routes: routesReducer,
    filters: filterReducer,
    data: dataReducer,
    carsMap: carsMapReducer,
    carsSettings: carsSettingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
