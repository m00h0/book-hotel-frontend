import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  houses: [],
  status: 'idle',
  error: null,
};

// Create async thunk to fetch all houses
export const fetchAllHouses = createAsyncThunk(
  'houses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await fetch('http://localhost:3001/houses', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch houses');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message });
    }
  },
);

// Create renderHousesSlice
const renderHousesSlice = createSlice({
  name: 'renderHouses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all houses pending
    builder.addCase(fetchAllHouses.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    // Fetch all houses fulfilled
    builder.addCase(fetchAllHouses.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.houses = action.payload;
      state.error = null;

      // eslint-disable-next-line no-console
      console.log('Fetched favorites:', action.payload);
    });
    // Fetch all houses rejected
    builder.addCase(fetchAllHouses.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default renderHousesSlice.reducer;
