import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./rootReducer";
import { apiSlice } from "./slices/apiSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage"; // For web
import { MMKV } from "react-native-mmkv"; // For React Native

const persistConfig = {
  key: "root",
  storage: typeof document !== "undefined" ? AsyncStorage : createMMKVStorage(),
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

function createMMKVStorage() {
  const storage = new MMKV();
  return {
    setItem: (key: string, value: string) => {
      return new Promise<void>((resolve, reject) => {
        try {
          storage.set(key, value);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
    getItem: (key: string) => {
      return new Promise<string | null>((resolve, reject) => {
        try {
          const value = storage.getString(key);
          resolve(value || null);
        } catch (error) {
          reject(error);
        }
      });
    },
    removeItem: (key: string) => {
      return new Promise<void>((resolve, reject) => {
        try {
          storage.delete(key);
          resolve();
        } catch (error) {
          reject(error);
        }
      });
    },
  };
}
