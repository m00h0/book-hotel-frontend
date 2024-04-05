import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define initial state
const initialState = {
  status: 'idle',
  error: null,
};

// Create async thunk to delete a house
export const deleteHouse = createAsyncThunk(
  'houses/delete',
  async (houseId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Get token from local storage
      if (!token) {
        throw new Error('Token not found in local storage');
      }

      const response = await fetch(`http://localhost:3001/houses/${houseId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete house');
      }

      return houseId;
    } catch (error) {
      return rejectWithValue({ errorMessage: error.message }); // Returning serializable value
    }
  },
);

// Create deleteHouseSlice
const deleteHouseSlice = createSlice({
  name: 'deleteHouse',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Delete house pending
    builder.addCase(deleteHouse.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    // Delete house fulfilled
    builder.addCase(deleteHouse.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    });
    // Delete house rejected
    builder.addCase(deleteHouse.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default deleteHouseSlice.reducer;
