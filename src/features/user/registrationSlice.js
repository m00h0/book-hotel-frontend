import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    email: '',
    password: '',
    name: '',
  },
  status: 'idle',
};

const baseUrl = 'http://localhost:3001/signup';

export const postRegisterUser = createAsyncThunk(
  'user/postRegister',
  async (userdata, { rejectWithValue }) => {
    try {
      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userdata),
      });

      if (!response.ok) {
        throw new Error('Failed to register user');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const registerSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setValue(state, action) {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRegisterUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postRegisterUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.value = action.payload;
      })
      .addCase(postRegisterUser.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setValue } = registerSlice.actions;

export const selectRegisterUser = (state) => state.register.value;
export const selectStatus = (state) => state.register.status;

export default registerSlice.reducer;
