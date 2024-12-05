import {AnyAction, combineReducers} from '@reduxjs/toolkit';

import {coreSlice, CoreState} from './coreReducer';

export interface StoreState {
  core: CoreState;
}

const combinedReducers = combineReducers({
  [coreSlice.name]: coreSlice.reducer,
});

export type Store = ReturnType<typeof combinedReducers>;

const rootReducer = (state: Store, action: AnyAction) => {
  return combinedReducers(state, action);
};

export default rootReducer;
