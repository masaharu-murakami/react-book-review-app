import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
};

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
  },
  reducers: {
    nextPage: (state) => {
      state.currentPage += 1;
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { nextPage, prevPage, setPage } = paginationSlice.actions;

export default paginationSlice.reducer;
