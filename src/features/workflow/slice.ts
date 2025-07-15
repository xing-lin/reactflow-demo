import { type RootState } from '@/app/store.types';
import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import { type InitialState } from './slice.types';

const initialState: InitialState = {
  paletteDrawerData: {
    open: false,
    initialValues: null,
  },
  promptDrawerData: {
    open: false,
    initialValues: null,
  },
  mentionOptions: [],
};

const slice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    setPaletteDrawerData(
      state,
      action: PayloadAction<InitialState['paletteDrawerData']>
    ) {
      state.paletteDrawerData = action.payload;
    },
    setPromptDrawerData(
      state,
      action: PayloadAction<InitialState['promptDrawerData']>
    ) {
      state.promptDrawerData = action.payload;
    },
    setMentionOptions(
      state,
      action: PayloadAction<InitialState['mentionOptions']>
    ) {
      state.mentionOptions = action.payload;
    },
  },
});

export default slice.reducer;

export const { setPaletteDrawerData, setPromptDrawerData, setMentionOptions } =
  slice.actions;

export const selectPaletteDrawerData = (state: RootState) => {
  return state.workflow.paletteDrawerData;
};

export const selectPromptDrawerData = (state: RootState) => {
  return state.workflow.promptDrawerData;
};

export const selectMentionOptions = (state: RootState) => {
  return state.workflow.mentionOptions;
};
