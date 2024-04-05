import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  error: null,
};

// Modify the action creator to accept the token as an argument
export const postHouse = createAsyncThunk(
  'houses/post',
  async ({ houseData, token }, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:3001/houses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ house: houseData }),
      });

      if (!response.ok) {
        throw new Error('Failed to create house');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const postHouseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postHouse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postHouse.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(postHouse.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default postHouseSlice.reducer;
