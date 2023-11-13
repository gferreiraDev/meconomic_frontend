import { createSlice } from '@reduxjs/toolkit';

const cardSlice = createSlice({
  name: 'cards',
  initialState: [],
  reducers: {
    setCards: (state, { payload }) => {
      state = payload;
    },
  },
});

export const { setCards } = cardSlice.actions;

export default cardSlice.reducer;
