'use client';
import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import rootReducer from './rootReducer';
import {apiSlice} from './slices/apiSlices';
import {persistStore, persistReducer} from 'redux-persist';
import {mmkvStorage} from '@lfvn-customer/shared/utils/storage';
import {TypedUseSelectorHook, useSelector} from 'react-redux';

// Mobile store
const persistConfig = {
  key: 'root',
  storage: mmkvStorage,
  blacklist: ['auth', 'loading'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
