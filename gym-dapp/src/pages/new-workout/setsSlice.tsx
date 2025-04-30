import { createSlice } from '@reduxjs/toolkit';

interface SetsState {
  count: number
}

const initialState: SetsState = {
  count: 0,
};

const setsSlice = createSlice({
  name: 'sets',
  initialState,
  reducers: { 
    addOneSet(state) {
      state.count ++;
    },
    removeOneSet(state) {
      state.count --;
    },
    resetSets(state) {
      state.count = 0;
    }
  },
});

export const { addOneSet, removeOneSet, resetSets} = setsSlice.actions;

export default setsSlice.reducer;
