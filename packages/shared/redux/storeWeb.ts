/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';
import {apiSlice} from './slices/apiSlices';
import {persistStore, persistReducer} from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, _value: string) => Promise.resolve(),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== 'undefined'
    ? createWebStorage('local')
    : createNoopStorage();

const persistConfigWeb = {
  key: 'root',
  storage,
  blacklist: ['auth', 'loading', 'product', 'eSignForSaleSlice'],
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
