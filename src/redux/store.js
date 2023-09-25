import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/apiService';
import authSlice from './authSlice';
import themeSlice from './themeSlice';

import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducers = combineReducers({
  [apiService.reducerPath]: apiService.reducer,
  auth: authSlice,
  theme: themeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiService.middleware),
  devTools: true,
});

export const persistor = persistStore(store);
