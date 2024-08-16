'use client';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';
import {apiSlice} from './slices/apiSlices';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Web store
const persistConfigWeb = {
  key: 'root',
  storage,
};

const persistedReducerWeb = persistReducer(persistConfigWeb, rootReducer);

export const storeWeb = configureStore({
  reducer: persistedReducerWeb,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistorWeb = persistStore(storeWeb);

setupListeners(storeWeb.dispatch);

export type AppDispatchWeb = typeof storeWeb.dispatch;
export type RootStateWeb = ReturnType<typeof storeWeb.getState>;
