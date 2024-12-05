import {PayloadAction, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducers, {StoreState} from './reducer';

const persistorConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistorConfig, reducers);

const makeStore = () =>
  configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: true,
        immutableCheck: false,
        serializableCheck: false,
      }),
  });

export type AppStore = ReturnType<typeof makeStore>;
export const store = makeStore() as AppStore;
export const persistor = persistStore(store, null);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type StoreType = StoreState;
export interface IStoreAction<T> {
  type: string;
  payload: T;
  meta: PayloadAction;
}
