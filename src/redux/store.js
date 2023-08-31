import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/apiService';
import authSlice from './authSlice';

export const store = configureStore({
  reducer: {
    [apiService.reducerPath]: apiService.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
  devTools: true,
});
