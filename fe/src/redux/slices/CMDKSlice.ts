import { createSlice } from '@reduxjs/toolkit';

export const CMDKSlice = createSlice({
  name: 'CMDK',
  initialState: {
    isOpen: false,
    isLoadingBuilderSchema: false,
  },
  reducers: {
    openPallet: (state) => {
      state.isOpen = true;
    },
    closePallet: (state) => {
      state.isOpen = false;
    },
    togglePallet: (state) => {
      state.isOpen = !state.isOpen;
    },
    setIsOpenPallet: (state, action) => {
      state.isOpen = action.payload;
    },
    setLoadingBuilderSchema: (state, action) => {
      state.isLoadingBuilderSchema = action.payload;
    },
  },
});

export const {
  openPallet, closePallet, togglePallet, setIsOpenPallet, setLoadingBuilderSchema,
} = CMDKSlice.actions;
export const CMDKReducer = CMDKSlice.reducer;
