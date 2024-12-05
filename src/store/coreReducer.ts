import {createSlice} from '@reduxjs/toolkit';

export interface CoreState {
  activeLevel: number;
  activeTooltipIndex: number;
  availableAvatars: number[];
  resources: {
    rock: number;
    tree: number;
  };
  tries: {
    [key: string]: number;
  };
}

const initialState: CoreState = {
  activeTooltipIndex: 0,
  availableAvatars: [0],
  activeLevel: 3,
  resources: {
    rock: 0,
    tree: 0,
  },
  tries: {},
};

export const coreSlice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    reset(state) {
      state.availableAvatars = [0];
      state.activeTooltipIndex = 0;
    },
    setActiveLevel(state, action) {
      state.activeLevel = action.payload;
    },
    setTries(state, action) {
      state.tries = action.payload;
    },
    setResources(state, action) {
      state.resources = action.payload;
    },
    incrementActiveTooltipIndex: state => {
      state.activeTooltipIndex = (state.activeTooltipIndex || 0) + 1;
    },
    setAvailableAvatars: (state, action) => {
      state.availableAvatars = action.payload;
    },
  },
});

export const {
  reset,
  setTries,
  setResources,
  setAvailableAvatars,
  setActiveLevel,
  incrementActiveTooltipIndex,
} = coreSlice.actions;
