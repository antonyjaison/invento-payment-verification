import { configureStore } from '@reduxjs/toolkit';
import { unverifiedApi } from './features/apiSlice';
import { setupListeners } from '@reduxjs/toolkit/query'
import unverifiedReducer from './features/unverifiedSlice';

export const store = configureStore({
  reducer: {
    unverifiedSlice: unverifiedReducer,
    [unverifiedApi.reducerPath]:unverifiedApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(unverifiedApi.middleware),

});

setupListeners(store.dispatch)