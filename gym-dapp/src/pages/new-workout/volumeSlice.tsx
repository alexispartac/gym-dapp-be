
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VolumeState {
  count: number
}

const initialState: VolumeState = {
  count: 0,
};

const volumeSlice = createSlice({
  name: 'volume',
  initialState,
  reducers: {
    addVolume(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    removeVolume(state, action: PayloadAction<number>) {
      state.count -= action.payload;
    },
    resetVolume(state) {
      state.count = 0;
    }
  },
});

export const { addVolume, removeVolume, resetVolume } = volumeSlice.actions;

export default volumeSlice.reducer;
