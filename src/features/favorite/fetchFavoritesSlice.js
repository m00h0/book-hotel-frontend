import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  favorites: [],
  status: 'idle',
  error: null,
};

// Create async thunk to fetch all favorite houses
export const fetchFavorites = createAsyncThunk(
  'favorites/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await fetch('http://localhost:3001/favorites', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch favorites');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message }); // Returning serializable value
    }
  },
);

// Create fetchFavoritesSlice
const fetchFavoritesSlice = createSlice({
  name: 'fetchFavorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch favorites pending
    builder.addCase(fetchFavorites.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    // Fetch favorites fulfilled
    builder.addCase(fetchFavorites.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.favorites = action.payload;
      state.error = null;
    });
    // Fetch favorites rejected
    builder.addCase(fetchFavorites.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default fetchFavoritesSlice.reducer;
