import * as React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import { SettingsReducer } from "./reducers";

import AsyncStorage from "@react-native-community/async-storage";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

export type IPayloadActionFunction<T> = (payload: T) => IPayloadAction<T>;
export interface IPayloadAction<T> {
  type: string;
  payload: T;
}

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["settings"],
};

const rootReducer: any = combineReducers({
  settings: SettingsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const configureStore = (preloadedState?: any): Function =>
  createStore(persistedReducer, preloadedState);

export const store: any = configureStore();
const persistor = persistStore(store);

export const Store: React.FC<any> = ({ children }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
