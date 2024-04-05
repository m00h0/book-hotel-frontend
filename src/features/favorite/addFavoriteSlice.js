import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  status: 'idle',
  error: null,
};

// Create async thunk to add a house to favorites
export const addFavorite = createAsyncThunk(
  'favorites/add',
  async (houseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await fetch(`http://localhost:3001/houses/${houseId}/favorites`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add house to favorites');
      }

      return houseId;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message }); // Returning serializable value
    }
  },
);

// Create addFavoriteSlice
const addFavoriteSlice = createSlice({
  name: 'addFavorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add favorite pending
    builder.addCase(addFavorite.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    // Add favorite fulfilled
    builder.addCase(addFavorite.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    });
    // Add favorite rejected
    builder.addCase(addFavorite.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default addFavoriteSlice.reducer;
